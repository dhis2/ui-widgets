import { useDataEngine } from '@dhis2/app-runtime'
import { useEffect, useState, useCallback, useMemo } from 'react'
import { useTreeState } from './useTreeState'

export const loadInitialData = ({
    initiallyExpanded,
    rootUnits,
    loadChildrenFor,
    onDone,
}) => {
    const initialLoading = useMemo(() => {
        const pathsToBePreloaded = initiallyExpanded.reduce((grouped, path) => {
            const parts = path.replace(/^\//, '').split('/')

            return parts.reduce((curGrouped, part, depth) => {
                if (!curGrouped[depth]) {
                    curGrouped[depth] = []
                }

                //const curPath = `/${parts.slice(0, depth + 1).join('/')}`
                const curPath = part

                if (curGrouped[depth].indexOf(curPath) !== -1) {
                    return curGrouped
                }

                return [
                    ...curGrouped.slice(0, depth),
                    [...curGrouped[depth], curPath],
                    ...curGrouped.slice(depth + 1),
                ]
            }, grouped)
        }, [])

        // group for child ids of deepest group
        pathsToBePreloaded.push([])

        // always load data for root ids
        rootUnits.forEach(id => {
            if (pathsToBePreloaded[0].indexOf(id) === -1) {
                pathsToBePreloaded[0].push(id)
            }
        })

        return pathsToBePreloaded.reduce(
            (promise, depthGroup, depth) =>
                promise.then(() => {
                    return (
                        loadChildrenFor(depthGroup)
                            // add all children ids of paths to be opened
                            // so we can display their names and children count as well
                            .then(responses => {
                                const nextDepth = depth + 1
                                const nextDepthGroup =
                                    pathsToBePreloaded[nextDepth]

                                if (!nextDepthGroup) {
                                    return Promise.resolve()
                                }

                                const nextDepthIds = responses
                                    .map(({ children }) => children)
                                    .reduce(
                                        (flattened, children) => [
                                            ...flattened,
                                            ...children,
                                        ],
                                        []
                                    )

                                nextDepthIds.forEach(id => {
                                    if (nextDepthGroup.indexOf(id) === -1) {
                                        nextDepthGroup.push(id)
                                    }
                                })
                            })
                    )
                }),
            Promise.resolve()
        )
    }, [])

    useEffect(() => {
        initialLoading.then(onDone)
    }, [])
}

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
    initiallyExpanded,
    onInitialLoadingDone,
}) => {
    const [initialLoadingDone, setInitialLoadingDone] = useState(false)
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
        if (initialLoadingDone && forceReload) {
            const allIds = Object.values(tree).map(({ id }) => id)
            const requests = loadChildrenFor(allIds)

            if (onForceReloadDone) {
                requests.then(() => onForceReloadDone())
            }
        }
    }, [forceReload])

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

    /**
     * Load root unit data initially
     */
    loadInitialData({
        initiallyExpanded,
        rootUnits,
        loadChildrenFor,
        onDone: () => {
            setInitialLoadingDone(true)

            if (onInitialLoadingDone) {
                onInitialLoadingDone()
            }
        },
    })

    return { tree, loadChildrenFor, loadChildrenForPath }
}
