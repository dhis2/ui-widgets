import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { OrgUnitTree } from '../src/OrganisationUnitTree/Tree'
import { CustomDataProvider } from '@dhis2/app-runtime'

const customData = {
    'organisationUnits/A0000000000': {
        children: [
            { id: 'A0000000001', displayName: 'Org Unit 1' },
            { id: 'A0000000002', displayName: 'Org Unit 2' },
        ],
    },
    'organisationUnits/A0000000001': {
        children: [
            { id: 'A0000000003', displayName: 'Org Unit 3' },
            { id: 'A0000000004', displayName: 'Org Unit 4' },
        ],
    },
    'organisationUnits/A0000000002': {
        children: [],
    },
}

const Test = () => {
    const [selected, setSelected] = useState([])

    return (
        <CustomDataProvider data={customData}>
            <OrgUnitTree
                name="Root org unit"
                path="/A0000000000"
                selected={selected}
                onChange={({ path }) => {
                    console.log(path)
                    setSelected([...selected, path])
                }}
                initiallyExpanded={['A0000000001/A0000000002']}
            />
        </CustomDataProvider>
    )
}

storiesOf('OrganisationUnitTree', module).add('DX: Test', () => <Test />)
