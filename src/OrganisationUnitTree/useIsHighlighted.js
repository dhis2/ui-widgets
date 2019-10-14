import { useMemo } from 'react'

export const useIsHighlighted = (highlighted, path) =>
    useMemo(() => highlighted.indexOf(path) !== -1, [highlighted, path])
