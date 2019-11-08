import React from 'react'
import PropTypes from 'prop-types'

import { colors } from '@dhis2/ui-core'

export const Title = ({ app, instance }) => (
    <div data-test-id="headerbar-title">
        {app ? `${instance} - ${app}` : `${instance}`}

        <style jsx>{`
            div {
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 14px;
                font-weight: 500;
                letter-spacing: 0.01em;
                white-space: nowrap;
                color: ${colors.white};
            }
        `}</style>
    </div>
)
