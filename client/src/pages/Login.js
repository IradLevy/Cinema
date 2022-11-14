/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { setLogInState, setPermissions } from "../redux/action";
import jwt from "jwt-decode";
import "./LoginStyle.css";

const login_url = "http://127.0.0.1:8000/auth/login";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const obj = { email, password };
      const resp = await axios.post(login_url, obj, { withCredentials: true });
      dispatch(setLogInState(true));
      dispatch(setPermissions(jwt(resp.data).permissions));
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("permissions", jwt(resp.data).permissions);
      
      if (localStorage.getItem("permissions").includes("view_movies")) {
        navigate("/movies");
      } else {
        navigate("/clients");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-form-box">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <TextField
          required={true}
          className="text-field"
          type={"email"}
          id="email"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /> <br />
        <TextField
          required={true}
          className="text-field"
          type={"password"}
          id="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /> <br />
        <Button
          type="submit"
          variant="outlined"
          className="login-Button"
          color="secondary"
        >
          Log In
        </Button>
        <br /> <br />
        <Button
          className="login-Button"
          color="secondary"
          onClick={() => navigate("/register")}
        >
          Sign up
        </Button>
        <br /> <br />
      </form>
    </div>
  );
};

export default Login;
