import React, { Component } from 'react'
import tableIcons from '../style/MaterialTableIcons'
import MaterialTable from 'material-table'
import api from '../api'
import moment from 'moment'

import styled from 'styled-components'

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
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllPages().then(pages => {
            this.setState({
                pages: pages.data.data,
                isLoading: false,
            })
        })

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
        const { pages, isLoading } = this.state
        console.log('TCL: CapcodesList -> render -> capcodes', pages)

        const columns = [
            {
                title: 'Time',
                field: 'time',
                render: rowData => <div>{moment(rowData.time).format('YYYY-MM-DD HH:mm:ss')}</div>,
                //type: 'datetime',
                filtering: false
            },
            {
                title: 'CapCode',
                field: 'capcode',
                type: 'string',
            },
            {
                title: 'Name',
                field: 'capcodeData[0].name',
                type: 'string',
            },
        ]

        let showTable = true
        if (!pages.length) {
            showTable = false
        }

        return (
            <Wrapper>
                <Container>
                    {showTable && (
                        <MaterialTable
                            title="Pages"
                            icons={tableIcons}
                            data={pages}
                            columns={columns}
                            options={{
                                exportButton: true,
                                actionsColumnIndex: -1,
                                pageSize: 20,
                                pageSizeOptions: [20, 50, 100, 250, 500],
                                filtering: true
                            }}
                            localization={{
                                header: {
                                    actions: 'Recording'
                                },
                            }}
                            actions={[
                                {
                                    icon: tableIcons.VolumeUp,
                                    tooltip: "Listen",
                                    onClick: (event, rowData) => {
                                        event.preventDefault()
                                        window.open(window.location.protocol + '//' + window.location.hostname + `:3000/api/recordings/${rowData.recordingPath}`, '_blank')
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

export default PagesList