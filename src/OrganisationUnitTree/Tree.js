import { useDataQuery } from '@dhis2/app-runtime'
import React, { Fragment, useMemo, useState } from 'react'
import propTypes from 'prop-types'

import { Checkbox, Tree } from '@dhis2/ui-core'
import * as All from '@dhis2/ui-core'
import { orgUnitPathPropValidator } from './helper'

const findDescendantSelectedPaths = (path, selected) =>
    selected.reduce((acc, cur) => {
        if (cur.slice(0, path.length) === path) {
            acc.push(cur)
        }

        return acc
    }, [])

export const OrgUnitTree = ({
    name,
    path,
    selected,
    initiallyExpanded,
    onChange,
}) => {
    const id = useMemo(() => path.replace(/.*\//g, ''), path)
    const [open, setOpen] = useState(initiallyExpanded.indexOf(path) !== -1)
    const descendantSelected = useMemo(
        () => findDescendantSelectedPaths(path, selected),
        [path, selected]
    )
    const hasSelectedDescendants = !!descendantSelected.length
    const checked = selected.indexOf(path) !== -1

    return (
        <Tree hasLeafes open={open} onToggleOpen={() => setOpen(!open)}>
            <Tree.Label>
                <Checkbox
                    checked={checked}
                    name={name}
                    value={id}
                    label={name}
                    indeterminate={!checked && hasSelectedDescendants}
                    onChange={event => {
                        const newChecked = event.target.checked
                        onChange({ id, path, checked: newChecked }, event)
                    }}
                />
            </Tree.Label>

            <Tree.Contents open={open}>
                {open && (
                    <Leafes
                        id={id}
                        path={path}
                        onChange={onChange}
                        selected={selected}
                        initiallyExpanded={initiallyExpanded}
                    />
                )}
            </Tree.Contents>
        </Tree>
    )
}

const Leafes = ({ id, path, onChange, selected, initiallyExpanded }) => {
    const { loading, error, data = {} } = useDataQuery({
        node: {
            resource: `organisationUnits/${id}`,
            fields: 'children',
            paging: false,
            id,
        },
    })
    const { node } = data

    return (
        <Fragment>
            {loading && 'Loading...'}
            {!loading && error && `Error: ${error.message}`}
            {!loading &&
                node.children.map(
                    child =>
                        console.log('child', child) || (
                            <OrgUnitTree
                                key={child.displayName}
                                path={`${path}/${child.id}`}
                                name={child.displayName}
                                onChange={onChange}
                                selected={selected}
                                initiallyExpanded={initiallyExpanded}
                            />
                        )
                )}
        </Fragment>
    )
}

OrgUnitTree.propTypes = {
    path: orgUnitPathPropValidator,
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
