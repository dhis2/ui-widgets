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
        resource: 'staticContent/custom_logo',
    },
}

export const LogoImage = () => {
    const { loading, error, data } = useDataQuery(query)

    if (loading) return null

    return (
        <div>
            {error ? (
                <LogoIconWhite className={defaultLogo.className} />
            ) : (
                <img alt="Headerbar Logo" src={data.customLogo.path} />
            )}

            {defaultLogo.styles}
            <style jsx>{`
                div {
                    padding: 0 12px 0 12px;
                    min-width: 48px;
                    height: 48px;

                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                img {
                    max-height: 100%;
                    min-height: auto;
                    min-width: auto;
                }
            `}</style>
        </div>
    )
}