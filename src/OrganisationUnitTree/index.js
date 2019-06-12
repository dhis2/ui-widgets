import { Checkbox, Tree } from '@dhis2/ui-core'
import React, { useCallback, useEffect, useState } from 'react'
import propTypes from 'prop-types'

import {
    orgUnitPathPropValidator,
    expandUnit,
    collapseUnit,
    getIdFromPath,
} from './helper'
import { OrgUnitTree } from './OrgUnitTree'

const OrganisationUnitTree = ({
    roots,
    selected,
    initiallyExpanded,
    forceReload,
    onChange,
    openFirstLevel,
    singleSelectionOnly,
    onExpand,
    onCollapse,
    onUnitLoaded,
    onUnitUnloaded,
}) => {
    const [expanded, setExpanded] = useState(initiallyExpanded)
    const handleExpand = useCallback(
        expandUnit(expanded, setExpanded, onExpand),
        [expanded, onExpand]
    )
    const handleCollapse = useCallback(
        collapseUnit(expanded, setExpanded, onCollapse),
        [expanded, onCollapse]
    )
    const [reloadId, setReloadId] = useState(0)

    useEffect(() => {
        forceReload === true && setReloadId(reloadId + 1)
    }, [forceReload])

    return (
        <div key={reloadId}>
            {(Array.isArray(roots) ? roots : [roots]).map(root => (
                <OrgUnitTree
                    key={root}
                    path={`/${root}`}
                    onChange={onChange}
                    expanded={expanded}
                    selected={selected}
                    singleSelectionOnly={singleSelectionOnly}
                    onExpand={handleExpand}
                    onCollapse={handleCollapse}
                    onUnitLoaded={onUnitLoaded}
                    onUnitUnloaded={onUnitUnloaded}
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
     * When set to "true", everything will be reloaded.
     * In order to load it again after reloading,
     * "forceReload" has to be set to false and then to true again
     */
    forceReload: propTypes.bool,

    /**
     * An array of paths of selected OUs
     *
     * The path of an OU is the UIDs of the OU
     * and all its parent OUs separated by slashes (/)
     */
    selected: propTypes.arrayOf(orgUnitPathPropValidator),

    /**
     * An array of OU paths that will be expanded automatically
     * as soon as they are encountered
     *
     * The path of an OU is the UIDs of the OU
     * and all its parent OUs separated by slashes (/)
     */
    initiallyExpanded: propTypes.arrayOf(orgUnitPathPropValidator),

    /**
     * Called with { path: string }
     * with the path of the parent of the level opened
     */
    onExpand: propTypes.func,

    /**
     * Called with { path: string }
     * with the path of the parent of the level closed
     */
    onCollapse: propTypes.func,

    /**
     * Called with { path: string }
     * after a unit's data has been loaded
     */
    onUnitLoaded: propTypes.func,

    /**
     * Called with { path: string }
     * after a unit's data has been unloaded
     * and the component unmounts
     */
    onUnitUnloaded: propTypes.func,
}

OrganisationUnitTree.defaultProps = {
    selected: [],
    initiallyExpanded: [],
    openFirstLevel: true,
}

/**
 * ========================
 * Exposed helper functions
 * ========================
 */
OrganisationUnitTree.getIdFromPath = getIdFromPath

export { OrganisationUnitTree }
