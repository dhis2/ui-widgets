import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { FileInputFieldWithList as UiCoreFileInputFieldWithList } from '@dhis2/ui-core'

/**
 * @module
 *
 * @param {FileInputFieldWithList.PropTypes} props
 * @returns {React.Component}
 *
 * @example import { FileInputFieldWithList } from '@dhis2/ui-widgets'
 */

const placeholderText = (placeholder, multiple) =>
    placeholder || multiple
        ? i18n.t('No files selected yet')
        : i18n.t('No file selected yet')

const buttonLabelText = (label, multiple) =>
    label || multiple ? i18n.t('Upload files') : i18n.t('Upload file')

const FileInputFieldWithList = ({
    multiple,
    buttonLabel,
    placeholder,
    ...rest
}) => (
    <UiCoreFileInputFieldWithList
        multiple={multiple}
        buttonLabel={buttonLabelText(buttonLabel, multiple)}
        placeHolder={placeholderText(placeholder, multiple)}
        {...rest}
    />
)

/**
 * @typedef {Object} PropTypes
 * @description This component adds translations to its counterpart in ui-core.
 * The default property values for locale "en" are listed below.
 * For more information, please refer to ui-core:
 * <ul>
 * <li>{@link https://ui-core.dhis2.nu/#module_FileInputFieldWithList|API docs}</li>
 * <li>{@link https://ui-core.dhis2.nu/demo/?path=/story/fileinputfieldwithlist--default|Stories}</li>
 * </ul>
 * @static
 *
 * @prop {string} [dataTest=dhis2-uiwidgets-fileinputfieldwithlist]
 * @prop {string} [removeText=Remove]
 * @prop {string} [buttonLabel=Upload file] Will switch to "Upload file<b>s</b>" if multiple is true
 * @prop {string} [placeholder=No file selected yet] Will switch to "No file<b>s</b> selected yet" if multiple is true
 */

FileInputFieldWithList.defaultProps = {
    dataTest: 'dhis2-uiwidgets-fileinputfieldwithlist',
    removeText: i18n.t('Remove'),
}
FileInputFieldWithList.propTypes = UiCoreFileInputFieldWithList.propTypes
FileInputFieldWithList.displayName = 'FileInputFieldWithListTranslated'

export { FileInputFieldWithList }
