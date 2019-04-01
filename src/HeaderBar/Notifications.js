import React from 'react'
import PropTypes from 'prop-types'

import { NotificationIcon } from './NotificationIcon'

export const Notifications = ({ interpretations, messages }) => (
    <div>
        <NotificationIcon
            count={interpretations}
            href={`/dhis-web-interpretation`}
            kind="message"
        />

        <NotificationIcon
            message="email"
            count={messages}
            href={`/dhis-web-messaging`}
            kind="interpretation"
        />

        <style jsx>{`
            div {
                margin-left: auto;
                user-select: none;
                display: flex;
                flex-direction: row;
                align-items: center;
            }
        `}</style>
    </div>
)
