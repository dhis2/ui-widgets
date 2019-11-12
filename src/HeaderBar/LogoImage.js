import React from 'react'
import PropTypes from 'prop-types'
import css from 'styled-jsx/css'

import { useDataQuery } from '@dhis2/app-runtime'
import { LogoIconWhite } from '@dhis2/ui-core'

const defaultLogo = css.resolve`
    svg {
        height: 25px;
        width: 27px;
    }
`

const query = {
    customLogo: {
        resource: 'staticContent/logo_banner',
    },
}

const pathExists = data =>
    data &&
    data.customLogo &&
    data.customLogo.images &&
    data.customLogo.images.png

export const LogoImage = () => {
    const { loading, error, data } = useDataQuery(query)

    if (loading) return null

    let Logo
    if (!error && pathExists(data)) {
        Logo = <img alt="Headerbar Logo" src={data.customLogo.images.png} />
    } else {
        Logo = <LogoIconWhite className={defaultLogo.className} />
    }

    return (
        <div>
            {Logo}

            {defaultLogo.styles}
            <style jsx>{`
                div {
                    padding: 4px;
                    min-width: 48px;
                    max-width: 250px;
                    height: 48px;

                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                }

                img {
                    max-height: 100%;
                    min-height: auto;
                    width: auto;
                }
            `}</style>
        </div>
    )
}
