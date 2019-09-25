import React from 'react'
import PropTypes from 'prop-types'

const LogoImage = ({ src }) => <img alt="Headerbar Logo" src={src} />

LogoImage.propTypes = {
    src: PropTypes.string.isRequired,
}
