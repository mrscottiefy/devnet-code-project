import React, {useState, useEffect} from 'react';
import '../App.css';
import { retrieveAllDeliveries } from '../components/utilities'

import { DataGrid } from '@material-ui/data-grid'
import { makeStyles } from '@material-ui/styles';

// import styled from 'styled-components'
// import { useTable } from 'react-table'
// import makeData from './makeData'


function List() {

    console.log("Hello List");

    const [deliveries, setDeliveries] = useState([]);

    useEffect( async () => {
        const result = await retrieveAllDeliveries();
        setDeliveries(result.data);
    },[]);

    const columns = [
        { field: 'id', headerName: 'Order ID', width: 150, headerClassName: 'super-app-theme--header', headerAlign: 'center',},
        { field: 'email', headerName: 'Email', width: 150, editable: false,},
        { field: 'image',headerName: 'Image', width: 150, editable: false,},
        { field: 'createdAt',headerName: 'Order Date',type: 'number', width: 150, editable: false,},
        { field: 'payment', headerName: 'Payment SGD', width: 170, editable: false,},
    ];

    const useStyles = makeStyles({
        root: {
            '& .super-app-theme--header': {
                backgroundColor: 'rgba(255, 7, 0, 0.55)',
            },
        },
    });
    
    const classes = useStyles();

    return (
        <div className="App">
            <h1>List</h1>
            {console.log(deliveries)}

            <div className={classes.root} style={{ height: 400, width: '70%' }}>
                <DataGrid
                    rows={deliveries}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>
            
        </div>
    );
}

export default List;