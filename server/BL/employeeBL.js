const { execute } = require("../connection/database");

// get all employees except the admin
const getAllEmployees = async () => {
  try {
    const employees = await execute(
      "SELECT id, email, firstname, lastname, createddate, sessiontimeout from employees"
    );

    return employees.filter(e => e.id !== 1);
  } catch (err) {
    return err;
  }
};

const getEmployeeById = async (id) => {
  try {
    const employee = await execute(
      `SELECT email, firstname, lastname, createddate, sessiontimeout from employees Where id=${id}`
    );
    employee[0].permissions = await getEmployeePermissions(id);
    return employee;
  } catch (err) {
    return err;
  }
};

const getEmployeePermissions = async (id) => {
  try {
    const permissionsSql = await execute(`
    SELECT p.name as permission from permissions p
    Join employees_permissions ep ON p.id=ep.permission_id AND ep.employee_id=${id}
    Join employees e ON e.id=${id}
    `);
    const permissions = [];
    for (let i = 0; i < permissionsSql.length; i++) {
      permissions.push(permissionsSql[i].permission);
    }

    return permissions;
  } catch (err) {
    return err;
  }
};

const addEmployee = async (obj) => {
  try {
    const { email, firstname, lastname, sessiontimeout } = obj;
    let date = new Date();

    await execute(
      `INSERT INTO employees (email, firstname, lastname, createddate, sessiontimeout)
         VALUES (
        '${email}',
        '${firstname}',
        '${lastname}',
        '${date.toISOString().split("T")[0]}',
        ${sessiontimeout})`
    );

    const id = await execute(`SELECT LAST_INSERT_ID() as id`);
    if (obj.permissions.length > 0) {
      for (let i = 0; i < obj.permissions.length; i++) {
        await execute(
          `INSERT INTO employees_permissions (employee_id, permission_id)
              VALUES (${id[0].id}, ${obj.permissions[i]})`
        );
      }
    } else {
      await execute(
        `INSERT INTO employees_permissions (employee_id, permission_id)
            VALUES (${id[0].id}, 1)`
      );
    }
  } catch (err) {
    return err;
  }
};

const updateEmployee = async (id, obj) => {
  try {
    const { email, firstname, lastname, sessiontimeout } = obj;

    await execute(
      `UPDATE employees SET email='${email}', firstname='${firstname}', lastname='${lastname}', sessiontimeout=${sessiontimeout} Where id=${id}`
    );

    await execute(`
    DELETE From employees_permissions Where employee_id=${id}
    `);

    for (let i = 0; i < obj.permissions.length; i++) {
      await execute(
        `INSERT INTO employees_permissions (employee_id, permission_id)
            VALUES (${id}, ${obj.permissions[i]})`
      );
    }
  } catch (err) {
    return err;
  }
};

const deleteEmployee = async (id) => {
  try {
    await execute(`DELETE From employees_permissions Where employee_id=${id}`);
    await execute(`DELETE From employees Where id=${id}`);
  } catch (err) {
    return err;
  }
};

const getEmployeeEmail = async (email) => {
  try {
    const emails = await execute(`
    SELECT * From employees Where email='${email}'
    `);
    return emails;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeePermissions,
  getEmployeeEmail
};
