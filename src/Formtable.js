import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./Crud";
import axios from "axios";

export const Formtable = ({
  handlechange,
  handlesubmit,
  handleclose,
  rest,
}) => {
  const [files,setfiles] = useState("")
  const upload = ()=>{
    const formdata = new FormData()
    formdata.append('file',files)
    axios.post('/upload',formdata).then(res=>{}).catch(er=>console.log(er))
  }
  return (
    <div className="container">
      <div className="btn close-btn" onClick={handleclose}>
        <AiOutlineClose />
      </div>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            name="name"
            onChange={handlechange}
            value={rest.name}
          ></input>
        </div>
        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input
            className="form-control"
            onChange={handlechange}
            name="email"
            value={rest.email}
          ></input>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            className="form-control"
            onChange={handlechange}
            name="password"
            value={rest.password}
          ></input>
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            className="form-control"
           type="file"   
           onChange={(e)=>{setfiles(e.target.files[0])}}   
          
          ></input>
        </div>
        <button className="btn btn-success" onClick={upload}>Submit</button>
      </form>
    </div>
  );
};
