import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogInState } from "../redux/action";
import { useSelector } from "react-redux";
import "./NavBarStyle.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const permissions = useSelector((state) => state.permissions);

  const logout = async () => {
    const resp = await axios.get("http://127.0.0.1:8000/auth/logout", {
      withCredentials: true,
    });

    console.log(resp.data);
    dispatch(setLogInState(false));
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("permissions", []);
    navigate("/");
  };

  const handleOnClickMobile = (link) => {
    navigate(link);
    setIsDrawerOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "#ff4055" }}>
        <Toolbar>
          <IconButton
            onClick={() => setIsDrawerOpen(true)}
            id="hamburgerMenu"
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h4" className={classes.title}>
            Cinema
          </Typography>
          {window.location.pathname === "/clients" && 
          (permissions.includes("create_subscriptions") ||
          permissions.includes("admin")) &&
          (
            <Button
              className="menuButtons"
              onClick={() => navigate("/clients/add")}
              color="inherit"
            >
              Add Client
            </Button>
          )}
          {window.location.pathname === "/movies" &&
            (permissions.includes("create_movies") ||
              permissions.includes("admin")) && 
              (
              <Button
                className="menuButtons"
                onClick={() => navigate("/movies/add")}
                color="inherit"
              >
                Add Movie
              </Button>
            )}
          {window.location.pathname === "/employees" && (
            <Button
              className="menuButtons"
              onClick={() => navigate("/employees/add")}
              color="inherit"
            >
              Add Employee
            </Button>
          )}
          {isLoggedIn &&
            (permissions.includes("view_movies") ||
              permissions.includes("admin")) && (
              <Button
                className="menuButtons"
                onClick={() => navigate("/movies")}
                color="inherit"
              >
                Movies
              </Button>
            )}
          {isLoggedIn &&
            (permissions.includes("view_subscriptions") ||
              permissions.includes("admin")) && (
              <Button
                className="menuButtons"
                onClick={() => navigate("/clients")}
                color="inherit"
              >
                Clients
              </Button>
            )}
          {isLoggedIn && permissions.includes("admin") && (
            <Button
              className="menuButtons"
              onClick={() => navigate("/employees")}
              color="inherit"
            >
              Employees
            </Button>
          )}
          
          {isLoggedIn === true && (
            <Button className="menuButtons" onClick={logout} color="inherit">
              Log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <List className={classes.drawer}>
          {window.location.pathname === "/movies" &&
            (permissions.includes("create_movies") ||
              permissions.includes("admin")) && (
              <ListItem
                button
                onClick={() => handleOnClickMobile("/movies/add")}
              >
                <ListItemText primary="Add Movie" />
              </ListItem>
            )}

          {window.location.pathname === "/clients" &&
            (permissions.includes("create_subscriptions") ||
              permissions.includes("admin")) && (
              <ListItem
                button
                onClick={() => handleOnClickMobile("/clients/add")}
              >
                <ListItemText primary="Add Client" />
              </ListItem>
            )}

          {window.location.pathname === "/employees" &&
            permissions.includes("admin") && (
              <ListItem
                button
                onClick={() => handleOnClickMobile("/employees/add")}
              >
                <ListItemText primary="Add Employee" />
              </ListItem>
            )}
          {isLoggedIn &&
            (permissions.includes("view_movies") ||
              permissions.includes("admin")) && (
              <ListItem button onClick={() => handleOnClickMobile("/movies")}>
                <ListItemText primary="Movies" />
              </ListItem>
            )}

          {isLoggedIn &&
            (permissions.includes("view_subscriptions") ||
              permissions.includes("admin")) && (
              <ListItem button onClick={() => handleOnClickMobile("/clients")}>
                <ListItemText primary="Clients" />
              </ListItem>
            )}

          {isLoggedIn && permissions.includes("admin") && (
            <ListItem button onClick={() => handleOnClickMobile("/employees")}>
              <ListItemText primary="Employees" />
            </ListItem>
          )}

          {isLoggedIn && (
            <ListItem button>
              <ListItemText onClick={logout} primary="Logout" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </div>
  );
}
