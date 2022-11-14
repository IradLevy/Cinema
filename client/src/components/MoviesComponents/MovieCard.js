import React from "react";
import axios from "axios";
import MovieSubscriptions from "./MovieSubscriptions";
import Button from "@material-ui/core/Button";
import "./MoviesStyle.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogInState } from "../../redux/action";
import { useSelector } from "react-redux";

const MovieCard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const permissions = useSelector((state) => state.permissions);

  const url = `http://127.0.0.1:8000/movies/${props.id}`;

  const handleDelete = async () => {
    try {
      const resp = await axios.delete(url, { withCredentials: true });
      console.log(resp.data);
      props.state(!props.render)
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
    <div className="card">
      <img src={props.image} alt={props.name} />
      <div className="card-details">
        <h3>{props.name}</h3>
        <span>Genre: {props.genre}</span> <br />
        <span>Premiered: {props.premiered.slice(0, 10)}</span>
        <MovieSubscriptions id={props.id} />
        <div className="buttons-div">
        { (permissions.includes("update_movies") || 
          permissions.includes("admin")) &&
          <Button
            style={{ color: "#ff4055" }}
            variant="outlined"
            color="secondary"
            onClick={() => navigate(`/movies/${props.id}`)}
          >
            Edit
          </Button>}

          { (permissions.includes("delete_movies") || 
          permissions.includes("admin")) &&
          <Button
            style={{ backgroundColor: "#ff4055" }}
            variant="contained"
            color="secondary"
            onClick={handleDelete}
          >
            Delete
          </Button>}
          </div>
      </div>
    </div>
  );
};

export default MovieCard;
