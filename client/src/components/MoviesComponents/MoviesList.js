import React from "react";
import MovieCard from "./MovieCard";
import "./MoviesStyle.css";

const MoviesList = (props) => {
 

  return (
    <div className="movie-list">
      {props.movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            id={movie.id}
            image={movie.image}
            name={movie.name}
            genre={movie.genre}
            premiered={movie.premiered}
            render={props.render}
            state={props.state}
          />
        );
      })}
    </div>
  );
};

export default MoviesList;
