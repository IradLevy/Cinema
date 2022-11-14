import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { setLogInState } from "../../redux/action";
import "../GlobalStyle.css";

const AddMovie = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState("");
  const [premiered, setPremiered] = useState(new Date());

  const addUrl = `http://127.0.0.1:8000/movies`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const obj = {
        name,
        genre,
        image,
        premiered: premiered.slice(0, 10),
      };

      const resp = await axios.post(addUrl, obj, { withCredentials: true });
      console.log(resp.data);
      navigate("/movies");
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
        <h2>Add Movie:</h2>
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
          label="Genre"
          onChange={(e) => setGenre(e.target.value)}
        />
        <br />
        <TextField
          className="text-field"
          required={true}
          id="standard-textarea"
          label="Image"
          onChange={(e) => setImage(e.target.value)}
        />
        <br />
        <br />
        Premiered:&nbsp;&nbsp;&nbsp;&nbsp;
        <Input
          type="date"
          required
          onChange={(e) => setPremiered(e.target.value)}
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
          onClick={() => navigate("/movies")}
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

export default AddMovie;
