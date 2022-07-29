import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const location = useLocation();
  const UserId = location.pathname.split("/")[3];
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      let userData = await axios.get(
        `http://127.0.0.1:4000/api/users/${UserId}`
      );
      console.log(userData);
      setData(userData.data);
    };
    getData();
  }, [UserId]);

  const handleChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (UserId) {
      let response = await axios.put(
        `http://127.0.0.1:4000/api/users/${UserId}`,
        data
      );
      if (response.status === 200) {
        return { msg: "Success" };
      }
      return response;
    } else {
      let response = await axios.post(`http://127.0.0.1:4000/api/users`, data);
      if (response.status === 200) {
        return { msg: "Success" };
      }
      return response;
    }
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  name="image"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])
                  }
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <label>Name</label>
                <input
                  name="name"
                  type="text"
                  onChange={handleChange}
                  placeholder="name"
                  defaultValue={data?.name}
                />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  onChange={handleChange}
                  placeholder="Enter Email"
                  defaultValue={data?.email}
                />
              </div>
              <div className="formInput">
                <label>Username</label>
                <input
                  name="username"
                  type="text"
                  onChange={handleChange}
                  placeholder="Username"
                  defaultValue={data?.username}
                />
              </div>
              <div className="formInput">
                <label>Phone</label>
                <input
                  onChange={handleChange}
                  name="phone"
                  type="number"
                  placeholder="Phone"
                  defaultValue={data?.phone}
                />
              </div>
              <div className="formInput">
                <label>Gender</label>
                <select
                  name="gender"
                  onChange={handleChange}
                  value={data?.gender}
                  defaultValue="male"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder}/>
                </div>
              ))} */}
              <button onClick={handleClick}>{UserId?"Update":"Add"}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
