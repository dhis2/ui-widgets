import React from 'react'
import { storiesOf } from '@storybook/react'
import { HeaderBarContainer } from '../src/HeaderBar'
import { DataProvider } from '@dhis2/app-service-data'

const props = {
    baseURL: 'https://play.dhis2.org/dev',
    instanceName: 'Sierra Leone',
    appName: 'Import / Export',
    profile: {
        name: 'John Doe',
        email: 'john_doe@dhis2.org',
    },
    apps: [
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
}

function getProps() {
    return {
        ...props,
        messages: {
            count: Math.floor(Math.random() * 40),
        },
        interpretations: {
            count: Math.floor(Math.random() * 20),
        },
    }
}

storiesOf('HeaderBar', module).add('Default', () => (
    <DataProvider baseUrl="https://dhis2.vardevs.se/dev" apiVersion={32}>
        <HeaderBarContainer appName="Example!" />
    </DataProvider>
))
