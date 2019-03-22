import React from 'react'
import PropTypes from 'prop-types'

import { LogoIconWhite, colors } from '@dhis2/ui-core'
import NotificationIcon from './NotificationIcon'

import Apps from './Apps'
import Profile from './Profile'

import { Email } from '../icons/Email.js'
import { Message } from '../icons/Message.js'

import css from 'styled-jsx/css'
import cx from 'classnames'

import styles from './styles.js'

import { DataRequest } from '@dhis2/app-service-data'

const notificationIcon = css.resolve`
    svg {
		fill: ${colors.white};
        cursor: pointer;
		height: 24px;
		width: 24px;
    }
`

const logotype = css.resolve`
    svg {
        width: 27px;
        height: 25px;
        cursor: pointer;
    }
`

function getTitle(instanceName, appName = '') {
    if (!appName) {
        return instanceName
    }

    return `${instanceName} - ${appName}`
}

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
        <header className={cx('blue', className)}>
            <div>
                <div className="headerbar-logo">
                    <a href="/">
                        <LogoIconWhite className={logotype.className} />
                    </a>
                </div>
                <div className="headerbar-title">
                    {getTitle(instanceName, appName)}
                </div>
            </div>

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
                            >
                                <Message
                                    className={notificationIcon.className}
                                />
                            </NotificationIcon>
                            <NotificationIcon
                                icon="email"
                                count={data.unreadMessageConversations}
                                href={`/dhis-web-messaging`}
                            >
                                <Email className={notificationIcon.className} />
                            </NotificationIcon>
                            <Apps />
                            <Profile />
                        </div>
                    )
                }}
            </DataRequest>

            {notificationIcon.styles}
            {logotype.styles}
            <style jsx>{styles}</style>
        </header>
    )
}

HeaderBar.propTypes = {
    className: PropTypes.string,
    baseURL: PropTypes.string,
    instanceName: PropTypes.string.isRequired,
    appName: PropTypes.string,
    messages: PropTypes.shape({
        count: PropTypes.number,
    }),
    interpretations: PropTypes.shape({
        count: PropTypes.number,
    }),
    apps: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            path: PropTypes.string,
            img: PropTypes.string,
        })
    ),
    profile: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        src: PropTypes.string,
    }),
}

export { HeaderBar }
export default HeaderBar
