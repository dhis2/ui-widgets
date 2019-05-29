import { Checkbox, Tree } from '@dhis2/ui-core'
import React from 'react'
import propTypes from 'prop-types'

import { orgUnitPathPropValidator } from './helper'
import { OrgUnitTree } from './OrgUnitTree';

const OrganisationUnitTree = ({
    roots,
    selected,
    initiallyExpanded,
    onChange,
    openFirstLevel,
}) => (
    <div>
        {(Array.isArray(roots) ? roots : [ roots ]).map(
            root => (
                <OrgUnitTree
                    key={root}
                    path={root}
                    onChange={onChange}
                    initiallyExpanded={initiallyExpanded}
                    selected={selected}
                    open={true}
                />
            )
        )}
    </div>
)

OrganisationUnitTree.propTypes = {
    /* Root org unit id(s) */
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

    /* Should the first level be expanded */
    openFirstLevel: propTypes.bool,

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
}

OrganisationUnitTree.defaultProps = {
    selected: [],
    initiallyExpanded: [],
    openFirstLevel: true,
}

export { OrganisationUnitTree }
