import { useDataEngine } from '@dhis2/app-runtime'
import { useEffect, useCallback } from 'react'
import { useTreeState } from './useTreeState'

export const loadChildrenForIds = ({
    ids,
    tree,
    engine,
    addChild,
    loadIndividualChildren,
}) => {
    // if there are already some children of the ids loaded
    // reload them as well
    const subIds = Object.keys(tree)
        // find all nodes which paths include one
        // of the ids
        .filter(path =>
            ids.some(id => {
                const regExp = new RegExp(`/${id}/.+`)
                return regExp.test(path)
            })
        )
        // extract their ids from their path
        .map(path => path.replace(/^.*\/([^\/]+)$/, '$1'))

    const allIds = [...ids, ...subIds]

    loadIndividualChildren(allIds)

    const requests = allIds.map(id => {
        return (
            engine
                .query({
                    child: {
                        resource: `organisationUnits/${id}`,
                        fields: 'id,children,displayName',
                        paging: false,
                        id,
                    },
                })
                // set children's data for each child individually
                .then(({ child }) => ({
                    ...child,
                    children: child.children.map(({ id }) => id),
                }))
                .then(child => {
                    const { children, ...data } = child

                    addChild(id, data, children)

                    return child
                })
        )
    })

    return Promise.all(requests)
}

export const useOrgData = ({
    rootUnits,
    idsThatShouldBeReloaded,
    forceReload,
    onForceReloadDone,
}) => {
    const engine = useDataEngine()
    const {
        tree,
        addChild,
        loadChildren,
        loadIndividualChildren,
        allChildrenLoaded,
    } = useTreeState(rootUnits)

    const loadChildrenFor = useCallback(
        ids =>
            loadChildrenForIds({
                ids,
                tree,
                engine,
                addChild,
                loadIndividualChildren,
            }),
        [tree, engine, addChild, loadIndividualChildren]
    )

    /**
     * Reload specific ids
     */
    useEffect(() => {
        if (idsThatShouldBeReloaded.length) {
            loadChildrenFor(idsThatShouldBeReloaded)
        }
    }, [
        idsThatShouldBeReloaded,
        loadIndividualChildren,
        loadChildrenFor,
        engine,
        addChild,
        tree,
    ])

    /**
     * Reload all ids
     */
    useEffect(() => {
        if (forceReload) {
            const allIds = Object.values(tree).map(({ id }) => id)
            const requests = loadChildrenFor(allIds)

            if (onForceReloadDone) {
                Promise.all(requests).then(() => onForceReloadDone())
            }
        }
    }, [
        loadIndividualChildren,
        loadChildrenFor,
        forceReload,
        addChild,
        engine,
        tree,
    ])

    /**
     * Load children of a path
     */
    const loadChildrenForPath = useCallback(
        path => {
            const ids = tree[path].children
            const requests = loadChildrenFor(ids)
            requests.then(() => allChildrenLoaded(path))
        },
        [
            loadChildrenFor,
            allChildrenLoaded,
            loadChildren,
            addChild,
            engine,
            tree,
        ]
    )

    return { tree, loadChildrenFor, loadChildrenForPath }
}
