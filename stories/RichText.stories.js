import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'

import { RichText } from '../src'

/** This component just contains a native input field, but includes a
 * React ref so that it is possible to call setSelectionRange. This
 * should also be possible using Material-ui 3.0 or greater, since the
 * api for TextField provides a handle to the native input.
 */
class InputField extends Component {
    constructor(props) {
        super(props)
        this.input = React.createRef()
    }
    componentDidUpdate() {
        if (this.props.caretPos) {
            const node = this.input.current
            node.setSelectionRange(this.props.caretPos, this.props.caretPos)
        }
    }

    render() {
        return (
            <input
                ref={this.input}
                type="text"
                value={this.props.value}
                onChange={this.props.onChange}
            />
        )
    }
}

export default class ExampleRichText extends Component {
    constructor(props) {
        super(props)
        this.nativeInputRef = React.createRef()
        this.nativeOutputRef = React.createRef()
        console.log(
            RichText.MdParser,
            RichText.convertCtrlKey,
            RichText.Parser,
            RichText.Editor
        )
        this.NativeMdParser = new RichText.MdParser()
    }
    state = {
        newText: '',
        caretPos: null,
        paraVal: '',
    }

    setParagraphVal = () => {
        this.setState({ paraVal: this.state.newText })
    }

    updateNewText = (newText, caretPos) => {
        this.setState({ newText, caretPos })
    }

    onInputChange = e => {
        this.updateNewText(e.target.value)
    }

    setNativeInputVal = (val, caretPos) => {
        const node = this.nativeInputRef.current
        node.value = val
        node.setSelectionRange(caretPos, caretPos)
    }

    nativeKeyDown = e => {
        convertCtrlKey(e, this.setNativeInputVal)
    }

    setNativeParsedVal = () => {
        const inputNode = this.nativeInputRef.current
        const renderedVal = this.NativeMdParser.render(inputNode.value)
        this.nativeOutputRef.current.innerHTML = renderedVal
    }

    render() {
        return (
            <div>
                <div>
                    <p>Using RichText react component wrapper:</p>

                    <RichText.Editor onEdit={this.updateNewText}>
                        <InputField
                            value={this.state.newText}
                            caretPos={this.state.caretPos}
                            onChange={this.onInputChange}
                        />
                    </RichText.Editor>

                    <button type="button" onClick={this.setParagraphVal}>
                        Parse
                    </button>

                    <span>Result:</span>
                    <RichText.Parser>{this.state.paraVal}</RichText.Parser>
                </div>

                <div>
                    <p>Using RichText function and class</p>

                    <input
                        ref={this.nativeInputRef}
                        type="text"
                        onKeyDown={this.nativeKeyDown}
                    />
                    <button type="button" onClick={this.setNativeParsedVal}>
                        Parse native
                    </button>

                    <span>Result:</span>
                    <p ref={this.nativeOutputRef} />
                </div>
            </div>
        )
    }
}

storiesOf('RichText', module).add('Default', () => <ExampleRichText />)
