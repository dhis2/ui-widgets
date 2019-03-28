import React from 'react'
import PropTypes from 'prop-types'

import { Card, InputField, colors, theme } from '@dhis2/ui-core'

import { gotoURL } from '../utils/url.js'

import { Settings } from '../icons/Settings.js'
import { Apps as AppsIcon } from '../icons/Apps.js'
import { Cancel } from '../icons/Cancel.js'

import cx from 'classnames'

import css from 'styled-jsx/css'

import { DataRequest } from '@dhis2/app-service-data'

const appIcon = css.resolve`
    svg {
		fill: ${colors.white};
        cursor: pointer;
		height: 24px;
		width: 24px;
    }
`

const trailIcon = css.resolve`
    svg {
		fill: ${colors.grey900};
        cursor: pointer;
		height: 24px;
		width: 24px;
		margin-right: 8px;
		margin-top: 4px;
    }
`

const settingsIcon = css.resolve`
    svg {
        margin: 8px 8px 0 16px;
        color: ${colors.grey900};
		height: 24px;
		width: 24px;
        cursor: pointer;
    }
`

function TrailIcon({ onClick }) {
    return (
        <a onClick={onClick}>
            <Cancel className={trailIcon.className} />
        </a>
    )
}

function Search({ value, onChange, onSettingsClick, onIconClick }) {
    return (
        <div>
            <InputField
                value={value}
                name="filter"
                kind="filled"
                size="dense"
                focus={true}
                label="Search apps"
                onChange={onChange}
                trailIcon={<TrailIcon onClick={onIconClick} />}
            />

            <a onClick={onSettingsClick}>
                <Settings className={settingsIcon.className} />
            </a>

            {trailIcon.styles}
            {settingsIcon.styles}
            <style jsx>{`
                div {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    height: 52px;
                    margin: 8px;
                }
            `}</style>
        </div>
    )
}

Search.defaultProps = {
    onIconClick: null,
}

Search.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSettingsClick: PropTypes.func.isRequired,
    onIconClick: PropTypes.func,
}

function Item({ name, path, img }) {
    return (
        <a href={path} className={cx('app')}>
            <img src={img} alt="app logo" />
            <div className={cx('name')}>{name}</div>
            <style jsx>{`
                .app {
                    display: inline-block;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 96px;
                    margin: 8px;
                    padding: 8px;
                    border-radius: 12px;
                    text-decoration: none;
                    cursor: pointer;
                }

                .app:hover,
                .app:focus {
                    background-color: ${theme.primary050};
                    cursor: pointer;
                }

                .app:hover > .name {
                    font-weight: 500;
                    cursor: pointer;
                }

                .app > img {
                    width: 48px;
                    height: 48px;
                    cursor: pointer;
                }

                .app > .name {
                    margin-top: 14px;
                    color: rgba(0, 0, 0, 0.87);
                    font-size: 12px;
                    letter-spacing: 0.01em;
                    line-height: 14px;
                    text-align: center;
                    cursor: pointer;
                }
            `}</style>
        </a>
    )
}

Item.propTypes = {
    name: PropTypes.string,
    path: PropTypes.string,
    img: PropTypes.string,
}

function List({ apps, filter }) {
    return (
        <div>
            {apps
                .filter(({ displayName }) => {
                    return filter.length > 0
                        ? displayName.toLowerCase().match(filter.toLowerCase())
                        : true
                })
                .map(({ displayName, name, namespace, icon }, idx) => (
                    <Item
                        key={`app-${name}-${idx}`}
                        name={displayName || name}
                        path={namespace}
                        img={icon}
                    />
                ))}

            <style jsx>{`
                div {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    align-content: flex-start;
                    align-items: flex-start;
                    justify-content: flex-start;
                    width: 30vw;
                    min-width: 300px;
                    max-width: 560px;

                    min-height: 200px;
                    max-height: 465px;
                    margin: 0 8px 8px 8px;

                    overflow: auto;
                    overflow-x: hidden;
                }
            `}</style>
        </div>
    )
}

export default class Apps extends React.Component {
    state = {
        show: false,
        filter: '',
    }

    componentDidMount() {
        document.addEventListener('click', this.onDocClick)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.onDocClick)
    }

    onDocClick = evt => {
        if (this.elContainer && !this.elContainer.contains(evt.target)) {
            this.setState({ show: false })
        }
    }

    onToggle = () => this.setState({ show: !this.state.show })

    onChange = (_, filter) => this.setState({ filter })

    onSettingsClick = () => gotoURL(`/dhis-web-menu-management`)

    onIconClick = () => this.setState({ filter: '' })

    AppMenu = data => (
        <div>
            <Card>
                <Search
                    value={this.state.filter}
                    onChange={this.onChange}
                    onSettingsClick={this.onSettingsClick}
                    onIconClick={this.onIconClick}
                />
                <List apps={data.modules} filter={this.state.filter} />
            </Card>

            <style jsx>{`
                div {
                    z-index: 10000;
                    position: absolute;
                    top: 28px;
                    right: -6px;
                    border-top: 4px solid transparent;
                }
            `}</style>
        </div>
    )

    render() {
        return (
            <DataRequest resourcePath="../../dhis-web-commons/menu/getModules.action">
                {({ error, loading, data }) => {
                    console.log(loading, error, data)

                    if (loading) return <span>...</span>

                    if (error) return <span>{`ERROR: ${error.message}`}</span>

                    return (
                        <div ref={c => (this.elContainer = c)}>
                            <a onClick={this.onToggle}>
                                <AppsIcon className={appIcon.className} />
                            </a>

                            {this.state.show && this.AppMenu(data)}

                            {appIcon.styles}
                            <style jsx>{`
                                a {
                                    display: block;
                                }

                                div {
                                    position: relative;
                                    width: 24px;
                                    height: 30px;
                                    margin: 8px 0 0 0;
                                }
                            `}</style>
                        </div>
                    )
                }}
            </DataRequest>
        )
    }
}
