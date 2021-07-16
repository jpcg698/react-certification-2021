import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import Home from "../home/home.jsx";
import fav from "../FavoriteModal/favModal";
import login from "../LoginModal/loginModal";
import { useEffect } from "react";

const API_KEY = process.env.REACT_APP_API_KEY_YT;
function start() {
  // 2. Initialize the JavaScript client library.
  window.gapi.client.init({
    apiKey: API_KEY
  });
}
export default function Routes() {
  useEffect(()=>{
    window.gapi.load("client", start);
    console.log("Client loaded");
  })
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Switch location={background || location}>
        <Route exact path="/" component={Home} />
        <Route path="/fav" component={login} />
        <Route path="/login" component={login} />
      </Switch>
      {background && <Route path="/fav" component={fav} />}
      {background && <Route path="/login" component={login} />}
    </>
  );
}
