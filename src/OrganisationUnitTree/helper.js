import { useEffect, useMemo, useState } from 'react'

export const useToggleOpen = ({ open, path, onExpand, onCollapse }) => {
    return useCallback(() => {
        const newOpen = !open
        const payload = { path }

        if (onExpand && newOpen) {
            onExpand(payload)
        } else if (onCollapse && !newOpen) {
            onCollapse(payload)
        }
    }, [open, path, onExpand, onCollapse])
}
