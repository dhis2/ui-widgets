import React from 'react'
import { storiesOf } from '@storybook/react'
import { SingleSelectOption } from '@dhis2/ui-core'

import { SingleSelectField } from '../index.js'

const selected = [
    { value: '1', label: 'one' },
    { value: '2', label: 'two' },
]

storiesOf('SingleSelectField', module).add('Default', () => (
    <SingleSelectField
        label="Open the select to see the default filterPlaceholder text and loadingText"
        helpText="Type 'xx' into the filter input to see the default noMatchText"
        selected={selected}
        filterable
        clearable
        loading
    >
        <SingleSelectOption key="1" value="1" label="one" />
        <SingleSelectOption key="2" value="2" label="two" />
        <SingleSelectOption key="3" value="3" label="three" />
        <SingleSelectOption key="4" value="4" label="four" />
        <SingleSelectOption key="5" value="5" label="five" />
    </SingleSelectField>
))
