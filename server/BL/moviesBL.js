const { execute } = require("../connection/database");

const getAllMovies = async () => {
  try {
    const movies = await execute(`SELECT * from movies`);
    return movies;
  } catch (err) {
    return err;
  }
};

// Get all the clients that watched the movie
const getAllMovieWatchers = async (id) => {
  try {
    const clients = await execute(`
        SELECT c.name as client_watched from clients c
        Join clients_movies cm ON c.id=cm.client_id AND cm.movie_id=${id}
        Join movies m ON m.id=${id}
        `);

    return clients;
  } catch (err) {
    return err;
  }
};

const getMovieById = async (id) => {
  try {
    const movie = await execute(`SELECT * from movies Where id=${id}`);
    // need to add get permissions
    return movie;
  } catch (err) {
    return err;
  }
};

const addMovie = async (obj) => {
  try {
    const { name, genre, image } = obj;
    const date = new Date(obj.premiered);
    await execute(
      `INSERT INTO movies(name, genre, image, premiered) VALUES('${name}', '${genre}', '${image}', '${
        date.toISOString().split("T")[0]
      }') `
    );
  } catch (err) {
    return err;
  }
};

const updateMovie = async (id, obj) => {
  try {
    const { name, genre, image } = obj;
    const date = new Date(obj.premiered);
    await execute(
      `UPDATE movies SET name='${name}', genre='${genre}', image='${image}', premiered='${
        date.toISOString().split("T")[0]
      }}' Where id=${id}`
    );
  } catch (err) {
    return err;
  }
};

const deleteMovie = async (id) => {
  try {
    await execute(`DELETE from clients_movies Where movie_id=${id}`);
    await execute(`DELETE from movies Where id=${id}`);
  } catch (err) {
    return err;
  }
};

// returns all the movies the client has not watched yet
const getMoviesToClient = async (id) => {
  try {
    let movies = await execute(
      `SELECT movie_id from clients_movies Where client_id=${id}`
    );
    const moviesArr = [];
    for (let i = 0; i < movies.length; i++) {
      moviesArr.push(movies[i].movie_id);
    }

    if (moviesArr.length > 0) {
      movies = await execute(
        `SELECT id, premiered, name from movies Where id NOT IN (${moviesArr})`
      );

      return movies;
    } else {
      return await getAllMovies();
    }
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
  getMoviesToClient,
  getAllMovieWatchers,
};
