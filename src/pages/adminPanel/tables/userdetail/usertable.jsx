import { useEffect, useState } from "react";
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'

const columns = [
  { field: '_id', headerName: 'ID', width: 340 },
  { field: 'userName', headerName: 'User Name', width: 140 },
  { field: 'email', headerName: 'Email', width: 240 },
  // { field:  'password', headerName: 'Password', width: 140 },
  { field: 'mobileno', headerName: 'Mobile No', width: 200 },
  { field: 'adhaarNumber', headerName: 'Adhaar Number', width: 140 },
  // { field: 'userType', headerName: 'User Type', width: 140 },
]
function UserTable() {
  const [row, setRow] = useState([])

  const userDetail = localStorage.getItem("userInfo");

  const authentication = JSON.parse(userDetail);

  useEffect(() => {
    async function fetchUserTable() {
      try {
        const response = await axios.get('https://eliteestatebackend.onrender.com/getUser', {
          headers: {
            Authorization: `bearer ${authentication.token}`
          }
        });
        setRow(response.data);
      } catch (err) {
        console.log(err)
      }
    }
    fetchUserTable();
  }, []);

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={row} // Updated prop 'rows' instead of 'row'
        columns={columns}
        getRowId={(row) => row._id} // Use '_id' as the unique identifier
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

export default UserTable;


