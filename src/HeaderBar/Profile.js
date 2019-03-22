import React from 'react'
import PropTypes from 'prop-types'

import css from 'styled-jsx/css'

import { Settings } from '../icons/Settings.js'
import { Info } from '../icons/Info.js'
import { Help } from '../icons/Help.js'
import { Exit } from '../icons/Exit.js'
import { Account } from '../icons/Account.js'

import { isPointInRect } from '../utils/math.js'

import { Card, Divider, Menu, MenuItem, colors } from '@dhis2/ui-core'
import styles from './styles.js'

import { DataRequest } from '@dhis2/app-service-data'

function avatarPath(avatar) {
    if (!avatar) {
        return null
    }

    return `/api/fileResources/${avatar.id}/data`
}

function TextIcon({ name, onClick }) {
    let title = name[0]
    if (name.indexOf(' ') > 0) {
        title += name.split(' ')[1][0]
    }

    return (
        <div className="icon" onClick={onClick}>
            <div className="initials">{title}</div>
            <style jsx>{styles}</style>
        </div>
    )
}

TextIcon.defaultProps = {
    onClick: undefined,
}

TextIcon.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}

function ImageIcon({ src, onClick }) {
    return (
        <div className="icon" onClick={onClick}>
            <img src={src} alt="user avatar" />
            <style jsx>{styles}</style>
        </div>
    )
}

ImageIcon.defaultProps = {
    onClick: undefined,
}

ImageIcon.propTypes = {
    src: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}

function Header({ name, email, img }) {
    return (
        <div className="header">
            {img ? <ImageIcon src={img} /> : <TextIcon name={name} />}
            <div className="details">
                <div className="name">{name}</div>
                <div className="email">{email}</div>
                <a
                    className="edit_profile"
                    href={`/dhis-web-user-profile/#/profile`}
                >
                    Edit profile
                </a>
            </div>
            <style jsx>{styles}</style>
        </div>
    )
}

Header.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    img: PropTypes.string,
}

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

export default class Profile extends React.Component {
    state = {
        show: false,
    }

    componentDidMount() {
        document.addEventListener('click', this.onDocClick)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.onDocClick)
    }

    onDocClick = evt => {
        if (this.elContainer && this.elContents) {
            const target = { x: evt.clientX, y: evt.clientY }
            const contents = this.elContents.getBoundingClientRect()
            const container = this.elContainer.getBoundingClientRect()

            if (
                !isPointInRect(target, contents) &&
                !isPointInRect(target, container)
            ) {
                this.setState({ show: false })
            }
        }
    }

    onToggle = () => this.setState({ show: !this.state.show })

    viewIcon(me) {
        const avatar = avatarPath(me.avatar)

        if (avatar) {
            return (
                <ImageIcon src={avatar} onClick={this.onToggle}>
                    <style jsx>{styles}</style>
                </ImageIcon>
            )
        }

        return (
            <TextIcon name={me.name} onClick={this.onToggle}>
                <style jsx>{styles}</style>
            </TextIcon>
        )
    }

    viewContents(me) {
        if (!this.state.show) {
            return null
        }

        const avatar = avatarPath(me.avatar)

        return (
            <div className="contents" ref={c => (this.elContents = c)}>
                <Card>
                    <div className="profile-alignment">
                        <Header img={avatar} name={me.name} email={me.email} />
                        <Divider margin="13px 0 7px 0" />
                        <ul>
                            {list.map(
                                ({
                                    label,
                                    value,
                                    icon,
                                    link,
                                    target,
                                    nobase,
                                }) => {
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
                <style jsx>{styles}</style>
            </div>
        )
    }

    render() {
        return (
            <DataRequest resourcePath="me">
                {({ error, loading, data }) => {
                    console.log(loading, error, data)

                    if (loading) return <span>...</span>

                    if (error) return <span>{`ERROR: ${error.message}`}</span>

                    return (
                        <div
                            className="profile"
                            ref={c => (this.elContainer = c)}
                        >
                            {this.viewIcon(data)}
                            {this.viewContents(data)}
                            <style jsx>{styles}</style>
                        </div>
                    )
                }}
            </DataRequest>
        )
    }
}
