import { useMemo } from 'react'

export const useDisplayChildren = (path, children, orgUnitsPathsToInclude) =>
    useMemo(
        () =>
            children.filter(childId => {
                if (!orgUnitsPathsToInclude.length) return true

                return orgUnitsPathsToInclude.some(
                    pathToInclude => !!pathToInclude.match(`${path}/${childId}`)
                )
            }),
        [path, children, orgUnitsPathsToInclude]
    )
