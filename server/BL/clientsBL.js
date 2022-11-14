const { execute } = require("../connection/database");

const getAllClients = async () => {
  try {
    const clients = await execute("SELECT * from clients");
    // need to add get movies
    return clients;
  } catch (err) {
    return err;
  }
};

const getClientById = async (id) => {
  try {
    const client = await execute(`SELECT * from clients Where id=${id}`);
    return client;
  } catch (err) {
    return err;
  }
};

// Get all the movies the client watched
const getAllClientMovies = async (id) => {
  try {
    const movies = await execute(`
        SELECT m.name as movie_watched from movies m
        Join clients_movies cm ON m.id=cm.movie_id AND cm.client_id=${id}
        Join clients c ON c.id=${id}
        `);

    return movies;
  } catch (err) {
    return err;
  }
};

const addClient = async (obj) => {
  try {
    const { name, email, city } = obj;
    await execute(
      `INSERT INTO clients(name, email, city) VALUES('${name}', '${email}', '${city}')`
    );
  } catch (err) {
    return err;
  }
};

const updateClient = async (id, obj) => {
  try {
    const { name, email, city } = obj;
    await execute(
      `UPDATE clients SET name='${name}', email='${email}', city='${city}' Where id=${id}`
    );
  } catch (err) {
    return err;
  }
};

const deleteClient = async (id) => {
  try {
    await execute(`DELETE From clients_movies Where client_id=${id}`);
    await execute(`DELETE From clients Where id=${id}`);
  } catch (err) {
    return err;
  }
};

// subscribe to new movie obj contains movie id and date to watch
// date: yyyy/mm/dd
const subscribeToMovie = async (client_id, obj) => {
  const { movie_id } = obj;
  const date = new Date(obj.date);
  try {
    await execute(`
     INSERT INTO clients_movies(movie_id, client_id, date) VALUES('${movie_id}', '${client_id}', '${
      date.toISOString().split("T")[0]
    }')
     `);
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllClients,
  getClientById,
  addClient,
  updateClient,
  deleteClient,
  getAllClientMovies,
  subscribeToMovie,
};
