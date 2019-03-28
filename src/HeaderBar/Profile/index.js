import React from 'react'
import PropTypes from 'prop-types'

import css from 'styled-jsx/css'

import { Card, Divider, Menu, MenuItem, colors } from '@dhis2/ui-core'

import { DataRequest } from '@dhis2/app-service-data'

import { ProfileMenu } from './ProfileMenu.js'

import { TextIcon } from '../TextIcon.js'
import { ImageIcon } from '../ImageIcon.js'

function avatarPath(avatar) {
    if (!avatar) {
        return null
    }

    return `/api/fileResources/${avatar.id}/data`
}

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
        if (this.elContainer && !this.elContainer.contains(evt.target)) {
            this.setState({ show: false })
        }
    }

    onToggle = () => this.setState({ show: !this.state.show })

    viewIcon(me) {
        const avatar = avatarPath(me.avatar)

        if (avatar) {
            return <ImageIcon src={avatar} onClick={this.onToggle} />
        }

        return <TextIcon name={me.name} onClick={this.onToggle} />
    }

    render() {
        return (
            <DataRequest resourcePath="me">
                {({ error, loading, data }) => {
                    console.log(loading, error, data)

                    if (loading) return <span>...</span>

                    if (error) return <span>{`ERROR: ${error.message}`}</span>

                    return (
                        <div ref={c => (this.elContainer = c)}>
                            {this.viewIcon(data)}

                            {this.state.show ? (
                                <ProfileMenu
                                    avatar={avatarPath(data.avatar)}
                                    name={data.name}
                                    email={data.email}
                                />
                            ) : null}

                            <style jsx>{`
                                div {
                                    position: relative;
                                    width: 36px;
                                    height: 36px;
                                    margin: 2px 12px 0 24px;
                                }
                            `}</style>
                        </div>
                    )
                }}
            </DataRequest>
        )
    }
}
