import React from 'react'
import PropTypes from 'prop-types'

import { DataRequest } from '@dhis2/app-service-data'

import { NotificationIcon } from './NotificationIcon'

export const Notifications = () => (
    <DataRequest resourcePath="me/dashboard">
        {({ error, loading, data }) => {
            console.log(loading, error, data)

            if (loading) return <span>...</span>

            if (error) return <span>{`ERROR: ${error.message}`}</span>

            return (
                <div>
                    <NotificationIcon
                        count={data.unreadInterpretations}
                        href={`/dhis-web-interpretation`}
                        kind="message"
                    />

                    <NotificationIcon
                        message="email"
                        count={data.unreadMessageConversations}
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
        }}
    </DataRequest>
)
