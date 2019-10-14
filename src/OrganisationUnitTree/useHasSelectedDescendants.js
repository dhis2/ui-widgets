import { useMemo } from 'react'

export const findDescendantSelectedPaths = (path, selected) =>
    selected.reduce(
        (selectedDescendantPaths, curPath) =>
            curPath.slice(0, path.length) === path
                ? selectedDescendantPaths.push(curPath)
                : selectedDescendantPaths,
        []
    )

export const useHasSelectedDescendants = (path, selected) =>
    useMemo(() => !!findDescendantSelectedPaths(path, selected).length, [
        path,
        selected,
    ])
