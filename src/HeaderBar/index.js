import React from 'react'
import PropTypes from 'prop-types'

import { colors } from '@dhis2/ui-core'

import Apps from './Apps'
import Profile from './Profile'

import css from 'styled-jsx/css'

import { DataRequest } from '@dhis2/app-service-data'

import { Logo } from './Logo.js'
import { Title } from './Title.js'

import { Notifications } from './Notifications.js'

export const HeaderBar = ({ appName, className }) => (
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
                        }
                    `}</style>
                </header>
            )
        }}
    </DataRequest>
)

HeaderBar.propTypes = {
    className: PropTypes.string,
    appName: PropTypes.string,
}
