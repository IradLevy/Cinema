/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLogInState } from "../../redux/action";
import "./MoviesStyle.css";

const MovieSubscriptions = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [subs, setSubs] = useState([]);

  const subsUrl = "http://127.0.0.1:8000/movies/";

  const getSubs = async (id) => {
    try {
      const resp = await axios.get(subsUrl + `${id}/watchers`, {
        withCredentials: true,
      });
      const subscriptions = resp.data;
      if (subscriptions.length > 0) {
        setSubs([
          ...subs,
          { movieId: id, name: subscriptions[0].client_watched },
        ]);
      }
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
    const getAllClients = async () => {
      await getSubs(props.id);
    };
    getAllClients();
  }, []);

  return (
    <div>
      {subs.length > 0 ? (
        <h5>Who Subscribed:</h5>
      ) : (
        <h5>No subscriptions yet</h5>
      )}
      <div>
        <ul className="watchers-list">
          {subs.length > 0 &&
            subs.map((sub, index) => {
              return (
                <li key={index}>
                  {sub.name}
                  <br />
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default MovieSubscriptions;
