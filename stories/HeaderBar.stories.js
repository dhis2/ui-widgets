import React from 'react'
import { storiesOf } from '@storybook/react'
import { HeaderBar } from '../src/HeaderBar'
import { CustomDataProvider } from '@dhis2/app-runtime'

const customData = {
    'system/info': {
        systemName: 'Foobar',
    },
    me: {
        name: 'John Doe',
        email: 'john_doe@dhis2.org',
    },
    '../../dhis-web-commons/menu/getModules.action': {
        modules: [
            {
                name: 'Dashboard',
                path: '',
                img: '',
            },
            {
                name: 'Data Visualizer',
                path: '',
                img: '',
            },
            {
                name: 'Capture',
                path: '',
                img: '',
            },
            {
                name: 'Maintenance',
                path: '',
                img: '',
            },
            {
                name: 'Maps',
                path: '',
                img: '',
            },
            {
                name: 'Event Reports',
                path: '',
                img: '',
            },
            {
                name: 'Interpretations',
                path: '',
                img: '',
            },
            {
                name: 'Messaging',
                path: '',
                img: '',
            },
            {
                name: 'Import/Export',
                path: '',
                img: '',
            },
            {
                name: 'User Settings',
                path: '',
                img: '',
            },
        ],
    },
    'me/dashboard': {
        unreadInterpretations: 10,
        unreadMessageConversations: 5,
    },
}

storiesOf('HeaderBar', module).add('Default', () => (
    <CustomDataProvider data={customData}>
        <HeaderBar appName="Example!" />
    </CustomDataProvider>
))
