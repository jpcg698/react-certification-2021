import React from "react";
//import { useState } from "react";
import { Navbar, Button, Form, FormControl } from "react-bootstrap";
import { useGlobal } from "../../context/Global.jsx";
import { Link, useLocation } from "react-router-dom";
function Header({ passSearch }) {
  let location = useLocation();
  var buttonTheme = "primary";
  //const [search,setSearch] = useState("Wizeline")
  const { state, dispatch } = useGlobal();
  const logedIn = Boolean(state.user.id);
  function manageDark() {
    var nextTheme = state.theme === "primary" ? "dark" : "primary";
    buttonTheme = state.theme === "primary" ? "primary" : "dark";
    console.log(buttonTheme);
    dispatch({ type: "SET_THEME", payload: nextTheme });
  }
  function logOut() {
    dispatch({ type: "SET_USER", payload: {} });
  }
  return (
    <Navbar bg={state.theme}>
      <Navbar.Brand>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            passSearch();
          }}
        >
          <FormControl
            type="text"
            placeholder="Wizeline"
            className=" mr-sm-2"
            onChange={(e) =>
              dispatch({ type: "SET_SEARCH", payload: e.target.value })
            }
          />
        </form>
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Link to={{ pathname: "/fav", state: { background: location } }}>
          {logedIn && (
            <Button
              variant={buttonTheme}
              id="favoriteButton"
              style={{ marginRight: "20px", border: "1px solid black" }}
            >
              Favorites
            </Button>
          )}
        </Link>
        <Button
          variant={state.theme === "primary" ? "dark" : "primary"}
          id="darkmode"
          onClick={manageDark}
          style={{ marginRight: "20px" }}
        >
          Darkmode
        </Button>
        <br />

        <Link to={{ pathname: "/login", state: { background: location } }}>
          {!logedIn && (
            <Button
              variant={buttonTheme}
              id="favoriteButton"
              style={{ marginRight: "20px", border: "1px solid black" }}
            >
              Login
            </Button>
          )}
        </Link>
        {logedIn && (
          <Button
            variant={buttonTheme}
            id="favoriteButton"
            style={{ marginRight: "20px", border: "1px solid black" }}
            onClick={logOut}
          >
            Logout
          </Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
