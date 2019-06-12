import { useDataQuery } from '@dhis2/app-runtime'
import React, {
    Component,
    Fragment,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react'
import propTypes from 'prop-types'

import { Checkbox, Node } from '@dhis2/ui-core'
import {
    findDescendantSelectedPaths,
    getIdFromPath,
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
    disableSelection,
    onExpand,
    onCollapse,
    onUnitLoaded,
    onUnitUnloaded,
}) => {
    const id = useMemo(() => getIdFromPath(path), path)
    const [open, setOpen] = useState(expanded.indexOf(path) !== -1)
    const { loading, error, data = { node: {} } } = useOrgData(id)
    const checked = isUnitSelected(path, selected, singleSelectionOnly)
    const { children = [], displayName = '' } = data.node
    const hasSelectedDescendants = !!useSelectedDescendants(path, selected)
        .length

    const onToggleOpen = useCallback(
        toggleOpen(open, path, children, onExpand, onCollapse, setOpen),
        [open, path, children, onExpand, onCollapse, setOpen]
    )

    useEffect(() => {
        !loading && onUnitUnloaded && onUnitLoaded({ path })
        return () => !loading && onUnitUnloaded && onUnitUnloaded({ path })
    }, [loading, id, path])

    const content = children.length ? (
        !loading && !error && open ? (
            children.map(child => (
                <OrgUnitTree
                    key={child.id}
                    path={`${path}/${child.id}`}
                    selected={selected}
                    expanded={expanded}
                    onChange={onChange}
                    singleSelectionOnly={singleSelectionOnly}
                    disableSelection={disableSelection}
                    onExpand={onExpand}
                    onCollapse={onCollapse}
                    onUnitLoaded={onUnitLoaded}
                    onUnitUnloaded={onUnitUnloaded}
                />
            ))
        ) : (
            <span />
        )
    ) : (
        undefined
    )

    const label = (
        <Label
            id={id}
            path={path}
            error={error}
            loading={loading}
            checked={checked}
            onChange={onChange}
            displayName={displayName}
            onToggleOpen={onToggleOpen}
            disableSelection={disableSelection}
            singleSelectionOnly={singleSelectionOnly}
            hasSelectedDescendants={hasSelectedDescendants}
        />
    )

    return (
        <Node
            open={open}
            onOpen={onToggleOpen}
            onClose={onToggleOpen}
            component={label}
        >
            {content}
        </Node>
    )
}

OrgUnitTree.propTypes = {
    path: orgUnitPathPropValidator,
    onChange: propTypes.func.isRequired,

    selected: propTypes.arrayOf(orgUnitPathPropValidator),
    expanded: propTypes.arrayOf(orgUnitPathPropValidator),

    singleSelectionOnly: propTypes.bool,
    disableSelection: propTypes.bool,

    onExpand: propTypes.func,
    onCollapse: propTypes.func,
    onUnitLoaded: propTypes.func,
    onUnitUnloaded: propTypes.func,
}

export { OrgUnitTree }
