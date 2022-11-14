/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ClientsList from "../components/ClientsComponents/ClientsList";
import { useDispatch } from "react-redux";
import { setLogInState } from "../redux/action";

const ClientsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [clients, setClients] = useState([]);
  const [doRender, setDoRender] = useState(true);

  const clientsUrl = "http://127.0.0.1:8000/clients";

  const getAllClients = async () => {
    try {
      const resp = await axios.get(clientsUrl, { withCredentials: true });
      setClients(resp.data);
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
    const getClients = async () => {
      await getAllClients();
    };
    getClients();
  }, []);

  useEffect(() => {
    const getData = async () => {
      await getAllClients();
    };
    getData();
  }, [doRender]);

  return (
    <div>
      <ClientsList clients={clients} render={doRender} state={setDoRender} />
    </div>
  );
};

export default ClientsPage;
