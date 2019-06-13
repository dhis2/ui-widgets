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
    orgUnitIdPropValidator,
    useOrgData,
    useSelectedDescendants,
    useChildIds,
    toggleOpen,
} from './helper'
import { Label } from './Label'

const OrgUnitTree = ({
    path,
    selected,
    expanded,
    onChange,
    disableSelection,
    singleSelectionOnly,
    orgUnitsPathsToInclude,
    idsThatShouldBeReloaded,
    onExpand,
    onCollapse,
    onUnitLoaded,
    onUnitUnloaded,
}) => {
    const id = useMemo(() => getIdFromPath(path), path)
    const [open, setOpen] = useState(expanded.indexOf(path) !== -1)
    const { loading, error, data = { node: { children: [] } } } = useOrgData(id)
    const { displayName = '' } = data.node
    const children = data.node.children.filter(
        child =>
            !orgUnitsPathsToInclude.length ||
            orgUnitsPathsToInclude.some(
                pathToInclude => !!pathToInclude.match(`${path}/${child.id}`)
            )
    )
    const childIds = useChildIds(children, idsThatShouldBeReloaded)
    const checked = isUnitSelected(path, selected, singleSelectionOnly)
    const hasSelectedDescendants = !!useSelectedDescendants(path, selected)
        .length

    const onToggleOpen = useCallback(
        toggleOpen(open, path, children, onExpand, onCollapse, setOpen),
        [open, path, children, onExpand, onCollapse, setOpen]
    )

    useEffect(() => {
        !loading &&
            onUnitLoaded &&
            onUnitLoaded({
                path,
                forced: idsThatShouldBeReloaded.indexOf(id) !== -1,
            })
        return () => !loading && onUnitUnloaded && onUnitUnloaded({ path })
    }, [loading, id, path])

    const content = children.length ? (
        !loading && !error && open ? (
            children.map(child => (
                <OrgUnitTree
                    key={child.id + childIds[child.id]}
                    path={`${path}/${child.id}`}
                    selected={selected}
                    expanded={expanded}
                    onChange={onChange}
                    disableSelection={disableSelection}
                    singleSelectionOnly={singleSelectionOnly}
                    orgUnitsPathsToInclude={orgUnitsPathsToInclude}
                    idsThatShouldBeReloaded={idsThatShouldBeReloaded}
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
    orgUnitsPathsToInclude: propTypes.arrayOf(orgUnitPathPropValidator),

    idsThatShouldBeReloaded: propTypes.arrayOf(orgUnitIdPropValidator),

    singleSelectionOnly: propTypes.bool,
    disableSelection: propTypes.bool,

    onExpand: propTypes.func,
    onCollapse: propTypes.func,
    onUnitLoaded: propTypes.func,
    onUnitUnloaded: propTypes.func,
}

export { OrgUnitTree }
