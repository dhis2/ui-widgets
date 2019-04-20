import React from 'react'
import PropTypes from 'prop-types'

import css from 'styled-jsx/css'

import { TextIcon } from '../TextIcon.js'
import { ImageIcon } from '../ImageIcon.js'

const ProfileName = ({ children }) => (
    <div>
        {children}

        <style jsx>{`
            div {
                margin-bottom: 3px;
                font-size: 16px;
                line-height: 19px;
            }
        `}</style>
    </div>
)

const ProfileEmail = ({ children }) => (
    <div>
        {children}

        <style jsx>{`
            div {
                margin-bottom: 6px;
                font-size: 14px;
                line-height: 16px;
            }
        `}</style>
    </div>
)

const ProfileEdit = ({ children }) => (
    <a href={`/dhis-web-user-profile/#/profile`}>
        {children}

        <style jsx>{`
            a {
                color: rgba(0, 0, 0, 0.87);
                font-size: 12px;
                line-height: 14px;
                text-decoration: underline;
                cursor: pointer;
            }
        `}</style>
    </a>
)

const ProfileDetails = ({ name, email }) => (
    <div>
        <ProfileName>{name}</ProfileName>
        <ProfileEmail>{email}</ProfileEmail>
        <ProfileEdit>Edit profile</ProfileEdit>

        <style jsx>{`
            div {
                display: flex;
                flex-direction: column;
                margin-left: 20px;
                color: #000;
                font-size: 14px;
                font-weight: 400;
            }
        `}</style>
    </div>
)

export const ProfileHeader = ({ name, email, img }) => (
    <div>
        {img ? <ImageIcon src={img} /> : <TextIcon name={name} />}

        <ProfileDetails name={name} email={email} />

        <style jsx>{`
            div {
                display: flex;
                flex-direction: row;
                margin-left: 24px;
                padding-top: 20px;
            }
        `}</style>
    </div>
)

ProfileHeader.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    img: PropTypes.string,
}
