import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState ,useEffect} from "react";
import axios from "axios";
const Datatable = () => {
  // const [data, setData] = useState(userRows);
  const [data, setData] = useState([]); 
   const getData = async () => {
    const {data} = await axios.get(`http://127.0.0.1:4000/api/users`);
    setData(data);
  };  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async(id) => {
    let response=await axios.delete(`http://127.0.0.1:4000/api/users/${id}`);
    console.log(response);
    if(response.status===200){
      setData(data.filter((item) => item._id!== id));
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"/users/"+ params.row._id} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        getRowId={(row) => row._id}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
