import React from 'react'
import PropTypes from 'prop-types'

export const LogoImage = ({ src }) => <img alt="Headerbar Logo" src={src} />

LogoImage.propTypes = {
    src: PropTypes.string.isRequired,
}
