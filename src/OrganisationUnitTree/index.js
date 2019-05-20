import { Checkbox, Tree } from '@dhis2/ui-core'
import React from 'react'
import propTypes from 'prop-types'

import { select, deselect, expand, collapse } from './state/reducer'
import { orgUnitPathPropValidator } from './helper'

const OrganisationUnitTree = ({}) => {
    return <OrgUnitTree />
}

OrganisationUnitTree.propTypes = {
    /* Root org unit id */
    root: propTypes.string.isRequired,

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
}
