import React from 'react'
import PropTypes from 'prop-types'

import { NotificationIcon } from './NotificationIcon'

export const Notifications = ({ interpretations, messages, contextPath }) => (
    <div>
        <NotificationIcon
            count={interpretations}
            href={`${contextPath}/dhis-web-interpretation`}
            kind="message"
        />

        <NotificationIcon
            message="email"
            count={messages}
            href={`${contextPath}/dhis-web-messaging`}
            kind="interpretation"
        />

        <style jsx>{`
            div {
                user-select: none;
                display: flex;
                flex-direction: row;
                align-items: center;
            }
        `}</style>
    </div>
)
