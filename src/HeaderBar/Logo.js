import React from 'react'
import PropTypes from 'prop-types'
import css from 'styled-jsx/css'

import { LogoImage } from './LogoImage.js'

export const Logo = ({ baseUrl }) => (
    <div data-test-id="headerbar-logo">
        <a href={baseUrl}>
            <LogoImage />
        </a>

        <style jsx>{`
            div {
                box-sizing: border-box;
                min-width: 49px;
                max-height: 48px;
                margin: 0 12px 0 0;
                border-right: 1px solid rgba(32, 32, 32, 0.15);
            }

            a,
            a:hover,
            a:focus,
            a:active,
            a:visited {
                user-select: none;
            }
        `}</style>
    </div>
)

Logo.propTypes = {
    baseUrl: PropTypes.string.isRequired,
}
