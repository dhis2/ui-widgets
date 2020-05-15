import React from 'react'
import { storiesOf } from '@storybook/react'
import { HeaderBar } from '../index.js'
import { Provider } from '@dhis2/app-runtime'

storiesOf('HeaderBarTesting', module).add('Default', () => (
    <Provider
        config={{
            baseUrl: 'https://domain.tld/',
            apiVersion: '',
        }}
    >
        <HeaderBar appName="Example!" />
    </Provider>
))
