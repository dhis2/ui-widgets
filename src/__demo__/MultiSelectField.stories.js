import React from 'react'
import { storiesOf } from '@storybook/react'
import { MultiSelectOption } from '@dhis2/ui-core'

import { MultiSelectField } from '../index.js'

const selected = [
    { value: '1', label: 'one' },
    { value: '2', label: 'two' },
]

storiesOf('MultiSelectField', module).add('Default', () => (
    <MultiSelectField
        label="Open the select to see the default filterPlaceholder text and loadingText"
        helpText="Type 'xx' into the filter input to see the default noMatchText"
        selected={selected}
        filterable
        clearable
        loading
    >
        <MultiSelectOption key="1" value="1" label="one" />
        <MultiSelectOption key="2" value="2" label="two" />
        <MultiSelectOption key="3" value="3" label="three" />
        <MultiSelectOption key="4" value="4" label="four" />
        <MultiSelectOption key="5" value="5" label="five" />
    </MultiSelectField>
))
