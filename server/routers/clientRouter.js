const express = require("express");
const clientBL = require("../BL/clientsBL");
const { verifyToken, isAuthorized } = require("../helpers/authHelper");

const router = express.Router();

router.route("/").get(verifyToken, async (req, resp) => {
  if (!isAuthorized(req.employee.permissions, process.env.VIEW_SUBS)) {
    return resp.status(401).send("Unauthorized");
  }
  try {
    const clients = await clientBL.getAllClients();
    return resp.status(200).send(clients);
  } catch (err) {
    return resp.status(500).send(err);
  }
});

router.route("/:id").get(verifyToken, async (req, resp) => {
  if (!isAuthorized(req.employee.permissions, process.env.VIEW_SUBS)) {
    return resp.status(401).send("Unauthorized");
  }
  const id = req.params.id;
  try {
    let client = await clientBL.getClientById(id);
    return resp.status(200).send(client);
  } catch (err) {
    return resp.status(500).send(err);
  }
});

// Get all the movies names the client (id param) watched
router.route("/:id/moviesWatched").get(verifyToken, async (req, resp) => {
  if (!isAuthorized(req.employee.permissions, process.env.VIEW_SUBS)) {
    return resp.status(401).send("Unauthorized");
  }
  const id = req.params.id;
  try {
    let movies = await clientBL.getAllClientMovies(id);
    return resp.status(200).send(movies);
  } catch (err) {
    return err;
  }
});

router.route("/").post(verifyToken, async (req, resp) => {
  if (!isAuthorized(req.employee.permissions, process.env.CREATE_SUBS)) {
    return resp.status(401).send("Unauthorized");
  }
  const obj = req.body;
  try {
    await clientBL.addClient(obj);
    return resp.status(200).send("Created");
  } catch (err) {
    return resp.status(500).send(err);
  }
});

// Subscribe to new movie by getting the client id as param,
// and movie id and date as obj
router.route("/:id/subscribe").post(verifyToken, async (req, resp) => {
  if (!isAuthorized(req.employee.permissions, process.env.CREATE_SUBS)) {
    return resp.status(401).send("Unauthorized");
  }
  const obj = req.body;
  const id = req.params.id;
  try {
    await clientBL.subscribeToMovie(id, obj);
    return resp.status(200).send("Subscribed");
  } catch (err) {
    return resp.status(500).send(err);
  }
});

router.route("/:id").put(verifyToken, async (req, resp) => {
  if (!isAuthorized(req.employee.permissions, process.env.UPDATE_SUBS)) {
    return resp.status(401).send("Unauthorized");
  }
  const obj = req.body;
  const id = req.params.id;
  try {
    await clientBL.updateClient(id, obj);
    return resp.status(200).send("Updated");
  } catch (err) {
    return resp.status(500).send(err);
  }
});

router.route("/:id").delete(verifyToken, async (req, resp) => {
  if (!isAuthorized(req.employee.permissions, process.env.DELETE_SUBS)) {
    return resp.status(401).send("Unauthorized");
  }
  const id = req.params.id;
  try {
    await clientBL.deleteClient(id);
    return resp.status(200).send("Deleted");
  } catch (err) {
    return resp.status(500).send(err);
  }
});

module.exports = router;
