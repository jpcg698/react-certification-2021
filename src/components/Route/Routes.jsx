import React from "react"
import {Route,Switch,useLocation} from "react-router-dom"


import Home from "../home/home.jsx"
import fav from "../FavoriteModal/favModal"
import login from "../LoginModal/loginModal"
export default function Routes() {
  const location = useLocation();
  const background = location.state && location.state.background;

    return (
      <>
        <Switch location={background || location}>
          <Route exact path="/" component={Home}/>
          <Route path="/fav" component={login}/>
          <Route path="/login" component={login}/>
        </Switch>
        {background && <Route path='/fav' component={fav}/>}
        {background && <Route path='/login' component={login}/>}
      </>
    )
  }