/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { useDispatch } from "react-redux";
import { setLogInState } from "../../redux/action";
import "../GlobalStyle.css";

const AddEmployee = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [sessionTimeOut, setSessionTimeOut] = useState(0);
  const [permissions, setPermissions] = useState([]);
  const [viewMovieCheck, setViewMovieCheck] = useState(false);
  const [viewSubsCheck, setViewSubsCheck] = useState(false);

  const addUrl = `http://127.0.0.1:8000/employees`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const obj = {
        firstname: fname,
        lastname: lname,
        email: email,
        sessiontimeout: sessionTimeOut,
        permissions: permissions,
      };

      const resp = await axios.post(addUrl, obj, { withCredentials: true });
      console.log(resp.data);
      navigate("/employees");
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

  const handleCheck = (e) => {
    const id = +e.target.id;
    const checked = e.target.checked;
    const index = permissions.indexOf(id);

    if (index !== -1 && id !== 1 && id !== 5) {
      setPermissions(permissions.filter((per) => per !== id));
    }

    if (
      checked &&
      !viewMovieCheck &&
      (id === 1 || id === 2 || id === 3 || id === 4)
    ) {
      setViewMovieCheck(true);
    }

    if (
      id === 1 &&
      viewMovieCheck &&
      permissions.includes(2) === false &&
      permissions.includes(3) === false &&
      permissions.includes(4) === false
    ) {
      setViewMovieCheck(false);
    }

    if (
      checked &&
      !viewSubsCheck &&
      (id === 5 || id === 6 || id === 7 || id === 8)
    ) {
      setViewSubsCheck(true);
    }

    if (
      id === 5 &&
      viewSubsCheck &&
      permissions.includes(6) === false &&
      permissions.includes(7) === false &&
      permissions.includes(8) === false
    ) {
      setViewSubsCheck(false);
    }

    if (checked) {
      setPermissions([...permissions, id]);
    }
  };

  useEffect(() => {
    if (viewMovieCheck) {
      if (permissions.includes(1) === false) {
        setPermissions([...permissions, 1]);
      }
    } else {
      setPermissions(permissions.filter((per) => per !== 1));
    }
  }, [viewMovieCheck]);

  useEffect(() => {
    if (viewSubsCheck) {
      setPermissions([...permissions, 5]);
    } else {
      setPermissions(permissions.filter((per) => per !== 5));
    }
  }, [viewSubsCheck]);

  return (
    <div className="form-box">
      <form onSubmit={handleSubmit}>
        <h2>Add Employee:</h2>
        <TextField
          className="text-field"
          required={true}
          id="standard-textarea"
          label="FirstName"
          onChange={(e) => setFname(e.target.value)}
        />
        <br />
        <TextField
          className="text-field"
          required={true}
          id="standard-textarea"
          label="LastName"
          onChange={(e) => setLname(e.target.value)}
        />
        <br />
        <TextField
          className="text-field"
          required={true}
          id="email"
          type={"email"}
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <TextField
          className="text-field"
          required={true}
          id="standard-number"
          type={"number"}
          label="SessionTimeOut"
          onChange={(e) => setSessionTimeOut(+e.target.value)}
        />
        <br /> <br />
        Permissions:
        <br /> <br />
        <div className="check-box-div">
          <Checkbox
            style={{ color: "#ff4055" }}
            id="1"
            onChange={handleCheck}
            checked={viewMovieCheck}
          />{" "}
          View Movies
          <br />
          <Checkbox
            style={{ color: "#ff4055" }}
            id="5"
            onChange={handleCheck}
            checked={viewSubsCheck}
          />{" "}
          View Subscriptions
          <br />
          <Checkbox
            style={{ color: "#ff4055" }}
            id="3"
            onChange={handleCheck}
          />{" "}
          Edit Movies
          <br />
          <Checkbox
            style={{ color: "#ff4055" }}
            id="7"
            onChange={handleCheck}
          />{" "}
          Edit Subscriptions
          <br />
          <Checkbox
            style={{ color: "#ff4055" }}
            id="2"
            onChange={handleCheck}
          />{" "}
          Create Movies
          <br />
          <Checkbox
            style={{ color: "#ff4055" }}
            id="6"
            onChange={handleCheck}
          />{" "}
          Create Subscriptions <br />
          <Checkbox
            style={{ color: "#ff4055" }}
            id="4"
            onChange={handleCheck}
          />{" "}
          Delete Movies
          <br />
          <Checkbox
            style={{ color: "#ff4055" }}
            id="8"
            onChange={handleCheck}
          />{" "}
          Delete Subscriptions
        </div>
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
          onClick={() => navigate("/employees")}
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

export default AddEmployee;
