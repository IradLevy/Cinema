import React from "react";
import EmployeeCard from "./EmployeeCard";
import "./EmployeesStyle.css"

const EmployeesList = (props) => {


  return (
    <div className="employees-list">
      {props.employees.map((employee, index) => {
        return (
          <EmployeeCard
            key={index}
            id={employee.id}
            firstname={employee.firstname}
            lastname={employee.lastname}
            email={employee.email}
            sessionTimeOut={employee.sessiontimeout}
            createdAt={employee.createddate}
            render={props.render}
            state={props.state}
          />
        );
      })}
    </div>
  );
};

export default EmployeesList;
