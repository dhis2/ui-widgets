import { useDataQuery } from '@dhis2/app-runtime'
import React, {
    Fragment,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react'
import propTypes from 'prop-types'

import { Checkbox, Tree } from '@dhis2/ui-core'
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
        !loading && console.log(path, error, data)
        !loading && onUnitUnloaded && onUnitLoaded({ path })
        return () => !loading && onUnitUnloaded && onUnitUnloaded({ path })
    }, [loading, id, path])

    return (
        <Tree
            open={open}
            onToggleOpen={onToggleOpen}
            hasLeafes={loading ? false : !!children.length}
        >
            <Label
                id={id}
                path={path}
                error={error}
                loading={loading}
                checked={checked}
                onChange={onChange}
                displayName={displayName}
                singleSelectionOnly={singleSelectionOnly}
                hasSelectedDescendants={hasSelectedDescendants}
            />

            <Tree.Contents open={open}>
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
                            onUnitLoaded={onUnitLoaded}
                            onUnitUnloaded={onUnitUnloaded}
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
    onUnitLoaded: propTypes.func,
    onUnitUnloaded: propTypes.func,
}

export { OrgUnitTree }
