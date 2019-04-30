import React from 'react'
import PropTypes from 'prop-types'

import css from 'styled-jsx/css'

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

    userIcon(me) {
        const avatar = avatarPath(me.avatar)

        if (avatar) {
            return <ImageIcon src={avatar} onClick={this.onToggle} />
        }

        return <TextIcon name={me.name} onClick={this.onToggle} />
    }

    render() {
        const user = this.props.user

        return (
            <div ref={c => (this.elContainer = c)}>
                {this.userIcon(user)}

                {this.state.show ? (
                    <ProfileMenu
                        avatar={avatarPath(user.avatar)}
                        name={user.name}
                        email={user.email}
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
    }
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
}
