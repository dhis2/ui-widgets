import { useDataEngine } from '@dhis2/app-runtime'
import React, { useEffect } from 'react'
import propTypes from 'prop-types'

import { orgUnitPathPropValidator, orgUnitIdPropValidator } from './propTypes'
import { OrgUnitTree } from './OrgUnitTree'
import { useExpand } from './useExpand'
import { loadChildrenForIds, useOrgData } from './useOrgData'

const OrganisationUnitTree = ({
    roots,
    selected,
    onChange,
    forceReload,
    highlighted,
    openFirstLevel,
    disableSelection,
    initiallyExpanded,
    singleSelectionOnly,
    orgUnitsPathsToInclude,
    idsThatShouldBeReloaded,
    onExpand,
    onCollapse,
    onUnitLoaded,
    onUnitUnloaded,
    onForceReloadDone,
}) => {
    useEffect(() => {
        console.clear()
    }, [])

    const engine = useDataEngine()
    const rootUnits = Array.isArray(roots) ? roots : [roots]
    const { tree, loadChildrenFor, loadChildrenForPath } = useOrgData({
        rootUnits,
        idsThatShouldBeReloaded,
        forceReload,
        onForceReloadDone,
    })
    const { expanded, handleExpand, handleCollapse } = useExpand({
        initiallyExpanded,
        loadChildrenForPath,
        tree,
        openFirstLevel,
        rootUnits,
        onExpand,
        onCollapse,
    })

    /**
     * Load root unit data initially
     */
    useEffect(() => {
        const pathsToBePreloaded = initiallyExpanded.reduce((grouped, path) => {
            const parts = path.replace(/^\//, '').split('/')

            return parts.reduce((curGrouped, part, depth) => {
                if (!curGrouped[depth]) {
                    curGrouped[depth] = []
                }

                //const curPath = `/${parts.slice(0, depth + 1).join('/')}`
                const curPath = part

                if (curGrouped[depth].indexOf(curPath) !== -1) {
                    return curGrouped
                }

                return [
                    ...curGrouped.slice(0, depth),
                    [...curGrouped[depth], curPath],
                    ...curGrouped.slice(depth + 1),
                ]
            }, grouped)
        }, [])

        // group for child ids of deepest group
        pathsToBePreloaded.push([])

        pathsToBePreloaded.reduce(
            (promise, depthGroup, depth) =>
                promise.then(() => {
                    return (
                        loadChildrenFor(depthGroup)
                            // add all children ids of paths to be opened
                            // so we can display their names and children count as well
                            .then(responses => {
                                const nextDepthIds = responses
                                    .map(({ children }) => children)
                                    .reduce(
                                        (flattened, children) => [
                                            ...flattened,
                                            ...children,
                                        ],
                                        []
                                    )

                                const nextDepth = depth + 1
                                const nextDepthGroup =
                                    pathsToBePreloaded[nextDepth]

                                nextDepthIds.forEach(id => {
                                    if (nextDepthGroup.indexOf(id) === -1) {
                                        nextDepthGroup.push(id)
                                    }
                                })
                            })
                    )
                }),
            Promise.resolve()
        )

        //loadChildrenFor(rootUnits).then(loadedRoots =>
        //    loadedRoots.forEach(({ children }) => loadChildrenFor(children))
        //)
    }, [])

    return (
        <div>
            {rootUnits.map(root =>
                !orgUnitsPathsToInclude.length ||
                orgUnitsPathsToInclude.some(path => path.match(root)) ? (
                    <OrgUnitTree
                        key={root}
                        path={`/${root}`}
                        tree={tree}
                        onChange={onChange}
                        selected={selected}
                        expanded={expanded}
                        highlighted={highlighted}
                        orgUnitsPathsToInclude={orgUnitsPathsToInclude}
                        singleSelectionOnly={singleSelectionOnly}
                        disableSelection={disableSelection}
                        onExpand={handleExpand}
                        onCollapse={handleCollapse}
                    />
                ) : null
            )}
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
     * When set to true, no unit can be selected
     */
    disableSelection: propTypes.bool,

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
     * All organisation units with a path that inclused the provided
     * paths will be shown. All others will not be rendered.
     * When not provided, all org units will be shown.
     */
    orgUnitsPathsToInclude: propTypes.arrayOf(orgUnitPathPropValidator),

    /**
     * All units provided to "highlighted" as path will be visually
     * highlighted.
     *
     * ==================
     * Note:
     * The d2-ui component used two props for this:
     * * searchResults
     * * highlightSearchResults
     *
     * Instead of activating/deactivating highlighting units,
     * just provide the units or an empty array
     */
    highlighted: propTypes.arrayOf(orgUnitPathPropValidator),

    /**
     * All units with ids (not paths!) provided
     * to "idsThatShouldBeReloaded" will be reloaded
     * In order to reload an id twice, the array must be changed
     * while keeping the id to reload in the array
     *
     * Note: in order to know which unit has been forced to reload,
     * the first argument of the "onUnitLoaded" callback contains
     * a "forced" property
     */
    idsThatShouldBeReloaded: propTypes.arrayOf(orgUnitIdPropValidator),

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
     * Called after all previously loaded units
     * have been reloaded after setting "forceReload"
     * to true
     */
    onForceReloadDone: propTypes.func,
}

OrganisationUnitTree.defaultProps = {
    selected: [],
    initiallyExpanded: [],
    orgUnitsPathsToInclude: [],
    idsThatShouldBeReloaded: [],
    highlighted: [],
    openFirstLevel: true,
}

export { OrganisationUnitTree }
