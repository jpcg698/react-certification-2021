import React from "react"
import {Route,Switch,Router} from "react-router-dom"


import Home from "../home/home.jsx"

export default function Routes() {
  
    return (
      <>
        <Switch >
          <Route exact path="/" component={Home}/>
        </Switch>
      </>
    )
  }