import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { setLogInState } from "../../redux/action";

import "../GlobalStyle.css";

const AddClient = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  const addUrl = `http://127.0.0.1:8000/clients`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const obj = {
        name,
        email,
        city,
      };

      const resp = await axios.post(addUrl, obj, { withCredentials: true });
      console.log(resp.data);
      navigate("/clients");
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(setLogInState(false));
        localStorage.setItem("isLoggedIn", false);
        localStorage.setItem("permissions", []);
        navigate("/");
      }

      console.log(err);
    }
  };

  return (
    <div className="form-box">
      <form onSubmit={handleSubmit}>
        <h2>Edit Client:</h2>
        <TextField
          className="text-field"
          required={true}
          id="standard-textarea"
          label="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <TextField
          className="text-field"
          required={true}
          id="standard-textarea"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <TextField
          className="text-field"
          required={true}
          id="standard-textarea"
          label="City"
          onChange={(e) => setCity(e.target.value)}
        />
        <br /> <br />
        <Button
          style={{ color: "#ff4055" }}
          type="submit"
          variant="outlined"
          color="secondary"
        >
          Add
        </Button>
        <Button
          onClick={() => navigate("/clients")}
          style={{ color: "#ff4055" }}
          color="secondary"
        >
          Cancel
        </Button>
        <br /> <br />
      </form>
    </div>
  );
};

export default AddClient;
