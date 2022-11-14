import React from "react";
import axios from "axios";
import SubscriptionMovie from "./SubscriptionMovie";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setLogInState } from "../../redux/action";
import "./ClientStyle.css";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const ClientCard = (props) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const permissions = useSelector((state) => state.permissions);

  const url = `http://127.0.0.1:8000/clients/${props.id}`;

  const handleDelete = async () => {
    try {
      const resp = await axios.delete(url, { withCredentials: true });
      console.log(resp.data);
      props.state(!props.render);
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

  return (
    <div className="card">
      <Card className={classes.root} id="MuiPaper-elevation1">
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="subtitle2" component="p">
            Email: {props.email}
          </Typography>
          <Typography variant="subtitle2" component="p">
            City: {props.city}
          </Typography>
        </CardContent>
        <SubscriptionMovie id={props.id} />
        <CardActions className="buttons-div">
          { (permissions.includes("update_subscriptions") || 
          permissions.includes("admin")) &&
          <Button
            style={{ color: "#ff4055" }}
            onClick={() => navigate(`/clients/${props.id}`)}
            variant="outlined"
            color="secondary"
          >
            Edit
          </Button>}
          { (permissions.includes("delete_subscriptions") || 
          permissions.includes("admin")) &&
          <Button
            style={{ backgroundColor: "#ff4055" }}
            variant="contained"
            color="secondary"
            onClick={handleDelete}
          >
            Delete
          </Button>}
        </CardActions>
      </Card>
    </div>
  );
};

export default ClientCard;
