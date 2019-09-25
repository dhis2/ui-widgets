import React from 'react'
import PropTypes from 'prop-types'
import css from 'styled-jsx/css'

import { LogoIconWhite } from '@dhis2/ui-core'
import { LogoImage } from './LogoImage'

const logotype = css.resolve`
    svg {
        width: 27px;
        height: 25px;
        cursor: pointer;
    }
`

export const Logo = ({ loading, logoSrc }) => (
    <div data-test-id="headerbar-logo">
        <a href="/">
            {!loading && logoSrc && <LogoImage src={logoSrc} />}
            {!loading && !logoSrc && (
                <LogoIconWhite className={logotype.className} />
            )}
        </a>

        {logotype.styles}
        <style jsx>{`
            div {
                box-sizing: border-box;
                width: 48px;
                height: 48px;
                margin: 0 12px 0 0;
                border-right: 1px solid rgba(32, 32, 32, 0.15);
                text-align: center;
            }

            a,
            a:hover,
            a:focus,
            a:active,
            a:visited {
                display: flex;
                width: 48px;
                height: 48px;
                background-color: transparent;
                cursor: pointer;
                user-select: none;
                justify-content: center;
                align-items: center;
            }
        `}</style>
    </div>
)

Logo.propTypes = {
    loading: PropTypes.bool,
    logoSrc: PropTypes.string,
}
