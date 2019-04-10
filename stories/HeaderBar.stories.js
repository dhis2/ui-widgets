import React from 'react'
import { storiesOf } from '@storybook/react'
import { HeaderBar } from '../src/HeaderBar'
import { DataProvider } from '@dhis2/app-runtime'

storiesOf('HeaderBar', module).add('Default', () => (
    <DataProvider baseUrl="https://dhis2.vardevs.se/dev" apiVersion={32}>
        <HeaderBar appName="Example!" />
    </DataProvider>
))
