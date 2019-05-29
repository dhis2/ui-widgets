import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { OrganisationUnitTree } from '../src/OrganisationUnitTree'
import { CustomDataProvider } from '@dhis2/app-runtime'

const customData = {
    'organisationUnits/A0000000000': {
        displayName: 'Org Unit 1',
        children: [
            { id: 'A0000000001' },
            { id: 'A0000000002' },
            { id: 'A0000000006' },
        ],
    },
    'organisationUnits/A0000000001': {
        path: '/A0000000000/A0000000001',
        displayName: 'Org Unit 2',
        children: [
            { id: 'A0000000003' },
            { id: 'A0000000004' },
        ],
    },
    'organisationUnits/A0000000002': {
        displayName: 'Org Unit 3',
        path: '/A0000000000/A0000000002',
        children: [],
    },
    'organisationUnits/A0000000003': {
        displayName: 'Org Unit 4',
        path: '/A0000000000/A0000000001/A0000000003',
        children: [],
    },
    'organisationUnits/A0000000004': {
        displayName: 'Org Unit 5',
        path: '/A0000000000/A0000000001/A0000000004',
        children: [],
    },
    'organisationUnits/A0000000006': () => new Promise(() => {}),
}

const onChange = (selected, setSelected) => ({ path }) => {
    const pathIndex = selected.indexOf(path)

    if (pathIndex === -1) {
        setSelected([ ...selected, path ])
    } else {
        setSelected(
            pathIndex === 0
                ? selected.slice(1)
                : [
                    ...selected.slice(0, pathIndex),
                    ...selected.slice(pathIndex + 1),
                ]
        )
    }
}

const Test = () => {
    const [selected, setSelected] = useState([])

    return (
        <CustomDataProvider data={customData}>
            <OrganisationUnitTree
                name="Root org unit"
                roots={[ '/A0000000000' ]}
                selected={selected}
                onChange={onChange(selected, setSelected)}
                initiallyExpanded={['A0000000001/A0000000002']}
            />
        </CustomDataProvider>
    )
}

storiesOf('OrganisationUnitTree', module).add('DX: Test', () => <Test />)
