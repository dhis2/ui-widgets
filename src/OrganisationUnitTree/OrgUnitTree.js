import { useDataQuery } from '@dhis2/app-runtime'
import React, { Fragment, useCallback, useMemo, useState } from 'react'
import propTypes from 'prop-types'

import { Checkbox, Tree } from '@dhis2/ui-core'
import * as All from '@dhis2/ui-core'
import {
    findDescendantSelectedPaths,
    isUnitSelected,
    orgUnitPathPropValidator,
    useOrgData,
    useSelectedDescendants,
    toggleOpen,
} from './helper'
import { Label } from './Label'

const OrgUnitTree = ({
    path,
    selected,
    expanded,
    onChange,
    singleSelectionOnly,
    onExpand,
    onCollapse,
}) => {
    const id = useMemo(() => path.replace(/.*\//g, ''), path)
    const [open, setOpen] = useState(expanded.indexOf(path) !== -1)
    const hasSelectedDescendants = !!useSelectedDescendants(path, selected)
        .length
    const { loading, error, data = { node: {} } } = useOrgData(id)
    const checked = isUnitSelected(path, selected, singleSelectionOnly)
    const { children = [], displayName = '' } = data.node

    const onToggleOpen = useCallback(
        toggleOpen(open, path, onExpand, onCollapse, setOpen),
        [open, path, onExpand, onCollapse, setOpen]
    )

    return (
        <Tree
            open={open}
            onToggleOpen={onToggleOpen}
            hasLeafes={loading ? false : !!children.length}
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
                {!loading && error && `Error: ${error.message}`}
                {!loading &&
                    !error &&
                    open &&
                    children.map(child => (
                        <OrgUnitTree
                            key={child.id}
                            path={`${path}/${child.id}`}
                            selected={selected}
                            expanded={expanded}
                            onChange={onChange}
                            singleSelectionOnly={singleSelectionOnly}
                            onExpand={onExpand}
                            onCollapse={onCollapse}
                        />
                    ))}
            </Tree.Contents>
        </Tree>
    )
}

OrgUnitTree.propTypes = {
    path: orgUnitPathPropValidator,
    onChange: propTypes.func.isRequired,

    expanded: propTypes.arrayOf(orgUnitPathPropValidator),
    selected: propTypes.arrayOf(orgUnitPathPropValidator),

    singleSelectionOnly: propTypes.bool,

    onExpand: propTypes.func,
    onCollapse: propTypes.func,
}

export { OrgUnitTree }
