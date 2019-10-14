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
    type: 'LOAD_INVIDIVUAL_CHILDREN',
    payload: { ids },
})

const createLoadChildrenAction = (path, ids) => ({
    type: 'LOAD_CHILDREN',
    payload: { path, ids },
})

const createAddChildAction = (path, data, children) => ({
    type: 'ADD_CHILD',
    payload: { path, data, children },
})

const createAllChildrenLoadedAction = path => ({
    type: 'ALL_CHILDREN_LOADED',
    payload: { path },
})

const treeReducer = (tree, action) => {
    const { type, payload } = action
    const { ids, path, data, children } = payload

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
        const childrenLeafes = children.reduce((leafes, curChild) => {
            const { path: curPath } = curChild
            return { ...leafes, [curPath]: createEmptyChild(curPath) }
        }, {})

        return {
            ...tree,
            ...childrenLeafes,
            [path]: {
                ...tree[path],
                ...data,
                children: children.map(({ path }) => path),
                loading: false,
            },
        }
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

const useTreeState = rootUnits => {
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
        (path, ids) => dispatch(createLoadChildAction(path, ids)),
        [createLoadChildrenAction]
    )

    const loadIndividualChildren = useCallback(
        ids => dispatch(createLoadIndiviualChildrenAction(ids)),
        [createLoadIndiviualChildrenAction]
    )

    const addChild = useCallback(
        (path, child) => dispatch(createAddChildAction(path, child)),
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
