import { useMemo } from 'react'

export const hasDescendantSelectedPaths = (path, selected) =>
    selected.reduce((hasSelectedDescendantPaths, curPath) => {
        return hasSelectedDescendantPaths || curPath.indexOf(path) !== -1
    }, false)

export const useHasSelectedDescendants = (path, selected) =>
    useMemo(() => hasDescendantSelectedPaths(path, selected), [path, selected])
