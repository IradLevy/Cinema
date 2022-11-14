/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogInState } from "../../redux/action";
import Button from "@material-ui/core/Button";

const SubscribeToMovie = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const clientId = useParams().ClientId;

  const moviesUrl = `http://127.0.0.1:8000/movies/${clientId}/notWatched`;

  const getAllMovies = async () => {
    try {
      const resp = await axios.get(moviesUrl, { withCredentials: true });
      setMovies(resp.data);
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/");
      }

      console.log(err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      await getAllMovies();
    };
    getData();
  }, []);

  const handleChange = (e) => {
    setSelectedMovie(e.target.value);
  };

  const subUrl = `http://127.0.0.1:8000/clients/${clientId}/subscribe`;

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const obj = {
        movie_id: selectedMovie.id,
        date: selectedMovie.premiered?.slice(0, 10),
      };

      const resp = axios.post(subUrl, obj, { withCredentials: true });
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
        <h2>Subscribe to new movie</h2>
        <TextField
          id="standard-select-currency"
          select
          label="Select"
          value={selectedMovie}
          onChange={handleChange}
          helperText="Please select a movie"
        >
          {movies.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <br />
        <br />
        Date: {selectedMovie.premiered?.slice(0, 10)}
        <br />
        <br />
        <Button
          style={{ color: "#ff4055" }}
          type="submit"
          variant="outlined"
          color="secondary"
        >
          Subscribe
        </Button>
        <Button
          onClick={() => navigate("/clients")}
          style={{ color: "#ff4055" }}
          color="secondary"
        >
          Cancel
        </Button>
        <br />
        <br />
      </form>
    </div>
  );
};

export default SubscribeToMovie;
