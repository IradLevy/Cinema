/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmployeesList from "../components/EmployeesComponents/EmployeesList";
import { useDispatch } from "react-redux";
import { setLogInState } from "../redux/action";

const EmployeesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [employees, setEmployees] = useState([]);
  const [doRender, setDoRender] = useState(true)

  const employeesUrl = "http://127.0.0.1:8000/employees";

  const getAllEmployees = async () => {
    try {
      const resp = await axios.get(employeesUrl, { withCredentials: true });
      setEmployees(resp.data);
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(setLogInState(false));
        localStorage.setItem("isLoggedIn", false);
        localStorage.setItem("permissions", []);
        navigate("/");
      }
      console.log(err);
    }
  };

  useEffect(() => {
    const getEmployees = async () => {
      await getAllEmployees();
    };
    getEmployees();
  }, []);

  useEffect(() => {
    const getEmployees = async () => {
      await getAllEmployees();
    };
    getEmployees();
  }, [doRender]);

  return (
    <div>
      <EmployeesList employees={employees} render={doRender} state={setDoRender}/>
    </div>
  );
};

export default EmployeesPage;
