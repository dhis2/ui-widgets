import React from 'react'
import PropTypes from 'prop-types'

import css from 'styled-jsx/css'

import { TextIcon } from '../TextIcon.js'
import { ImageIcon } from '../ImageIcon.js'

export const Header = ({ name, email, img }) => (
    <div className="ui-profile-header">
        {img ? <ImageIcon src={img} /> : <TextIcon name={name} />}

        <div className="ui-profile-details">
            <div className="ui-profile-name">{name}</div>
            <div className="ui-profile-email">{email}</div>
            <a
                className="ui-profile-edit-profile"
                href={`/dhis-web-user-profile/#/profile`}
            >
                Edit profile
            </a>
        </div>

        <style jsx>{`
            .ui-profile-header {
                display: flex;
                flex-direction: row;
                margin-left: 24px;
                padding-top: 20px;
            }

            .ui-profile-details {
                display: flex;
                flex-direction: column;
                margin-left: 20px;
                color: #000;
                font-size: 14px;
                font-weight: 400;
            }

            .ui-profile-name {
                margin-bottom: 3px;
                font-size: 16px;
                line-height: 19px;
            }

            .ui-profile-email {
                margin-bottom: 6px;
                font-size: 14px;
                line-height: 16px;
            }

            .ui-profile-edit-profile {
                color: rgba(0, 0, 0, 0.87);
                font-size: 12px;
                line-height: 14px;
                text-decoration: underline;
                cursor: pointer;
            }
        `}</style>
    </div>
)

Header.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    img: PropTypes.string,
}
