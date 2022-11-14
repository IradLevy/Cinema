const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        return res.status(401).send(err);
      }
      req.employee = payload;
      next()
    });
  } catch {
    return res.sendStatus(403);
  }
};

const isAuthorized = (employeePermission, neededPermission) => {
    if (employeePermission.includes(neededPermission) || employeePermission.includes(process.env.ADMIN)) {
        return true
    } 
    return false
}

module.exports = { verifyToken, isAuthorized };
