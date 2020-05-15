import React, { useMemo } from 'react'
import propTypes from '@dhis2/prop-types'

import { colors } from '@dhis2/ui-core'

import Apps from './HeaderBar/Apps.js'
import Profile from './HeaderBar/Profile.js'

import { useDataQuery, useConfig } from '@dhis2/app-runtime'

import { Logo } from './HeaderBar/Logo.js'
import { Title } from './HeaderBar/Title.js'

import { Notifications } from './HeaderBar/Notifications.js'

import i18n from './locales'

const query = {
    title: {
        resource: 'systemSettings/applicationTitle',
    },
    user: {
        resource: 'me',
    },
    apps: {
        resource: 'action::menu/getModules',
    },
    notifications: {
        resource: 'me/dashboard',
    },
}

export const HeaderBar = ({ appName, className }) => {
    const baseUrl = useConfig().baseUrl
    const { loading, error, data } = useDataQuery(query)

    const apps = useMemo(() => {
        const getPath = path =>
            path.startsWith('http:') || path.startsWith('https:')
                ? path
                : `${baseUrl}api/${path}`

        return data?.apps.modules.map(app => ({
            ...app,
            icon: getPath(app.icon),
            defaultAction: getPath(app.defaultAction),
        }))
    }, [data])

    if (!loading && !error) {
        // TODO: This will run every render which is probably wrong!  Also, setting the global locale shouldn't be done in the headerbar
        const locale = data.user.settings.keyUiLocale || 'en'
        i18n.setDefaultNamespace('default')
        i18n.changeLanguage(locale)
    }

    return (
        <header className={className}>
            {!loading && !error && (
                <>
                    <Logo />
                    <Title
                        app={appName}
                        instance={data.title.applicationTitle}
                    />
                    <div className="right-control-spacer" />
                    <Notifications
                        interpretations={
                            data.notifications.unreadInterpretations
                        }
                        messages={data.notifications.unreadMessageConversations}
                    />
                    <Apps apps={apps} />
                    <Profile user={data.user} />
                </>
            )}

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
                .right-control-spacer {
                    margin-left: auto;
                }
            `}</style>
        </header>
    )
}

HeaderBar.propTypes = {
    appName: propTypes.string,
    className: propTypes.string,
}
