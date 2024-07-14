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
            pagesCount: [],
            error: null
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        try {
            const count = await api.getPagesCount();
            console.log(count.data.data)
            this.setState({
                pagesCount: count.data.data,
                isLoading: false,
            });
        } catch (error) {
            console.error("Error fetching pages count:", error);
            this.setState({
                isLoading: false,
                error: error.message, 
            });
        }
    }


    render() {
        const { pagesCount, isLoading, error } = this.state;

        return (
            <Wrapper>
                <Container>
                    <Typography variant="h5">Page Count</Typography>
                    {!isLoading && (
                        <Grid container spacing={2}>
                            <Grid item>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h2">{pagesCount["1hour"] ? pagesCount["1hour"] : 0}</Typography>
                                        <Typography>1 Hour</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h2">{pagesCount["24hour"] ? pagesCount["24hour"] : 0}</Typography>
                                        <Typography>24 Hours</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h2">{pagesCount["7day"] ? pagesCount["7day"] : 0}</Typography>
                                        <Typography>7 Days</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h2">{pagesCount["30day"] ? pagesCount["30day"] : 0}</Typography>
                                        <Typography>30 Days</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h2">{pagesCount["180day"] ? pagesCount["180day"] : 0}</Typography>
                                        <Typography>180 Days</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h2">{pagesCount["1year"] ? pagesCount["1year"] : 0}</Typography>
                                        <Typography>1 Year</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h2">{pagesCount.total ? pagesCount.total : 0}</Typography>
                                        <Typography>All Time</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    )}
                    {isLoading && <Typography>Loading...</Typography>}
                    {error && <Typography style={{ color: 'red' }}>Error: {error}</Typography>}
                </Container>
            </Wrapper>
        );
    }
}

export default Homepage