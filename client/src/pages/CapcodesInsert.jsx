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
        this.setState({ type })
    }

    handleChangeInputTone1 = async event => {
        const tone1 = event.target.value
        this.setState({ tone1 })
    }

    handleChangeInputTone2 = async event => {
        const tone2 = event.target.value
        this.setState({ tone2 })
    }

    handleIncludeCapcode = async () => {
        const { name, capcode, type, TTDexport, tone1, tone2 } = this.state
        const payload = { name, capcode, TTDexport, type, tone1, tone2 }

        await api.insertCapcode(payload).then(res => {
            window.alert(`Capcode inserted successfully`)
            this.setState({
                name: '',
                capcode: '',
                TTDexport: '',
                type: '',
                tone1: '',
                tone2: '',
            })
        })
        .catch(err => {
            window.alert(`Error creating Capcode`)
        })
    }

    render() {
        const { name, capcode, TTDexport, type, tone1, tone2 } = this.state
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

                    <Label>Type: </Label>
                    <InputText
                        type="number"
                        step="1"
                        lang="en-US"
                        min="1"
                        max="2"
                        pattern="[0-9]+([,\.][0-9]+)?"
                        value={type}
                        onChange={this.handleChangeInputType}
                    />

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