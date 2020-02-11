import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { SingleSelectField as UiCoreSingleSelectField } from '@dhis2/ui-core'

/**
 * @module
 *
 * @param {SingleSelectField.PropTypes} props
 * @returns {React.Component}
 *
 * @example import { SingleSelectField } from '@dhis2/ui-widgets'
 * @description This component adds translations to its counterpart in ui-core.
 * The default property values for locale "en" are listed below.
 * For more information, please refer to ui-core:
 * @see Demo: {@link https://ui-core.dhis2.nu/demo/?path=/story/singleselectfield--default}
 * @see API docs: {@link https://ui-core.dhis2.nu/#module_SingleSelectField}
 */

const SingleSelectField = props => <UiCoreSingleSelectField {...props} />

SingleSelectField.defaultProps = {
    dataTest: 'dhis2-uiwidgets-SingleSelectField',
    clearText: i18n.t('Clear'),
    filterPlaceholder: i18n.t('Filter'),
    loadingText: i18n.t('Loading'),
    noMatchText: i18n.t('No Match'),
}
/**
 * @typedef {Object} PropTypes
 * @static
 *
 * @prop {string} [dataTest]
 * @prop {string} [clearText=Clear] - Only required if clearable is true
 * @prop {string} [filterPlaceholder=Filter]
 * @prop {string} [loadingText=Loading]
 * @prop {string} [noMatchText=No Match] - Only required if filterable is true
 */

SingleSelectField.propTypes = UiCoreSingleSelectField.propTypes
SingleSelectField.displayName = 'SingleSelectFieldTranslated'

export { SingleSelectField }
