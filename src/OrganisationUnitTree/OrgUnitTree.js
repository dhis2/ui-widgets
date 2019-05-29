import { useDataQuery } from '@dhis2/app-runtime'
import React, { Fragment, useMemo, useState } from 'react'
import propTypes from 'prop-types'

import { Checkbox, Tree } from '@dhis2/ui-core'
import * as All from '@dhis2/ui-core'
import {
    findDescendantSelectedPaths,
    isUnitSelected,
    orgUnitPathPropValidator,
    useOrgData,
    useSelectedDescendants,
} from './helper'
import { Label } from './Label'

const OrgUnitTree = ({
    path,
    selected,
    initiallyExpanded,
    onChange,
    singleSelectionOnly,
}) => {
    const id = useMemo(() => path.replace(/.*\//g, ''), path)
    const [open, setOpen] = useState(initiallyExpanded.indexOf(path) !== -1)
    const hasSelectedDescendants = !!useSelectedDescendants(path, selected)
        .length
    const { loading, error, data = { node: {} } } = useOrgData(id)
    const checked = isUnitSelected(path, selected, singleSelectionOnly)
    const { children = [], displayName = '' } = data.node

    return (
        <Tree
            open={open}
            hasLeafes={loading ? false : !!children.length}
            onToggleOpen={() => setOpen(!open)}
        >
            <Label
                id={id}
                path={path}
                loading={loading}
                checked={checked}
                onChange={onChange}
                displayName={displayName}
                singleSelectionOnly={singleSelectionOnly}
                hasSelectedDescendants={hasSelectedDescendants}
            />

            <Tree.Contents open={open}>
                {loading && 'Loading...'}
                {!loading && error && `Error: ${error.message}`}
                {!loading &&
                    !error &&
                    open &&
                    children.map(child => (
                        <OrgUnitTree
                            key={child.id}
                            path={`${path}/${child.id}`}
                            selected={selected}
                            initiallyExpanded={initiallyExpanded}
                            onChange={onChange}
                            singleSelectionOnly={singleSelectionOnly}
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

    singleSelectionOnly: propTypes.bool,
}

export { OrgUnitTree }
