import css from 'styled-jsx/css'

import { colors, theme } from '@dhis2/ui-core'

export default css`
    header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 48px;
        border-bottom: 1px solid rgba(32, 32, 32, 0.15);
        color: ${colors.white};
    }

    header > div:first-child {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        overflow: hidden;
    }

    header > div:last-child {
        display: flex;
        flex-direction: row;
        margin-left: auto;
        user-select: none;
    }

    .headerbar-logo {
        box-sizing: border-box;
        width: 48px;
        height: 48px;
        margin: 0 12px 0 0;
        padding-top: 12px;
        border-right: 1px solid rgba(32, 32, 32, 0.15);
        text-align: center;
    }

    a,
    a:hover,
    a:focus,
    a:active,
    a:visited {
        text-decoration: none;
    }

    .headerbar-logo a {
        width: 48px;
        height: 48px;
        cursor: pointer;
    }

    .headerbar-logo a,
    .headerbar-logo a:hover,
    .headerbar-logo a:focus,
    .headerbar-logo a:active,
    .headerbar-logo a:visited {
        display: inline-block;
        background-color: transparent;
        cursor: pointer;
        user-select: none;
    }

    .headerbar-title {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.01em;
        white-space: nowrap;
    }

    .notification {
        position: relative;
        margin: 8px 24px 0 0;
        cursor: pointer;
    }

    .notification .message {
        margin-top: 10px;
        cursor: inherit;
    }

    .notification .email {
        margin-right: 0;
        cursor: inherit;
    }

    .notification > .count {
        z-index: 1;
        position: absolute;
        top: -6px;
        right: -10px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: ${theme.secondary300};
        color: #fff;
        font-size: 9px;
        font-weight: 500;
        line-height: 16px;
        text-align: center;
        cursor: inherit;
    }

    .notification > .count i {
        width: 20px;
        height: 20px;
        cursor: inherit;
    }

    .search {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        height: 52px;
        margin: 8px;
    }

    .modules {
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

    .blue {
        background-color: #2c6693;
    }
    .blue > .first > .title {
        color: #fff;
    }

    .blue > .last > .notification > i,
    .blue > .last > .apps > i:first-child {
        color: #fff;
        cursor: pointer;
    }
    .base.blue .profile > .icon > .initials {
        color: #fff;
        cursor: pointer;
    }
`
