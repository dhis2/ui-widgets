import { useMemo, useState } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'

/* eslint-disable */
export const orgUnitPathPropValidator = (
    propValue,
    key,
    compName,
    location,
    propFullName
) => {
    if (!/(\/[a-zA-Z][a-zA-Z0-9]{10})+/.test(propValue[key])) {
        return new Error(
            `Invalid org unit path \`${
                propValue[key]
            }\` supplied to \`${compName}.${propFullName}\``
        )
    }
    return undefined
}
/* eslint-enable */

export const findDescendantSelectedPaths = (path, selected) =>
    selected.reduce((acc, cur) => {
        if (cur.slice(0, path.length) === path) {
            acc.push(cur)
        }

        return acc
    }, [])

export const useOrgData = id => useDataQuery({
    node: {
        resource: `organisationUnits/${id}`,
        fields: 'children,displayName,path',
        paging: false,
        id,
    },
})

export const useSelectedDescendants = (path, selected) => useMemo(
    () => findDescendantSelectedPaths(path, selected),
    [path, selected]
)
