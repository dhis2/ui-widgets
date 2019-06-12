import React, { useEffect, useState } from 'react'
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
    'organisationUnits/A0000000001': () =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    path: '/A0000000000/A0000000001',
                    displayName: 'Org Unit 2',
                    children: [{ id: 'A0000000003' }, { id: 'A0000000004' }],
                })
            }, 1000)
        }),
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
    'organisationUnits/A0000000006': () =>
        new Promise(resolve =>
            setTimeout(() => {
                resolve({
                    displayName: 'Org Unit 7',
                    path: '/A0000000000/A0000000006',
                    children: [],
                })
            }, 400)
        ),
}

const onChange = (selected, setSelected, singleSelectionOnly) => ({ path }) => {
    const pathIndex = selected.indexOf(path)

    if (pathIndex === -1) {
        setSelected(singleSelectionOnly ? [path] : [...selected, path])
    } else {
        setSelected(
            singleSelectionOnly
                ? []
                : pathIndex === 0
                ? selected.slice(1)
                : [
                      ...selected.slice(0, pathIndex),
                      ...selected.slice(pathIndex + 1),
                  ]
        )
    }
}

const Test = props => {
    const [selected, setSelected] = useState([])
    console.log('selected', selected)

    return (
        <OrganisationUnitTree
            name="Root org unit"
            roots={['A0000000000']}
            selected={selected}
            onChange={onChange(
                selected,
                setSelected,
                props.singleSelectionOnly
            )}
            initiallyExpanded={['A0000000001/A0000000002']}
            onExpand={console.log.bind(null, 'onExpand')}
            onCollapse={console.log.bind(null, 'onCollapse')}
            onUnitLoaded={console.log.bind(null, 'onUnitLoaded')}
            onUnitUnloaded={console.log.bind(null, 'onUnitUnloaded')}
            {...props}
        />
    )
}

const ForceReloadAll = ({ delay }) => {
    const [forceReload, setForceReload] = useState(false)

    useEffect(() => {
        setTimeout(() => setForceReload(true), delay)
    }, [])

    return (
        <OrganisationUnitTree
            forceReload={forceReload}
            name="Root org unit"
            roots={['A0000000000']}
            onChange={console.log.bind(null, 'onChange')}
            initiallyExpanded={['/A0000000000', '/A0000000000/A0000000001']}
            selected={['/A0000000000/A0000000001/A0000000003']}
        />
    )
}

const ReplaceRoots = ({ delay }) => {
    const [roots, setRoots] = useState(['A0000000000'])

    useEffect(() => {
        setTimeout(() => setRoots(['A0000000001']), delay)
    }, [])

    return (
        <OrganisationUnitTree
            name="Root org unit"
            roots={roots}
            onChange={console.log.bind(null, 'onChange')}
            initiallyExpanded={['/A0000000001']}
        />
    )
}

storiesOf('OrganisationUnitTree', module)
    .addDecorator(fn => (
        <CustomDataProvider data={customData}>{fn()}</CustomDataProvider>
    ))
    .add('Collapsed', () => (
        <OrganisationUnitTree
            name="Root org unit"
            roots={['A0000000000']}
            onChange={console.log.bind(null, 'onChange')}
        />
    ))
    .add('Expanded', () => (
        <OrganisationUnitTree
            name="Root org unit"
            roots={['A0000000000']}
            onChange={console.log.bind(null, 'onChange')}
            initiallyExpanded={['/A0000000000', '/A0000000000/A0000000001']}
        />
    ))
    .add('Selected multiple', () => (
        <OrganisationUnitTree
            name="Root org unit"
            roots={['A0000000000']}
            onChange={console.log.bind(null, 'onChange')}
            selected={['/A0000000000', '/A0000000000/A0000000001']}
            initiallyExpanded={['/A0000000000']}
        />
    ))
    .add('Indeterminate', () => (
        <OrganisationUnitTree
            name="Root org unit"
            roots={['A0000000000']}
            onChange={console.log.bind(null, 'onChange')}
            selected={['/A0000000000/A0000000001']}
            initiallyExpanded={['/A0000000000']}
        />
    ))
    .add('Single selection', () => (
        <OrganisationUnitTree
            singleSelectionOnly
            name="Root org unit"
            roots={['A0000000000']}
            onChange={console.log.bind(null, 'onChange')}
            selected={['/A0000000000/A0000000001']}
            initiallyExpanded={['/A0000000000']}
        />
    ))
    .add('Force reload all', () => <ForceReloadAll delay={2000} />)
    .add('Replace roots', () => <ReplaceRoots delay={1000} />)
    .add('DX: Test', () => <Test />)
    .add('DX: Single selection only', () => <Test singleSelectionOnly />)
