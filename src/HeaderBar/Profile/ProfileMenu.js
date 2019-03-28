import React from 'react'
import PropTypes from 'prop-types'

import css from 'styled-jsx/css'

import { Card, Divider, Menu, MenuItem, colors } from '@dhis2/ui-core'

import { Settings } from '../../icons/Settings.js'
import { Info } from '../../icons/Info.js'
import { Help } from '../../icons/Help.js'
import { Exit } from '../../icons/Exit.js'
import { Account } from '../../icons/Account.js'

import { Header } from './Header.js'

const iconStyle = css.resolve`
    svg {
		fill: ${colors.grey900};
        cursor: pointer;
		height: 24px;
		width: 24px;
    }
`

const list = [
    {
        icon: <Settings className={iconStyle.className} />,
        label: 'Settings',
        value: 'settings',
        link: `/dhis-web-user-profile/#/settings`,
        target: '_self',
    },
    {
        icon: <Account className={iconStyle.className} />,
        label: 'Account',
        value: 'account',
        link: `/dhis-web-user-profile/#/account`,
        target: '_self',
    },
    {
        icon: <Help className={iconStyle.className} />,
        label: 'Help',
        value: 'help',
        link:
            'https://docs.dhis2.org/master/en/user/html/dhis2_user_manual_en.html',
        target: '_blank',
        nobase: true,
    },
    {
        icon: <Info className={iconStyle.className} />,
        label: 'About DHIS2',
        value: 'about',
        link: `/dhis-web-user-profile/#/aboutPage`,
        target: '_self',
    },
    {
        icon: <Exit className={iconStyle.className} />,
        label: 'Logout',
        value: 'logout',
        link: `/dhis-web-commons-security/logout.action`,
        target: '_self',
    },
]

export const ProfileMenu = ({ avatar, name, email }) => (
    <div className="contents">
        <Card>
            <div className="profile-alignment">
                <Divider margin="13px 0 7px 0" />
                <ul>
                    {list.map(
                        ({ label, value, icon, link, target, nobase }) => {
                            return (
                                <a
                                    href={link}
                                    target={target}
                                    key={`h-p-${value}`}
                                >
                                    <MenuItem
                                        key={`h-mi-${value}`}
                                        label={label}
                                        value={value}
                                        icon={icon}
                                    />
                                </a>
                            )
                        }
                    )}
                </ul>
            </div>
        </Card>
        {iconStyle.styles}
        <style jsx>{`
            div {
                width: 100%;
                padding: 8px 0;
            }
        `}</style>
    </div>
)
