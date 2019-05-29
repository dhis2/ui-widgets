import { useDataQuery } from '@dhis2/app-runtime'
import React, { Fragment, useMemo, useState } from 'react'
import propTypes from 'prop-types'

import { Checkbox, Tree } from '@dhis2/ui-core'
import * as All from '@dhis2/ui-core'
import {
    findDescendantSelectedPaths,
    orgUnitPathPropValidator,
    useOrgData,
    useSelectedDescendants,
} from './helper'

const OrgUnitTree = ({
    path,
    selected,
    initiallyExpanded,
    onChange,
}) => {
    const id = useMemo(() => path.replace(/.*\//g, ''), path)
    const [open, setOpen] = useState(initiallyExpanded.indexOf(path) !== -1)
    const hasSelectedDescendants = !!useSelectedDescendants(path, selected).length
    const { loading, error, data = { node: {} } } = useOrgData(id)
    const checked = selected.indexOf(path) !== -1
    const { children = [], displayName = '' } = data.node;

    return (
        <Tree
            open={open}
            hasLeafes={
                loading 
                    ? false 
                    : !!children.length
            }
            onToggleOpen={() => setOpen(!open)}
        >
            <Tree.Label>
                <Checkbox
                    checked={checked}
                    name="org-unit"
                    value={id}
                    label={loading ? 'Loading...' : displayName}
                    indeterminate={!checked && hasSelectedDescendants}
                    onChange={event => {
                        const newChecked = event.target.checked
                        onChange({ id, path, checked: newChecked }, event)
                    }}
                />
            </Tree.Label>

            <Tree.Contents open={open}>
                {loading && 'Loading...'}
                {!loading && error && `Error: ${error.message}`}
                {!loading && !error && open && children.map(child => (
                    <OrgUnitTree
                        key={child.id}
                        path={`${path}/${child.id}`}
                        selected={selected}
                        initiallyExpanded={initiallyExpanded}
                        onChange={onChange}
                    />
                ))}
            </Tree.Contents>
        </Tree>
    )
}

OrgUnitTree.propTypes = {
    path: orgUnitPathPropValidator,
    onChange: propTypes.func.isRequired,

    initiallyExpanded: propTypes.arrayOf(orgUnitPathPropValidator),
    selected: propTypes.arrayOf(orgUnitPathPropValidator),
    open: propTypes.bool,
}

OrgUnitTree.defaultProps = {
    initiallyExpanded: [],
    selected: [],
    open: false,
}

export { OrgUnitTree }
