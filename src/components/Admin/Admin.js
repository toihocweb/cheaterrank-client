import React, { useState } from "react";
import classes from "./style.module.scss";
import Axios from "axios";
import { apiUrl } from "../../utils /api";

const Admin = () => {
  const [inputs, setInputs] = useState("");
  const [outputs, setOutputs] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataPost = {
      language: "javascript",
      inputs,
      outputs,
      desc,
    };
    await Axios.post(`${apiUrl}/api/cheaterrank/test`, dataPost);
  };

  return (
    <div className={classes.addTestForm}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <label htmlFor="">
          Inputs
          <input
            value={inputs}
            onChange={(e) => setInputs(e.target.value)}
            type="text"
            className="inputs"
          />
        </label>
        <label htmlFor="">
          Outputs
          <input
            value={outputs}
            onChange={(e) => setOutputs(e.target.value)}
            type="text"
            className="outputs"
          />
        </label>
        <label htmlFor="">
          Description
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            className="desc"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          ></textarea>
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Admin;
