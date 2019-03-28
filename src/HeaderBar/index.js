import React from 'react'
import PropTypes from 'prop-types'

import { LogoIconWhite, colors } from '@dhis2/ui-core'
import NotificationIcon from './NotificationIcon'

import Apps from './Apps'
import Profile from './Profile'

import css from 'styled-jsx/css'

import { DataRequest } from '@dhis2/app-service-data'

const logotype = css.resolve`
    svg {
        width: 27px;
        height: 25px;
        cursor: pointer;
    }
`

const Logo = () => (
    <div className="root">
        <a href="/">
            <LogoIconWhite className={logotype.className} />
        </a>

        {logotype.styles}
        <style jsx>{`
            .root {
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

const Title = ({ app, instance }) => (
    <div>
        {app ? `${instance} - ${app}` : `${instance}`}

        <style jsx>{`
            div {
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 14px;
                font-weight: 500;
                letter-spacing: 0.01em;
                white-space: nowrap;
            }
        `}</style>
    </div>
)

const Notifications = () => (
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

function HeaderBar({
    baseURL,
    instanceName,
    appName,
    apps,
    profile,
    messages,
    interpretations,
    className,
}) {
    return (
        <DataRequest resourcePath="system/info">
            {({ loading, error, data }) => {
                if (loading) return <span>...</span>

                if (error) return <span>{`ERROR: ${error.message}`}</span>

                return (
                    <header className={className}>
                        <Logo />

                        <Title app={appName} instance={data.systemName} />

                        <Notifications />

                        <Apps />

                        <Profile />

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

                                flex-direction: row;
                            }

                            header > div:last-child {
                                display: flex;
                                flex-direction: row;
                            }
                        `}</style>
                    </header>
                )
            }}
        </DataRequest>
    )
}

HeaderBar.propTypes = {
    className: PropTypes.string,
    appName: PropTypes.string,
}

export { HeaderBar }
export default HeaderBar
