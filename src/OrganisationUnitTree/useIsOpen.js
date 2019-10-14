import { useMemo } from 'react'

export const useIsOpen = (expanded, path) =>
    useMemo(() => expanded.indexOf(path) !== -1, [expanded, path])
