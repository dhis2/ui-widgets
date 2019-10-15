import immutable from 'object-path-immutable'
import { useCallback, useReducer } from 'react'

const createEmptyChild = path => ({
    path,
    id: path.replace(/^.*\/([^\/]+)$/, '$1'),
    loading: false,
    data: null,
    children: [],
    childrenLoading: false,
    childrenLoaded: false,
})

const createLoadIndiviualChildrenAction = ids => ({
    type: 'LOAD_INDIVIDUAL_CHILDREN',
    payload: { ids },
})

const createLoadChildrenAction = (path, ids) => ({
    type: 'LOAD_CHILDREN',
    payload: { path, ids },
})

const createAddChildAction = (id, data, children) => ({
    type: 'ADD_CHILD',
    payload: { id, data, children },
})

const createAllChildrenLoadedAction = path => ({
    type: 'ALL_CHILDREN_LOADED',
    payload: { path },
})

const treeReducer = (tree, action) => {
    const { type, payload } = action
    const { id, ids, path, data, children } = payload

    if (type === 'LOAD_CHILDREN') {
        const paths = ids.map(id => `${path}/${id}`)
        const updatedLeafs = paths.reduce(
            (updates, curPath) => ({
                [curPath]: { ...tree[curPath], loading: true },
            }),
            {}
        )

        return {
            ...tree,
            ...updatedLeafs,
            [path]: { ...tree[path], childrenLoading: true },
        }
    }

    if (type === 'LOAD_INDIVIDUAL_CHILDREN') {
        const updatedLeafs = Object.entries(tree)
            .filter(([path, { id }]) => ids.indexOf(id) !== -1)
            .reduce(
                (updates, [curPath]) => ({
                    ...updates,
                    [curPath]: { ...tree[curPath], loading: true },
                }),
                {}
            )

        return {
            ...tree,
            ...updatedLeafs,
        }
    }

    if (type === 'ADD_CHILD') {
        const nodesToUpdate = Object.entries(tree).filter(
            ([curPath, { id: curId }]) => curId === id
        )

        return nodesToUpdate.reduce((curTree, [curPath, curNode]) => {
            const missingChildrenLeafes = children
                .filter(
                    childId => !curTree.hasOwnProperty(`${curPath}/${childId}`)
                )
                .reduce((leafes, childId) => {
                    const childPath = `${curPath}/${childId}`
                    return {
                        ...leafes,
                        [childPath]: createEmptyChild(childPath),
                    }
                }, {})

            const updatedPath = {
                ...curNode,
                ...data,
                children: children.map(id => `${curPath}/${id}`),
                loading: false,
            }

            return {
                ...curTree,
                ...missingChildrenLeafes,
                [curPath]: updatedPath,
            }
        }, tree)
    }

    if (type === 'ALL_CHILDREN_LOADED') {
        return {
            ...tree,
            [path]: {
                ...tree[path],
                childrenLoaded: true,
                childrenLoading: false,
            },
        }
    }

    return tree
}

export const useTreeState = rootUnits => {
    const [tree, dispatch] = useReducer(
        treeReducer,
        rootUnits.reduce(
            (initialState, rootUnit) => ({
                ...initialState,
                [`/${rootUnit}`]: createEmptyChild(rootUnit),
            }),
            {}
        )
    )

    const loadChildren = useCallback(
        (path, ids) => dispatch(createLoadChildrenAction(path, ids)),
        [createLoadChildrenAction]
    )

    const loadIndividualChildren = useCallback(
        ids => dispatch(createLoadIndiviualChildrenAction(ids)),
        [createLoadIndiviualChildrenAction]
    )

    const addChild = useCallback(
        (id, data, children) =>
            dispatch(createAddChildAction(id, data, children)),
        [createAddChildAction]
    )

    const allChildrenLoaded = useCallback(
        path => dispatch(createAllChildrenLoadedAction(path)),
        [createAllChildrenLoadedAction]
    )

    return {
        tree,
        addChild,
        loadChildren,
        loadIndividualChildren,
        allChildrenLoaded,
    }
}
