import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import api from '../api';
import moment from 'moment';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import tableIcons from '../style/MaterialTableIcons';

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Container = styled.div.attrs({
    className: 'container',
})``

class PagesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pages: [],
            columns: [],
            isLoading: false,
            error: null
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        try {
            const pages = await api.getAllPages();
            this.setState({
                pages: pages.data.data,
                isLoading: false,
            })
        } catch (error) {
            console.error("Error fetching pages:", error);
            this.setState({
                isLoading: false,
                error: error.message, 
            });
        }

        /*setInterval(() => {
            api.getAllPages().then(pages => {
                this.setState({
                    pages: pages.data.data,
                    isLoading: false,
                })
            })
        }, 30000);*/
    }

    render() {
        const { pages, isLoading, error } = this.state;

        const columns = [
            {
                name: 'time',
                label: 'Time',
                options: {
                    filter: false,
                    customBodyRender: (value) => <div>{moment(value).format('YYYY-MM-DD HH:mm:ss')}</div>,
                },
            },
            {
                name: 'capcode',
                label: 'CapCode',
                options: {
                    filter: true,
                },
            },
            {
                name: 'name',
                label: 'Name',
                options: {
                    filter: true,
                },
            },
        ];

        const options = {
            filterType: 'checkbox',
            responsive: 'standard',
            selectableRows: 'none',
            pageSize: 20,
            rowsPerPageOptions: [20, 50, 100, 250, 500],
            downloadOptions: {
                filename: 'pages.csv',
                separator: ',',
            },
        };

        let showTable = true;
        if (!pages.length) {
            showTable = false;
        }

        return (
            <Wrapper>
                <Container>
                    {isLoading && <Typography>Loading...</Typography>}
                    {error && <Typography style={{ color: 'red' }}>Error: {error}</Typography>}
                    {!isLoading && !error && !showTable && <Typography>No pages available.</Typography>}
                    {showTable && (
                        <MUIDataTable
                            title="Pages"
                            data={pages}
                            columns={columns}
                            options={options}
                            icons={tableIcons}
                        />
                    )}
                </Container>
            </Wrapper>
        );
    }
}

export default PagesList