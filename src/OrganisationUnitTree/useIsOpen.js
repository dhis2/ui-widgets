import { useMemo } from 'react'

export const useIsOpen = (expanded, path) =>
    useMemo(() => {
        console.log(
            'expanded.indexOf(path) !== -1',
            expanded.indexOf(path) !== -1
        )
        return expanded.indexOf(path) !== -1
    }, [expanded, path])
