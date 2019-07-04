import React from 'react'
import { storiesOf } from '@storybook/react'
import { HeaderBar } from '../src'
import { CustomDataProvider } from '@dhis2/app-runtime'

const customData = {
    'system/info': {
        systemName: 'Foobar',
    },
    me: {
        name: 'John Doe',
        email: 'john_doe@dhis2.org',
        settings: {
            keyUiLocale: 'en',
        },
    },
    '../dhis-web-commons/menu/getModules.action': {
        modules: [
            {
                displayName: 'Dashboard',
                path: '',
                img: '',
            },
            {
                displayName: 'Data Visualizer',
                path: '',
                img: '',
            },
            {
                displayName: 'Capture',
                path: '',
                img: '',
            },
            {
                displayName: 'Maintenance',
                path: '',
                img: '',
            },
            {
                displayName: 'Maps',
                path: '',
                img: '',
            },
            {
                displayName: 'Event Reports',
                path: '',
                img: '',
            },
            {
                displayName: 'Interpretations',
                path: '',
                img: '',
            },
            {
                displayName: 'Messaging',
                path: '',
                img: '',
            },
            {
                displayName: 'Import/Export',
                path: '',
                img: '',
            },
            {
                displayName: 'User Settings',
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

storiesOf('HeaderBar', module)
    .add('Default', () => (
        <CustomDataProvider data={customData}>
            <HeaderBar appName="Example!" />
        </CustomDataProvider>
    ))
    .add('Loading...', () => (
        <CustomDataProvider options={{ loadForever: true }}>
            <HeaderBar appName="Example!" />
        </CustomDataProvider>
    ))
    .add('Error!', () => (
        <CustomDataProvider data={{}}>
            <HeaderBar appName="Example!" />
        </CustomDataProvider>
    ))
