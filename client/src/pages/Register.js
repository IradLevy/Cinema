import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./LoginStyle.css";

const signUp_url = "http://127.0.0.1:8000/auth/register";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const obj = { email, password };
      const resp = await axios.post(signUp_url, obj, { withCredentials: true });
      console.log(resp.data);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

 return (
    <div className="login-form-box">
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
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
        Sign Up
      </Button>
      <br /> <br />
      <Button className="login-Button" color="secondary" onClick={() => navigate('/')}>
        Log In
      </Button>
      <br /> <br />
    </form>
  </div>
 )
}

export default Register;
