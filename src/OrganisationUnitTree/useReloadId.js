import { useEffect, useState } from 'react'

const useReloadId = forceReload => {
    const [reloadId, setReloadId] = useState(0)

    useEffect(() => {
        forceReload === true && setReloadId(reloadId + 1)
    }, [forceReload])

    return reloadId
}
