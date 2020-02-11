import React from 'react'
import { storiesOf } from '@storybook/react'

import { FileInputFieldWithList } from '../index.js'

const files = [new File([], 'test1.txt')]

storiesOf('FileInputFieldWithList', module)
    .add('Single', () => <FileInputFieldWithList files={files} />)
    .add('Multiple', () => <FileInputFieldWithList multiple files={files} />)
