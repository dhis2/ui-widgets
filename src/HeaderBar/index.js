import React from 'react'
import PropTypes from 'prop-types'

import { colors } from '@dhis2/ui-core'

import Apps from './Apps'
import Profile from './Profile'

import css from 'styled-jsx/css'

import { Query } from '@dhis2/app-service-data'

import { Logo } from './Logo.js'
import { Title } from './Title.js'

import { Notifications } from './Notifications.js'

export const HeaderBar = ({ appName, className }) => (
    <Query
        query={{
            systemInfo: {
                resource: 'system/info',
            },
            user: {
                resource: 'me',
            },
            apps: {
                resource: '../../dhis-web-commons/menu/getModules.action',
            },
            notifications: {
                resource: 'me/dashboard',
            },
        }}
    >
        {({ loading, error, data }) => {
            if (loading) return <span>...</span>

            if (error) return <span>{`ERROR: ${error.message}`}</span>

            const { systemInfo, user, apps, notifications } = data

            return (
                <header className={className}>
                    <Logo />

                    <Title app={appName} instance={systemInfo.systemName} />

                    <Notifications
                        interpretations={notifications.unreadInterpretations}
                        messages={notifications.unreadMessageConversations}
                    />

                    <Apps apps={apps.modules} />

                    <Profile user={user} />

                    <style jsx>{`
                        header {
                            background-color: #2c6693;
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            justify-content: space-between;
                            height: 48px;
                            border-bottom: 1px solid rgba(32, 32, 32, 0.15);
                            color: ${colors.white};
                        }
                    `}</style>
                </header>
            )
        }}
    </Query>
)

HeaderBar.propTypes = {
    className: PropTypes.string,
    appName: PropTypes.string,
}
