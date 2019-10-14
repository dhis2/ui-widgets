import { useDataEngine } from '@dhis2/app-runtime'
import { useCallback } from 'react'
import { useTreeState } from './useTreeState'

const loadChildrenForIds = ids => {
    const requests = idsThatShouldBeReloaded.map(id =>
        engine.query({
            resource: `organisationUnits/${id}`,
            fields: 'id,children,displayName,path',
            paging: false,
            id,
        })
    )

    // set children's data for each child individually
    return requests.forEach(request => {
        request.then(({ path: childPath, children, ...data }) => {
            addChild(childPath, data, children)
        })
    })
}

const useOrgData = ({
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
    } = useTreeState(rootUnits)

    /**
     * Reload specific ids
     */
    useEffect(() => {
        if (idsThatShouldBeReloaded.length) {
            loadIndividualChildren(idsThatShouldBeReloaded)
            loadChildrenForIds(idsThatShouldBeReloaded)
        }
    }, [idsThatShouldBeReloaded, loadIndividualChildren, loadChildrenForIds])

    /**
     * Reload all ids
     */
    useEffect(() => {
        if (forceReload) {
            const allIds = Object.values(tree).map(({ id }) => id)
            loadIndividualChildren(allIds)
            const requests = loadChildrenForIds(allIds)

            if (onForceReloadDone) {
                Promise.all(requests).then(() => onForceReloadDone())
            }
        }
    }, [idsThatShouldBeReloaded, loadIndividualChildren, loadChildrenForIds])

    /**
     * Load children of a path
     */
    const loadChildrenForPath = useCallback(
        path => {
            loadChildren(path, tree[path].children)
            const requests = loadChildrenForIds(tree[path].children)
            Promise.all(requests).then(() => allChildrenLoaded(path))
        },
        [tree, loadChildren, loadChildrenForIds, allChildrenLoaded]
    )

    return { tree, loadChildrenForPath }
}
