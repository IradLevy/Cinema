/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import EmployeesPage from "./pages/EmployeesPage";
import MoviesPage from "./pages/MoviesPage";
import ClientsPage from "./pages/ClientsPage";
import EditEmployee from "./components/EmployeesComponents/EditEmployee";
import AddEmployee from "./components/EmployeesComponents/AddEmployee";
import EditMovie from "./components/MoviesComponents/EditMovie";
import AddMovie from "./components/MoviesComponents/AddMovie";
import EditClient from "./components/ClientsComponents/EditClient";
import AddClient from "./components/ClientsComponents/AddClient";
import SubscribeToMovie from "./components/ClientsComponents/SubscribeToMovie";
import Register from "./pages/Register";
import { useDispatch } from 'react-redux'
import { setLogInState, setPermissions } from "./redux/action";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLogInState(localStorage.getItem('isLoggedIn')))
    dispatch(setPermissions(localStorage.getItem('permissions')))
  }, []);

  return (
    <div>
      <NavBar />
      
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/register" element={<Register />} />

        <Route path="/movies" element={<MoviesPage />} /> 
        <Route path="/movies/:MovieId" element={<EditMovie />} /> 
        <Route path="/movies/add" element={<AddMovie />} /> 

        <Route path="/clients" element={<ClientsPage />} /> 
        <Route path="/clients/:ClientId" element={<EditClient />} /> 
        <Route path="/clients/add" element={<AddClient />} /> 
        <Route path="/subscribe/:ClientId" element={<SubscribeToMovie />} /> 

        <Route path="/employees" element={<EmployeesPage />} /> 
        <Route path="/employees/:EmployeeId" element={<EditEmployee />} /> 
        <Route path="/employees/add" element={<AddEmployee />} />
        
      </Routes>
    </div>
  );
}

export default App;
