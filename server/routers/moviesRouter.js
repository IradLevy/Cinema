const express = require("express");
const moviesBL = require("../BL/moviesBL");
const { verifyToken, isAuthorized } = require("../helpers/authHelper");

const router = express.Router();

router.route("/").get(verifyToken, async (req, resp) => {
  if (!isAuthorized(req.employee.permissions, process.env.VIEW_MOVIES)) {
    return resp.status(401).send("Unauthorized");
  }
  try {
    let movies = await moviesBL.getAllMovies();
    return resp.status(200).send(movies);
  } catch (err) {
    return resp.status(500).send(err);
  }
});

router.route("/:id").get(verifyToken, async (req, resp) => {
  if (!isAuthorized(req.employee.permissions, process.env.VIEW_MOVIES)) {
    return resp.status(401).send("Unauthorized");
  }
  const id = req.params.id;
  try {
    let movie = await moviesBL.getMovieById(id);
    return resp.status(200).send(movie);
  } catch (err) {
    return resp.status(500).send(err);
  }
});

// Get all clients that watched the movie (id param)
router.route("/:id/watchers").get(verifyToken, async (req, resp) => {
  if (!isAuthorized(req.employee.permissions, process.env.VIEW_MOVIES)) {
    return resp.status(401).send("Unauthorized");
  }
  const id = req.params.id;
  try {
    const watchers = await moviesBL.getAllMovieWatchers(id);
    return resp.status(200).send(watchers);
  } catch (err) {
    return err;
  }
});

router.route("/").post(verifyToken, async (req, resp) => {
  if (!isAuthorized(req.employee.permissions, process.env.CREATE_MOVIES)) {
    return resp.status(401).send("Unauthorized");
  }
  const obj = req.body;
  try {
    await moviesBL.addMovie(obj);
    return resp.status(200).send("Created");
  } catch (err) {
    return resp.status(500).send(err);
  }
});

router.route("/:id").put(verifyToken, async (req, resp) => {
  if (!isAuthorized(req.employee.permissions, process.env.UPDATE_MOVIES)) {
    return resp.status(401).send("Unauthorized");
  }
  const obj = req.body;
  const id = req.params.id;
  try {
    await moviesBL.updateMovie(id, obj);
    return resp.status(200).send("Updated");
  } catch (err) {
    return resp.status(500).send(err);
  }
});

router.route("/:id").delete(verifyToken, async (req, resp) => {
  if (!isAuthorized(req.employee.permissions, process.env.DELETE_MOVIES)) {
    return resp.status(401).send("Unauthorized");
  }
  const id = req.params.id;
  try {
    await moviesBL.deleteMovie(id);
    return resp.status(200).send("Deleted");
  } catch (err) {
    return resp.status(500).send(err);
  }
});

router.route("/:id/notWatched").get(verifyToken, async (req, resp) => {
  if (!isAuthorized(req.employee.permissions, process.env.CREATE_SUBS)) {
    return resp.status(401).send("Unauthorized");
  }
  const id = req.params.id;
  try {
    const movies = await moviesBL.getMoviesToClient(id);
    console.log(movies);
    return resp.status(200).send(movies);
  } catch (err) {
    return err;
  }
});

module.exports = router;
