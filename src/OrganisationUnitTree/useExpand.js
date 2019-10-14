import { useCallback, useState } from 'react'

export const expandUnit = ({
    expanded,
    setExpanded,
    onExpand,
    loadChildrenForPath,
    tree,
}) => args => {
    const { path } = args
    const pathIndex = expanded.indexOf(path)

    if (pathIndex === -1) {
        setExpanded([...expanded, path])

        if (!tree[path].childrenLoading && !tree[path].childrenLoaded) {
            loadChildrenForPath(path)
        }

        if (onExpand) {
            onExpand(args)
        }
    }
}

export const collapseUnit = (expanded, setExpanded, onCollapse) => args => {
    const { path } = args
    const pathIndex = expanded.indexOf(path)

    if (pathIndex !== -1) {
        setExpanded([
            ...expanded.slice(0, pathIndex),
            ...expanded.slice(pathIndex + 1),
        ])

        if (onCollapse) {
            onCollapse(args)
        }
    }
}

export const useExpand = ({
    initiallyExpanded,
    loadChildrenForPath,
    tree,
    openFirstLevel,
    rootUnits,
}) => {
    const reallyInitiallyExpanded = openFirstLevel
        ? rootUnits.reduce((paths, rootId) => {
              const rootPath = `/${rootId}`
              if (paths.indexOf(rootPath) === -1) {
                  return [...paths, rootPath]
              }

              return paths
          }, initiallyExpanded)
        : initiallyExpanded

    const [expanded, setExpanded] = useState(reallyInitiallyExpanded)

    const handleExpand = useCallback(
        expandUnit(expanded, setExpanded, onExpand, loadChildrenForPath, tree),
        [expanded, setExpanded, onExpand, loadChildrenForPath, tree]
    )

    const handleCollapse = useCallback(
        collapseUnit(expanded, setExpanded, onCollapse),
        [expanded, onCollapse]
    )

    return { expanded, handleExpand, handleCollapse }
}
