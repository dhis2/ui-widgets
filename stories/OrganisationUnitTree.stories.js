import React from 'react'
import { storiesOf } from '@storybook/react'
import { OrgUnitTree } from '../src/OrganisationUnitTree/Tree'
import { CustomDataProvider } from '@dhis2/app-runtime'

const customData = {
    'organisationUnits/0000000000': {
        children: [
            { id: '0000000001', displayName: 'Org Unit 1' },
            { id: '0000000002', displayName: 'Org Unit 2' },
        ],
    },
    'organisationUnits/0000000001': {
        children: [],
    },
    'organisationUnits/0000000002': {
        children: [],
    },
}

storiesOf('OrganisationUnitTree', module).add('DX: Test', () => (
    <CustomDataProvider data={customData}>
        <OrgUnitTree
            name="Root org unit"
            path="/0000000000"
            onChange={(...args) => console.log('onChange', ...args)}
        />
    </CustomDataProvider>
))
