import { useMemo } from 'react'

export const useDisplayChildren = (path, children, orgUnitsPathsToInclude) =>
    useMemo(
        () =>
            children.filter(path => {
                if (!orgUnitsPathsToInclude.length) return true
                return orgUnitsPathsToInclude.indexOf(path) !== -1
            }),
        [path, children, orgUnitsPathsToInclude]
    )
