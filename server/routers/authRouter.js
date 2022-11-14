const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const employeeBL = require("../BL/employeeBL");
const { execute } = require("../connection/database");

router.route("/register").post(async (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    return res.status(400).send("missing some info");
  }
  try {
    const result = await execute(`
        SELECT * From employees Where email='${email}'
        `);
    if (result.length < 0) {
      return res.status(400).send("email does not exist");
    }
  } catch (err) {
    return res.status(500).send(err);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await execute(`
        UPDATE employees SET password='${hashedPassword}' Where email='${email}'
        `);
    return res.status(200).send("Registered");
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;
  try {
    const employee = await execute(
      `SELECT * From employees Where email='${email}'`
    );
    if (employee.length === 0) {
      return res.status(400).send("Wrong email or password");
    }
    if (!(await bcrypt.compare(password, employee[0].password))) {
      return res.status(400).send("Wrong email or password");
    }

    const permissions = await employeeBL.getEmployeePermissions(employee[0].id);

    const token = jwt.sign(
      {
        id: employee[0].id,
        email: employee[0].email,
        firstname: employee[0].firstname,
        lastname: employee[0].lastname,
        permissions: permissions,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: employee[0].sessiontimeout + "m" }
    );

    return res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send(token);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.route("/logout").get((req, res) => {
  try {
    return res
      .cookie("access_token", "", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        expires: new Date(),
        maxAge: 1,
      })
      .status(200)
      .send("cookie deleted");
  } catch (err) {
    return err;
  }
});

module.exports = router;
