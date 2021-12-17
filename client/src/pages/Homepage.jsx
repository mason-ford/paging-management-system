import React, { Component } from 'react'
import api from '../api'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

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
        this.state = {
            isLoading: false,
            pagesCount: []
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getPagesCount().then(count => {
            console.log(count.data.data)
            this.setState({
                pagesCount: count.data.data,
                isLoading: false,
            })
        })
    }


    render() {
        return (
            <Wrapper>
                <Container>
                    <Typography variant="h4">Page Count</Typography>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Card>
                                <CardContent>
                                    <Typography variant="h2">{ ( this.state.pagesCount["1hour"] ? this.state.pagesCount["1hour"] : 0 ) }</Typography>
                                    <Typography>1 Hour</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card>
                                <CardContent>
                                    <Typography variant="h2">{ ( this.state.pagesCount["24hour"] ? this.state.pagesCount["24hour"] : 0 ) }</Typography>
                                    <Typography>24 Hours</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card>
                                <CardContent>
                                    <Typography variant="h2">{ ( this.state.pagesCount["7day"] ? this.state.pagesCount["7day"] : 0 ) }</Typography>
                                    <Typography>7 Days</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card>
                                <CardContent>
                                    <Typography variant="h2">{ ( this.state.pagesCount["30day"] ? this.state.pagesCount["30day"] : 0 ) }</Typography>
                                    <Typography>30 Days</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card>
                                <CardContent>
                                    <Typography variant="h2">{ ( this.state.pagesCount["180day"] ? this.state.pagesCount["180day"] : 0 ) }</Typography>
                                    <Typography>180 Days</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card>
                                <CardContent>
                                    <Typography variant="h2">{ ( this.state.pagesCount["1year"] ? this.state.pagesCount["1year"] : 0 ) }</Typography>
                                    <Typography>1 Year</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card>
                                <CardContent>
                                    <Typography variant="h2">{ ( this.state.pagesCount.total ? this.state.pagesCount.total : 0) }</Typography>
                                    <Typography>Total</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Wrapper>
        )
    }
}

export default Homepage