import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Container = styled.div.attrs({
    className: 'container',
})``

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const InputCheckbox = styled.input.attrs({
    type: 'checkbox',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class CapcodesInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            capcode: '',
            TTDexport: true,
            type: '',
            tone1: '',
            tone2: '',
            securityCode: '',
            tone2Disabled: false,
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputCapcode = async event => {
        const capcode = event.target.value
        this.setState({ capcode })
    }

    handleChangeInputTTDexport = async event => {
        this.setState({ TTDexport: !this.state.TTDexport })
    }

    handleChangeInputType = async event => {
        const type = event.target.value
        var tone2Disabled = false
        if(type === "1") {
            tone2Disabled = true
        }
        this.setState({ 
            type: type,
            tone2Disabled: tone2Disabled,
        })
    }

    handleChangeInputTone1 = async event => {
        const tone1 = event.target.value
        this.setState({ tone1 })
    }

    handleChangeInputTone2 = async event => {
        const tone2 = event.target.value
        this.setState({ tone2 })
    }

    handleChangeInputSecurityCode = async event => {
        const securityCode = event.target.value
        this.setState({ securityCode })
    }

    handleIncludeCapcode = async () => {
        const { name, capcode, type, TTDexport, tone1, tone2, securityCode } = this.state
        const payload = { name, capcode, TTDexport, type, tone1, tone2, securityCode }

        await api.insertCapcode(payload).then(res => {
            window.alert(`Capcode inserted successfully`)
            this.setState({
                name: '',
                capcode: '',
                TTDexport: '',
                type: '',
                tone1: '',
                tone2: '',
                securityCode: '',
            })
        })
        .catch(err => {
            window.alert(`Error creating Capcode`)
        })
    }

    render() {
        const { name, capcode, TTDexport, type, tone1, tone2, securityCode, tone2Disabled } = this.state
        return (
            <Wrapper>
                <Container>
                    <Title>Create Capcode</Title>

                    <Label>Name: </Label>
                    <InputText
                        type="text"
                        value={name}
                        onChange={this.handleChangeInputName}
                    />

                    <Label>Capcode: </Label>
                    <InputText
                        type="number"
                        step="1"
                        lang="en-US"
                        min="1"
                        max="1000"
                        pattern="[0-9]+([,\.][0-9]+)?"
                        value={capcode}
                        onChange={this.handleChangeInputCapcode}
                    />

                    <Label>Tone Type: </Label>
                    <div>
                        <Label>
                            <input type="radio" value="1" name="type" checked={this.state.type === "1" || type === 1} onChange={this.handleChangeInputType} /> L-Tone
                        </Label>
                    </div>
                    <div>
                        <Label>
                            <input type="radio" value="2" name="type" checked={this.state.type === "2" || type === 2} onChange={this.handleChangeInputType} /> 2-Tone
                        </Label>
                    </div>

                    <Label>Tone 1: </Label>
                    <InputText
                        type="number"
                        step="0.1"
                        lang="en-US"
                        min="1"
                        max="2000"
                        pattern="[0-9]+([,\.][0-9]+)?"
                        value={tone1}
                        onChange={this.handleChangeInputTone1}
                    />

                    <Label>Tone 2: </Label>
                    <InputText
                        type="number"
                        step="0.1"
                        lang="en-US"
                        min="1"
                        max="2000"
                        pattern="[0-9]+([,\.][0-9]+)?"
                        value={tone2}
                        onChange={this.handleChangeInputTone2}
                        disabled={tone2Disabled}
                    />

                    <Label>Security Code: </Label>
                    <InputText
                        type="number"
                        step="1"
                        lang="en-US"
                        min="1"
                        max="1000"
                        pattern="[0-9]+([,\.][0-9]+)?"
                        value={securityCode}
                        onChange={this.handleChangeInputSecurityCode}
                    />

                    <div>
                        <Label>Export to TwoToneDetect:</Label>
                        <InputCheckbox
                            checked={TTDexport}
                            onChange={this.handleChangeInputTTDexport}
                        />
                    </div>

                    <Button onClick={this.handleIncludeCapcode}>Add Capcode</Button>
                    <CancelButton href={'/capcodes/list'}>Cancel</CancelButton>
                </Container>
            </Wrapper>
        )
    }
}

export default CapcodesInsert