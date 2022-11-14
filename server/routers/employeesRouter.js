const express = require("express");
const employeeBL = require("../BL/employeeBL");
const { verifyToken, isAuthorized } = require("../helpers/authHelper");

const router = express.Router();

router.route("/").get(verifyToken, async (req, resp) => {
  if (!isAuthorized(req.employee.permissions, process.env.ADMIN)) {
    return resp.status(401).send("Unauthorized");
  }
  try {
    let employees = await employeeBL.getAllEmployees();
    return resp.status(200).send(employees);
  } catch (err) {
    return resp.status(500).send(err);
  }
});

router.route("/:id").get(verifyToken, async (req, resp) => {
  if (!isAuthorized(req.employee.permissions, process.env.ADMIN)) {
    return resp.status(401).send("Unauthorized");
  }
  const id = req.params.id;
  try {
    let employee = await employeeBL.getEmployeeById(id);
    return resp.status(200).send(employee);
  } catch (err) {
    return resp.status(500).send(err);
  }
});

router.route("/:id/permissions").get(verifyToken, async (req, resp) => {
  if (!isAuthorized(req.employee.permissions, process.env.ADMIN)) {
    return resp.status(401).send("Unauthorized");
  }
  const id = req.params.id;
  try {
    let permissions = await employeeBL.getEmployeePermissions(id);
    return resp.status(200).send(permissions);
  } catch {
    return resp.status(500).send(err);
  }
});

router.route("/").post(verifyToken, async (req, resp) => {
  if (!isAuthorized(req.employee.permissions, process.env.ADMIN)) {
    return resp.status(401).send("Unauthorized");
  }
  const obj = req.body;

  const emails = await employeeBL.getEmployeeEmail(obj.email)
  
  if (emails.length > 0) {
    return resp.status(409).send("Email already exist")
  }

  try {
    await employeeBL.addEmployee(obj);
    return resp.status(200).send("Created");
  } catch (err) {
    return resp.status(500).send(err);
  }
});

router.route("/:id").put(verifyToken, async (req, resp) => {
  if (!isAuthorized(req.employee.permissions, process.env.ADMIN)) {
    return resp.status(401).send("Unauthorized");
  }
  const obj = req.body;
  const id = req.params.id;
  try {
    await employeeBL.updateEmployee(id, obj);
    return resp.status(200).send("Updated");
  } catch (err) {
    return resp.status(500).send(err);
  }
});

router.route("/:id").delete(verifyToken, async (req, resp) => {
  if (!isAuthorized(req.employee.permissions, process.env.ADMIN)) {
    return resp.status(401).send("Unauthorized");
  }
  const id = req.params.id;
  try {
    await employeeBL.deleteEmployee(id);
    return resp.status(200).send("Deleted");
  } catch (err) {
    return resp.status(500).send(err);
  }
});

module.exports = router;
