import { useMemo } from 'react'

export const useIsUnitSelected = (path, selected) =>
    useMemo(() => selected.indexOf(path) !== -1, [selected, path])
