import React from 'react'
import PropTypes from 'prop-types'

export const LogoImage = ({ src }) => (
    <span>
        <img alt="Headerbar Logo" src={src} />

        <style jsx>{`
            span {
                display: block;
                min-width: 48px;
                height: 48px;
            }

            img {
                max-height: 100%;
                min-height: auto;
                min-width: auto;
            }
        `}</style>
    </span>
)

LogoImage.propTypes = {
    src: PropTypes.string.isRequired,
}
