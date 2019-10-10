import React from 'react'
import PropTypes from 'prop-types'

import css from 'styled-jsx/css'

export const ImageIcon = ({ src, onClick, dataTestId }) => (
    <div onClick={onClick} data-test-id={dataTestId}>
        <img src={src} alt="user avatar" />

        <style jsx>{`
            img {
                max-width: 100%;
                max-height: 100%;
            }

            div {
                width: 48px;
                height: 48px;
            }
        `}</style>
    </div>
)

ImageIcon.defaultProps = {
    onClick: undefined,
}

ImageIcon.propTypes = {
    src: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    dataTestId: PropTypes.string,
}
