/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios'
import MoviesList from '../components/MoviesComponents/MoviesList';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setLogInState } from "../redux/action";

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [doRender, setDoRender] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const moviesUrl = "http://127.0.0.1:8000/movies";
  
    const getAllMovies = async () => {
      try {
      const resp = await axios.get(moviesUrl, { withCredentials: true });
      setMovies(resp.data);
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
        await getAllMovies();
      };
      getData();
    }, []);

    useEffect(() => {
      const getData = async () => {
        await getAllMovies();
      };
      getData();
    }, [doRender]);

    
 return (
    <div>
          <MoviesList movies={movies} render={doRender} state={setDoRender}/>
    </div>
 )
}

export default MoviesPage;


