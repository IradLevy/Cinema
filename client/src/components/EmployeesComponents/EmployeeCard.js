import React from "react";
import axios from "axios";
import EmployeePermissions from "./EmployeePermissions";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
import { setLogInState } from "../../redux/action";
import { useSelector } from "react-redux";
import "./EmployeesStyle.css"

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

const EmployeeCard = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const classes = useStyles();
    const permissions = useSelector((state) => state.permissions);

    const deleteUrl = `http://127.0.0.1:8000/employees/${props.id}`;

    const handleDelete = async () => {
      try{
        const resp = await axios.delete(deleteUrl, { withCredentials: true })
        console.log(resp.data);
        props.state(!props.render)
      } catch (err) {
          if (err.response.status === 401) {
            dispatch(setLogInState(false));
            localStorage.setItem("isLoggedIn", false);
            localStorage.setItem("permissions", []);
            navigate("/");
          }
          console.log(err);
        }
      }

 return (
    <div className="card">
      <Card className={classes.root} id="MuiPaper-elevation1">
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.firstname} {props.lastname}
          </Typography>
          <Typography variant="subtitle2" component="p">
            Email: {props.email}
          </Typography>
          <Typography variant="subtitle2" component="p">
            Session Time Out (minutes): {props.sessionTimeOut}
          </Typography>
          <Typography variant="subtitle2" component="p">
            Created At: {props.createdAt.slice(0, 10)}
          </Typography>
        </CardContent>
        <EmployeePermissions id={props.id}/>
        <CardActions className="card-actions ">
          
        { permissions.includes("admin") &&
        <Button style={{ color: "#ff4055" }} onClick={() => navigate(`/employees/${props.id}`)} variant="outlined" color="secondary">
          Edit
        </Button> }

        { permissions.includes("admin") &&
        <Button style={{ backgroundColor: "#ff4055" }} onClick={handleDelete} variant="contained" color="secondary">
          Delete
        </Button>}

        </CardActions>
      </Card>
    </div>
 )
}

export default EmployeeCard;
