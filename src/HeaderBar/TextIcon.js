import React from 'react'
import PropTypes from 'prop-types'

import css from 'styled-jsx/css'

export const TextIcon = ({ name, onClick }) => {
    let title = name[0]

    if (name.indexOf(' ') > 0) {
        title += name.split(' ')[1][0]
    }

    return (
        <div className="root" onClick={onClick}>
            <div className="initials">{title}</div>

            <style jsx>{`
                .root {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                    overflow: hidden;
                    border-radius: 50%;
                    background-color: rgba(0, 0, 0, 0.3);
                    color: #fff;
                    cursor: pointer;
                }

                div {
                    font-size: 14px;
                    font-weight: 500;
                    letter-spacing: 1px;
                    text-align: center;
                    text-transform: uppercase;
                }
            `}</style>
        </div>
    )
}

TextIcon.defaultProps = {
    onClick: undefined,
}

TextIcon.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}
