import { Checkbox, Tree } from '@dhis2/ui-core'
import React, { useCallback, useState } from 'react'
import propTypes from 'prop-types'

import { orgUnitPathPropValidator } from './helper'
import { OrgUnitTree } from './OrgUnitTree'

const OrganisationUnitTree = ({
    roots,
    selected,
    initiallyExpanded,
    onChange,
    openFirstLevel,
    singleSelectionOnly,
    onExpand,
    onCollapse,
}) => {
    const [expanded, setExpanded] = useState(initiallyExpanded)
    const handleExpand = useCallback(
        ({ path, ...rest }) => {
            const pathIndex = expanded.indexOf(path)

            if (pathIndex === -1) {
                setExpanded([...expanded, path])

                if (onExpand) {
                    onExpand({ path, ...rest })
                }
            }
        },
        [expanded, onExpand]
    )

    const handleCollapse = useCallback(
        ({ path, ...rest }) => {
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
        },
        [expanded, onCollapse]
    )

    return (
        <div>
            {(Array.isArray(roots) ? roots : [roots]).map(root => (
                <OrgUnitTree
                    key={root}
                    path={root}
                    onChange={onChange}
                    expanded={expanded}
                    selected={selected}
                    singleSelectionOnly={singleSelectionOnly}
                    onExpand={handleExpand}
                    onCollapse={handleCollapse}
                />
            ))}
        </div>
    )
}

OrganisationUnitTree.propTypes = {
    /**
     * Root org unit id(s)
     */
    roots: propTypes.oneOfType([
        propTypes.string,
        propTypes.arrayOf(propTypes.string),
    ]).isRequired,

    /**
     * Will be called with the following object
     * {
     *   id: string;
     *   path: string;
     *   checked: boolean;
     * }
     */
    onChange: propTypes.func.isRequired,

    /**
     * Should the first level be expanded
     */
    openFirstLevel: propTypes.bool,

    /**
     * When set, no checkboxes will be displayed
     * and only the first selected path in `selected` will be highlighted
     */
    singleSelectionOnly: propTypes.bool,

    /**
     * An array of paths of selected OUs
     *
     * The path of an OU is the UIDs of the OU and all its parent OUs separated by slashes (/)
     */
    selected: propTypes.arrayOf(orgUnitPathPropValidator),

    /**
     * An array of OU paths that will be expanded automatically as soon as they are encountered
     *
     * The path of an OU is the UIDs of the OU and all its parent OUs separated by slashes (/)
     */
    initiallyExpanded: propTypes.arrayOf(orgUnitPathPropValidator),

    /**
     * Called with { path: string } with the path of the parent of the level opened
     */
    onExpand: propTypes.func,

    /**
     * Called with { path: string } with the path of the parent of the level closed
     */
    onCollapse: propTypes.func,
}

OrganisationUnitTree.defaultProps = {
    selected: [],
    initiallyExpanded: [],
    openFirstLevel: true,
}

export { OrganisationUnitTree }
