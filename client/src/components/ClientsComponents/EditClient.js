/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { setLogInState } from "../../redux/action";
import "../GlobalStyle.css";

const EditClient = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clientId = useParams().ClientId;
  const [client, setClient] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  const url = `http://127.0.0.1:8000/clients/${clientId}`;

  const getClient = async () => {
    try {
      const resp = await axios.get(url, { withCredentials: true });
      setClient(resp.data[0]);
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/");
      }

      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const obj = {
        name,
        email,
        city,
      };
      const resp = await axios.put(url, obj, { withCredentials: true });
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

  useEffect(() => {
    const getData = async () => {
      await getClient();
    };
    getData();
  }, []);

  return (
    <div className="form-box">
      <form onSubmit={handleSubmit}>
        <h2>Edit Client:</h2>
        <TextField
          className="text-field"
          required={true}
          id="standard-textarea"
          label="Name"
          placeholder={client.name}
          multiline
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <TextField
          className="text-field"
          required={true}
          id="standard-textarea"
          label="Email"
          placeholder={client.email}
          multiline
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <TextField
          className="text-field"
          required={true}
          id="standard-textarea"
          label="City"
          placeholder={client.city}
          multiline
          onChange={(e) => setCity(e.target.value)}
        />
        <br /> <br />
        <Button
          style={{ color: "#ff4055" }}
          type="submit"
          variant="outlined"
          color="secondary"
        >
          Edit
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

export default EditClient;
