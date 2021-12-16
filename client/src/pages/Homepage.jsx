import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Container = styled.div.attrs({
    className: 'container',
})``

const Title = styled.h1.attrs({
    className: 'h1',
})``

class Homepage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Wrapper>
                <Container>
                    <Title>PMS 8000</Title>
                </Container>
            </Wrapper>
        )
    }
}

export default Homepage