import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import api from '../api';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

import tableIcons from '../style/MaterialTableIcons';

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Container = styled.div.attrs({
    className: 'container',
})``

class CapcodesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            capcodes: [],
            columns: [],
            isLoading: false,
            error: null
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        try {
            const capcodes = await api.getAllCapcodes()
            this.setState({
                capcodes: capcodes.data.data,
                isLoading: false,
            })
        } catch (error) {
            console.log("Error fetching capcodes:", error);
            this.setState({
                isLoading: false,
                error: error.message,
            });
        }
    }
    
    render() {
        const { capcodes, isLoading, error } = this.state;

        const columns = [
            {
                name: 'capcode',
                label: 'Capcode',
                options: {
                    filter: true,
                    sort: true,
                },
            },
            {
                name: 'name',
                label: 'Name',
                options: {
                    filter: true,
                    sort: true,
                },
            },
            {
                name: 'type',
                label: 'Type',
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: (value) => (value === 1 ? 'L-Tone' : '2-Tone'),
                },
            },
            {
                name: 'tone1',
                label: 'Tone 1 (Hz)',
                options: {
                    filter: true,
                    sort: true,
                },
            },
            {
                name: 'tone2',
                label: 'Tone 2 (Hz)',
                options: {
                    filter: false,
                    sort: true,
                    customBodyRender: (value) => (value ? value : '-'),
                },
            },
            {
                name: 'securityCode',
                label: 'Security Code',
                options: {
                    filter: true,
                    sort: true,
                },
            },
            {
                name: 'TTDexport',
                label: 'Export',
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: (value) => (value ? 'Yes' : 'No'),
                },
            },
        ];

        const options = {
            filterType: 'checkbox',
            responsive: 'standard',
            selectableRows: 'none',
            customToolbar: () => (
                <div>
                    <tableIcons.Add
                        onClick={() => (window.location.href = `/capcodes/create`)}
                        style={{ cursor: 'pointer' }}
                    />
                    <tableIcons.SurroundSoundIcon
                        onClick={() => {
                            api.exportTTDtones().then((res) => {
                                if (res.data.success) {
                                    window.alert(
                                        'Tones exported successfully. Please restart TwoToneDetect service on PMS server.'
                                    );
                                } else {
                                    window.alert(`Error exporting tones to TwoToneDetect. ${res.data.error}`);
                                }
                            });
                        }}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            ),
        };

        return (
            <Wrapper>
                <Container>
                    {isLoading && <Typography>Loading...</Typography>}
                    {error && <Typography style={{ color: 'red' }}>Error: {error}</Typography>}
                    {!isLoading && !error && !capcodes.length && (
                        <Typography>No capcodes available.</Typography>
                    )}
                    {capcodes.length > 0 && (
                        <MUIDataTable
                            title="Capcodes"
                            data={capcodes}
                            columns={columns}
                            options={options}
                        />
                    )}
                </Container>
            </Wrapper>
        );
    }
}

export default CapcodesList