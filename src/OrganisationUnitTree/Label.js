import { Checkbox, colors } from '@dhis2/ui-core'
import React from 'react'
import propTypes from 'prop-types'
import css from 'styled-jsx/css'
import cx from 'classnames'

import { FolderOpen } from './icons/FolderOpen'
import { FolderClosed } from './icons/FolderClosed'
import { Single } from './icons/Single'

const DisabledSelectionLabel = ({ label, loading, onToggleOpen }) => (
    <SingleSelectionLabel
        checked={false}
        loading={loading}
        label={label}
        onChange={onToggleOpen}
    />
)

DisabledSelectionLabel.propTypes = {
    label: propTypes.string.isRequired,
    loading: propTypes.bool,
}

/**
 * @TODO: Use correct styles for background when checked
 */
const SingleSelectionLabel = ({ checked, label, onChange, loading }) => (
    <span onClick={onChange} className={cx({ checked, loading })}>
        {label}

        <style jsx>{`
            span {
                display: inline-block;
                background: transparent;
                border-radius: 3px;
                padding: 0 5px;
                line-height: 26px;
                white-space: nowrap;
                cursor: pointer;
                user-select: none;
            }

            .checked {
                background: green;
                color: white;
            }

            .loading {
                cursor: auto;
            }
        `}</style>
    </span>
)

SingleSelectionLabel.propTypes = {
    label: propTypes.string.isRequired,
    onClick: propTypes.func,
    loading: propTypes.bool,
}

const ErrorMessage = ({ id, error, singleSelectionOnly }) => (
    <span className={cx({ 'with-checkbox': !singleSelectionOnly })}>
        {`
            An error occured loading organisation unit with id "${id}".
            Error: ${error.message}
        `}

        <style jsx>{`
            span {
                display: inline-block;
                padding-left: 5px;
                color: ${colors.red500};
            }

            .with-checkbox {
                padding-left: 32px;
            }
        `}</style>
    </span>
)

ErrorMessage.propTypes = {
    id: propTypes.string.isRequired,
    error: propTypes.shape({ message: propTypes.string }).isRequired,
    singleSelectionOnly: propTypes.bool,
}

const Label = ({
    id,
    path,
    open,
    loading,
    error,
    checked,
    onChange,
    hasChildren,
    highlighted,
    displayName,
    onToggleOpen,
    disableSelection,
    singleSelectionOnly,
    hasSelectedDescendants,
}) => {
    const label = loading || !displayName ? 'Loading...' : displayName
    const onClick = event => {
        const newChecked = event.target.checked
        !loading && onChange({ id, path, checked: newChecked }, event)
    }

    /* @TODO Add proper highlighted style once spec exists */
    return (
        <div className={cx({ highlighted })}>
            <span>
                {!loading && error ? (
                    <ErrorMessage
                        id={id}
                        error={error}
                        singleSelectionOnly={singleSelectionOnly}
                    />
                ) : disableSelection ? (
                    <DisabledSelectionLabel
                        label={label}
                        loading={loading}
                        onToggleOpen={onToggleOpen}
                    />
                ) : singleSelectionOnly ? (
                    <SingleSelectionLabel
                        checked={checked}
                        label={label}
                        onChange={onClick}
                        loading={loading}
                    >
                        {label}
                    </SingleSelectionLabel>
                ) : (
                    <Checkbox
                        disabled={loading}
                        checked={checked}
                        name="org-unit"
                        value={id}
                        label={label}
                        indeterminate={!checked && hasSelectedDescendants}
                        onChange={onClick}
                        icon={
                            !hasChildren ? (
                                <Single />
                            ) : open ? (
                                <FolderOpen />
                            ) : (
                                <FolderClosed />
                            )
                        }
                    />
                )}
            </span>

            <style jsx>{`
                div {
                    display: flex;
                }

                span {
                    display: block;
                }

                .highlighted :global(*) {
                    text-decoration: underline;
                }
            `}</style>
        </div>
    )
}

Label.propTypes = {
    id: propTypes.string.isRequired,
    path: propTypes.string.isRequired,
    displayName: propTypes.string.isRequired,

    open: propTypes.bool.isRequired,
    loading: propTypes.bool.isRequired,
    hasChildren: propTypes.bool.isRequired,

    onChange: propTypes.func.isRequired,
    onToggleOpen: propTypes.func.isRequired,

    error: propTypes.string,

    checked: propTypes.bool,
    highlighed: propTypes.bool,
    disableSelection: propTypes.bool,
    singleSelectionOnly: propTypes.bool,
    hasSelectedDescendants: propTypes.bool,
}

export { Label }
