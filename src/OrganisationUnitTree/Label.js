import { Checkbox, Tree } from '@dhis2/ui-core'
import React from 'react'
import propTypes from 'prop-types'
import css from 'styled-jsx/css'
import cx from 'classnames'

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
    onClick: propTypes.func.isRequired,
}

const Label = ({
    id,
    path,
    loading,
    checked,
    onChange,
    displayName,
    singleSelectionOnly,
    hasSelectedDescendants,
}) => {
    const label = loading ? 'Loading...' : displayName
    const onClick = event => {
        const newChecked = event.target.checked
        !loading && onChange({ id, path, checked: newChecked }, event)
    }

    return (
        <Tree.Label>
            {singleSelectionOnly ? (
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
                />
            )}
        </Tree.Label>
    )
}

Label.propTypes = {}

export { Label }
