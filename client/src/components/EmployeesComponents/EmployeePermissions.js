/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLogInState } from "../../redux/action";
import "./EmployeesStyle.css"

const EmployeePermissions = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [permissions, setPermissions] = useState({employeeId: 0, name: []});

  const url = "http://127.0.0.1:8000/employees/";

  const getEmployeePermissions = async (id) => {
    try {
      const resp = await axios.get(url + `${id}/permissions`, {
        withCredentials: true,
      });
      const employeePermissions = resp.data;

      const permissionArr = []

      employeePermissions.forEach(per => {
        permissionArr.push(per)
      })

      if (employeePermissions.length > 0) {
        setPermissions(
          { employeeId: id, name: permissionArr },
        );
      }
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(setLogInState(false));
        localStorage.setItem("isLoggedIn", false);
        localStorage.setItem("permissions", []);
        navigate('/')
     } 
     console.log(err);
    }
  };

  useEffect(() => {
    const getPermissions = async () => {
      await getEmployeePermissions(props.id);
    };
    getPermissions();
  }, []);

  return (
    <div>
      <h5>Permissions:</h5>
      <ul className="permissions-list">
      {permissions.name?.map((per, index) => {
            return (
                <li key={index}>{per}</li>
            )
      })}
      </ul>
    </div>
  );
};

export default EmployeePermissions;
