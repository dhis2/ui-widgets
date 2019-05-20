import { useDataQuery } from '@dhis2/app-runtime'
import React, { useMemo, useState } from 'react'
import propTypes from 'prop-types'

import { Checkbox, Tree } from '@dhis2/ui-core'
import * as All from '@dhis2/ui-core'
import { orgUnitPathPropValidator } from './helper'

const findDescendantSelectedPaths = (path, selected) =>
    selected.reduce((acc, cur) => {
        if (cur.slice(0, path.length) === path) {
            acc.push(cur)
        }
    }, [])

const createDataQuery = (open, id) => {
    // @TODO: Doesn't work like this right now
    if (open || true) {
        return {
            node: {
                resource: `organisationUnits/${id}`,
                fields: 'children',
                paging: false,
                id,
            },
        }
    }

    return {}
}

export const OrgUnitTree = ({
    name,
    path,
    selected,
    initiallyExpanded,
    onChange,
}) => {
    const id = useMemo(() => path.replace(/.*\//g, ''), path)
    const [open, setOpen] = useState(initiallyExpanded.indexOf(path) !== -1)
    const [checked, setChecked] = useState(selected.indexOf(path) !== -1)
    const descendantSelected = useMemo(
        () => findDescendantSelectedPaths(path, selected),
        [path, selected]
    )
    const hasSelectedDescendants = !!descendantSelected.length
    const { loading, error, data = {} } = useDataQuery(
        createDataQuery(open, id)
    )
    const { node } = data

    return (
        <Tree hasLeafes open={open} onToggleOpen={() => setOpen(!open)}>
            <Tree.Label>
                <Checkbox
                    value={checked}
                    label={name}
                    indeterminate={!checked && hasSelectedDescendants}
                    onChange={event => {
                        const newChecked = event.target.checked
                        setChecked(newChecked)
                        onChange({ id, path, checked: newChecked }, event)
                    }}
                />
            </Tree.Label>

            <Tree.Contents open={open}>
                {loading && 'Loading...'}
                {!loading && error && `Error: ${error.message}`}
                {!loading &&
                    node.children.map(child => (
                        <OrgUnitTree
                            path={`${path}/${child.id}`}
                            name={child.displayName}
                            selected={selected}
                            initiallyExpanded={initiallyExpanded}
                        />
                    ))}
            </Tree.Contents>
        </Tree>
    )
}

OrgUnitTree.propTypes = {
    path: orgUnitPathPropValidator.isRequired,
    onChange: propTypes.func.isRequired,
    name: Checkbox.propTypes.name,

    initiallyExpanded: propTypes.arrayOf(orgUnitPathPropValidator),
    selected: propTypes.arrayOf(orgUnitPathPropValidator),
    open: propTypes.bool,
}

OrgUnitTree.defaultProps = {
    initiallyExpanded: [],
    selected: [],
    open: false,
}
