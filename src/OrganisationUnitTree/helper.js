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
}
/* eslint-enable */

export const getIdFromPath = path => path.replace(/.*\//g, '')

export const findDescendantSelectedPaths = (path, selected) =>
    selected.reduce((acc, cur) => {
        if (cur.slice(0, path.length) === path) {
            acc.push(cur)
        }

        return acc
    }, [])

export const useOrgData = id =>
    useDataQuery({
        node: {
            resource: `organisationUnits/${id}`,
            fields: 'children,displayName,path',
            paging: false,
            id,
        },
    })

export const useSelectedDescendants = (path, selected) =>
    useMemo(() => findDescendantSelectedPaths(path, selected), [path, selected])

export const isUnitSelected = (path, selected, singleSelectionOnly) =>
    -1 !== (singleSelectionOnly ? selected.slice(0, 1) : selected).indexOf(path)

/* eslint-disable max-params */
export const toggleOpen = (
    open,
    path,
    children,
    onExpand,
    onCollapse,
    setOpen
) => () => {
    const newOpen = !open
    const childIds = children.map(({ id }) => `${path}/${id}`)
    const payload = { path, children: childIds }

    setOpen(newOpen)

    if (onExpand && newOpen) {
        onExpand(payload)
    } else if (onCollapse && !newOpen) {
        onCollapse(payload)
    }
}
/* eslint-enable */

export const expandUnit = (expanded, setExpanded, onExpand) => ({
    path,
    ...rest
}) => {
    const pathIndex = expanded.indexOf(path)

    if (pathIndex === -1) {
        setExpanded([...expanded, path])

        if (onExpand) {
            onExpand({ path, ...rest })
        }
    }
}

export const collapseUnit = (expanded, setExpanded, onCollapse) => ({
    path,
    ...rest
}) => {
    const pathIndex = expanded.indexOf(path)

    if (pathIndex !== -1) {
        setExpanded(
            pathIndex === 0
                ? expanded.slice(1)
                : [
                      ...expanded.slice(0, pathIndex),
                      ...expanded.slice(pathIndex + 1),
                  ]
        )

        if (onCollapse) {
            onCollapse({ path, ...rest })
        }
    }
}
