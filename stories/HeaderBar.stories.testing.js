import React from 'react'
import { storiesOf } from '@storybook/react'
import { HeaderBar } from '../src'
import { DataProvider } from '@dhis2/app-runtime'

storiesOf('HeaderBarTesting', module).add('Default', () => (
    <DataProvider baseUrl="https://play.dhis2.org/dev" apiVersion="">
        <HeaderBar appName="Example!" />
    </DataProvider>
))
