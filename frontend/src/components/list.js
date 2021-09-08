import React, {useState, useEffect} from 'react';
import '../App.css';
import { retrieveAllDeliveries } from '../components/utilities'

import styled from 'styled-components'
import { useTable } from 'react-table'
// import makeData from './makeData'


const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`


function List() {

    console.log("Hello List");

    const [deliveries, setDeliveries] = useState([]);

    useEffect( async () => {
        const result = await retrieveAllDeliveries();
        setDeliveries(result.data);
    },[]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Deliveries',
                columns: [
                    {
                        Header: 'Email',
                        accessor: 'email',
                    },
                    {
                        Header: 'Payment',
                        accessor: 'payment',
                    },
                    {
                        Header: 'Image',
                        accessor: 'image',
                    },
                    {
                        Header: 'Timestamp',
                        accessor: 'createdAt',
                    },
                ],
            },
        ],
        []
    )

    return (
        <div className="App">
            <h1>List</h1>
            {console.log(deliveries)}
            <Styles>
                <Table columns={columns} data={deliveries} />
            </Styles>
        </div>
    );
}

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    // Render the UI for your table
    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default List;