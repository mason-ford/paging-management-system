import React, { Component } from 'react'
import tableIcons from '../style/MaterialTableIcons'
import MaterialTable from 'material-table'
import api from '../api'

import styled from 'styled-components'

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
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllCapcodes().then(capcodes => {
            this.setState({
                capcodes: capcodes.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { capcodes, isLoading } = this.state

        const columns = [
            {
                title: 'Capcode',
                field: 'capcode',
                type: 'numeric',
                cellStyle: {
                    width: '15%'
                }
            },
            {
                title: 'Name',
                field: 'name',
                type: 'string',
                cellStyle: {
                    width: '30%'
                }
            },
            {
                title: 'Type',
                field: 'type',
                lookup: { 1: 'L-Tone', 2: '2-Tone' },
            },
            {
                title: 'Tone 1 (Hz)',
                field: 'tone1',
                type: 'numeric',
            },
            {
                title: 'Tone 2 (Hz)',
                field: 'tone2',
                type: 'numeric',
                emptyValue: '-'
            },
            {
                title: 'Security Code',
                field: 'securityCode',
                type: 'numeric',
            },
            {
                title: 'Export',
                field: 'TTDexport',
                type: 'boolean',
                cellStyle: {
                    width: '10%'
                }
            },
        ]

        let showTable = true
        if (!capcodes.length) {
            showTable = false
        }

        return (
            <Wrapper>
                <Container>
                    {showTable && (
                        <MaterialTable
                            title="Capcodes"
                            icons={tableIcons}
                            data={capcodes}
                            columns={columns}
                            options={{
                                exportButton: true,
                                actionsColumnIndex: -1,
                                paging: false,
                                padding: "dense",
                                filtering: true,
                            }}
                            actions={[
                                {
                                    icon: tableIcons.Delete,
                                    tooltip: "Delete Capcode",
                                    onClick: (event, rowData) => {
                                        event.preventDefault()
                                
                                        if (
                                            window.confirm(
                                                `Do you want to delete the capcode ${rowData.name} permanently?`,
                                            )
                                        ) {
                                            api.deleteCapcodeById(rowData._id)
                                            window.location.reload()
                                        }
                                    },
                                },
                                {
                                    icon: tableIcons.Edit,
                                    tooltip: "Edit Capcode",
                                    onClick: (event, rowData) => {
                                        event.preventDefault()
                                        window.location.href = `/capcodes/update/${rowData._id}`
                                    },
                                },
                                {
                                    icon: tableIcons.SurroundSoundIcon,
                                    tooltip: "Export for TwoToneDetect",
                                    isFreeAction: true,
                                    onClick: (event) => {
                                        api.exportTTDtones().then(res => {
                                            if(res.data.success) {
                                                window.alert('Tones exported successfully. Please restart TwoToneDetect service on PMS server.')
                                            } else {
                                                window.alert(`Error exporting tones to TwoToneDetect. ${res.data.error}`)
                                            }
                                        })
                                    },
                                },
                                {
                                    icon: tableIcons.Add,
                                    tooltip: "Add Capcode",
                                    isFreeAction: true,
                                    onClick: (event) => {
                                        event.preventDefault()
                                        window.location.href = `/capcodes/create`
                                    },
                                },
                            ]}
                        />
                    )}
                </Container>
            </Wrapper>
        )
    }
}

export default CapcodesList