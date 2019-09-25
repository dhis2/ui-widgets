import React from 'react'
import PropTypes from 'prop-types'
import css from 'styled-jsx/css'

import { LogoIconWhite } from '@dhis2/ui-core'
import { LogoImage } from './LogoImage'

export const Logo = ({ loading, logoSrc }) => (
    <div data-test-id="headerbar-logo">
        <a href="/">
            <LogoImage src={`${process.env.PUBLIC_URL}/logo_banner.png`} />
        </a>

        <style jsx>{`
            div {
                box-sizing: border-box;
                min-width: 48px;
                height: 48px;
                margin: 0 12px 0 0;
                text-align: center;
            }

            a,
            a:hover,
            a:focus,
            a:active,
            a:visited {
                display: flex;
                user-select: none;
            }
        `}</style>
    </div>
)

Logo.propTypes = {
    loading: PropTypes.bool,
    logoSrc: PropTypes.string,
}
