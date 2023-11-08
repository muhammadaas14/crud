import React, { useEffect, useState } from "react";
import "./Crud.css";
import "./Formtable";
import axios from "axios";
import { Formtable } from "./Formtable";
axios.defaults.baseURL = "https://crudbackenddd.onrender.com";
export default function Crud() {
  const [addsection, setaddsection] = useState(false);
  const [editsection, seteditsection] = useState(false);

  const [datalist, setdatalist] = useState([]);
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formdataedit, setformdataedit] = useState({
    name: "",
    email: "",
    password: "",
    id: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formdata);
    fetcheddata();
    alert(data.data.message);
  };
  const handleupdate = async (e) => {
    e.preventDefault();
    const data = await axios.put("/update", formdataedit);
    fetcheddata();
    seteditsection(false);
  };
  const handledelete = async (id) => {
    const data = await axios.delete("/delete/" + id);
    fetcheddata();
  };

  const handlechange = async (e) => {
    const { name, value } = e.target;
    setformdata((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleeditchange = async (e) => {
    const { name, value } = e.target;
    setformdataedit((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const fetcheddata = async () => {
    const data = await axios.get("/");
    console.log(data);
    setdatalist(data.data.data);
  };
  const handleedit = (el) => {
    setformdataedit(el);
    seteditsection(true);
  };

  useEffect(() => {
    fetcheddata();
  }, []);
  return (
    <div className="all">
      <button className="btn btn-primary" onClick={() => setaddsection(true)}>
        Add User
      </button>
      {addsection && (
        <Formtable
          handlechange={handlechange}
          handleclose={() => setaddsection(false)}
          handlesubmit={handlesubmit}
          rest={formdata}
        />
      )}
      {editsection && (
        <Formtable
          handlechange={handleeditchange}
          handleclose={() => seteditsection(false)}
          handlesubmit={handleupdate}
          rest={formdataedit}
        />
      )}

      <div className="tablecontainer">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {datalist && datalist[0] ? (
              datalist.map((el) => {
                return (
                  <tr>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>{el.password}</td>
                    <td>
                      <div
                        className="btn btn-primary"
                        onClick={() => handleedit(el)}
                      >
                        Update
                      </div>
                    </td>
                    <td>
                      <div
                        className="btn btn-danger"
                        onClick={() => handledelete(el._id)}
                      >
                        Delete
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <p>List Is Empty</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
