import React, {useState, useEffect} from 'react';
import '../App.css';
import './nav.css'
import { retrieveAllDeliveries } from '../components/utilities'

import { DataGrid } from '@material-ui/data-grid'
import { makeStyles } from '@material-ui/styles';

function List() {

    console.log("Hello List");

    const [deliveries, setDeliveries] = useState([]);

    useEffect( async () => {
        const result = await retrieveAllDeliveries();
        setDeliveries(result.data);
    },[]);

    const columns = [
        { field: 'id', headerName: 'Order ID', width: 200, headerClassName: 'super-app-theme--header', headerAlign: 'center',},
        { field: 'email', headerName: 'Email', width: 300, editable: false, headerClassName: 'super-app-theme--header', headerAlign: 'center'},
        { field: 'image', headerName: 'Image', type:'html', width: 300, editable: false, headerClassName: 'super-app-theme--header', headerAlign: 'center',
            renderCell: (params) => (
                <img 
                    src={(params.value)}
                    height="100"
                    alt=""
                />
            ),
        },
        { field: 'createdAt', headerName: 'Order Date', type: 'number', width: 200, editable: false, headerClassName: 'super-app-theme--header', headerAlign: 'center', },
        { field: 'payment', headerName: 'Payment SGD', width: 200, editable: false, headerClassName: 'super-app-theme--header', headerAlign: 'center'},
    ];

    const useStyles = makeStyles({
        root: {
            '& .super-app-theme--header': {
                backgroundColor: '#00b14f;',
            },
        },
    });
    
    const classes = useStyles();

    return (
        <div className="App">
            <h1>List</h1>
            {console.log(deliveries)}

            <div className={classes.root} style={{ height: 400, width: '100%' }}>
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