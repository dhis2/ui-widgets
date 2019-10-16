import { useMemo } from 'react'

export const useIsOpen = (expanded, path) =>
    useMemo(() => {
        return expanded.indexOf(path) !== -1
    }, [expanded, path])
