/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { setLogInState } from "../../redux/action";
import "./ClientStyle.css";

const SubscriptionMovie = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);

  const subsUrl = "http://127.0.0.1:8000/clients/";

  const getMovies = async (id) => {
    try {
      const resp = await axios.get(subsUrl + `${id}/moviesWatched`, {
        withCredentials: true,
      });

      const moviesWatched = resp.data;

      const moviesArr = [];

      moviesWatched.forEach((m) => {
        moviesArr.push(m);
      });

      if (moviesWatched.length > 0) {
        setMovies(moviesArr);
      }
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
    const getAllMoviesWatched = async () => {
      await getMovies(props.id);
    };
    getAllMoviesWatched();
  }, []);

  return (
    <div>
      <Button
        style={{ color: "#ff4055" }}
        onClick={() => navigate(`/subscribe/${props.id}`)}
        variant="outlined"
        color="secondary"
      >
        Subscribe to movie
      </Button>

      {movies.length > 0 ? (
        <h5>Movies Watched:</h5>
      ) : (
        <h5>Did not watch any movie</h5>
      )}
      <div>
        {movies.length > 0 && (
          <ul className="movies-list">
            {movies.map((movie, index) => {
              return <li key={index}>{movie.movie_watched}</li>;
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SubscriptionMovie;
