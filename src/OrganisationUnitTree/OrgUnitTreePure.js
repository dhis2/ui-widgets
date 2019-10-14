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
import { toggleOpen } from './helper'
import { hasIsUnitSelected } from './hasIsUnitSelected'
import { useDisplayChildren } from './useDisplayChildren'
import { useHasSelectedDescendants } from './useHasSelectedDescendants'
import { useIsOpen } from './useIsOpen'
import { useIsHighlighted } from './useIsHighlighted'
import { useToggleOpen } from './useToggleOpen'
import { Label } from './Label'

const OrgUnitTree = props => {
    const {
        disableSelection,
        expanded,
        highlighted,
        onChange,
        onCollapse,
        onExpand,
        orgUnitsPathsToInclude,
        path,
        selected,
        singleSelectionOnly,
        tree,
    } = props

    const { id, displayName, children, loading, error } = tree[path]
    const checked = hasIsUnitSelected(path, selected)
    const hasSelectedDescendants = useHasSelectedDescendants(path, selected)
    const open = useIsOpen(expanded, path)
    const isHighlighted = useIsHighlighted(highlighted, path)
    const onToggleOpen = useToggleOpen({ open, path, onExpand, onCollapse })
    const displayChildren = useDisplayChildren(
        path,
        children,
        orgUnitsPathsToInclude
    )

    const content =
        !!displayChildren.length && open
            ? displayChildren.map(childId => {
                  const childPath = `${path}/${child.id}`

                  // @TODO
                  if (tree[childPath].error) {
                      return null
                  }

                  return (
                      <OrgUnitTree
                          {...props}
                          key={childPath}
                          path={childPath}
                      />
                  )
              })
            : null

    return (
        <Node
            open={open}
            onOpen={onToggleOpen}
            onClose={onToggleOpen}
            component={
                <Label
                    id={id}
                    path={path}
                    open={open}
                    displayName={displayName}
                    loading={loading}
                    hasChildren={!!displayChildren.length}
                    onChange={onChange}
                    onToggleOpen={onToggleOpen}
                    error={error}
                    checked={checked}
                    highlighted={highlighted}
                    disableSelection={disableSelection}
                    singleSelectionOnly={singleSelectionOnly}
                    hasSelectedDescendants={hasSelectedDescendants}
                />
            }
        >
            {content}
        </Node>
    )
}

OrgUnitTree.propTypes = {
    path: orgUnitPathPropValidator,
    onChange: propTypes.func.isRequired,
    tree: propTypes.object.isRequired,

    selected: propTypes.arrayOf(orgUnitPathPropValidator),
    expanded: propTypes.arrayOf(orgUnitPathPropValidator),
    highlighted: propTypes.arrayOf(orgUnitPathPropValidator),
    orgUnitsPathsToInclude: propTypes.arrayOf(orgUnitPathPropValidator),

    singleSelectionOnly: propTypes.bool,
    disableSelection: propTypes.bool,

    onExpand: propTypes.func,
    onCollapse: propTypes.func,
}

export { OrgUnitTree }
