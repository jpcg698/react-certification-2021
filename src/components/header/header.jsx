import React from "react";
//import { useState } from "react";
import {Navbar,Button,Form,FormControl,Nav} from "react-bootstrap";
import {useGlobal} from "../../context/Global.jsx"

function Header({passSearch}){
    var buttonTheme = "primary"
    //const [search,setSearch] = useState("Wizeline")
    const { state, dispatch } = useGlobal();

    function manageDark(){
        var nextTheme = state.theme==="primary"?"dark":"primary"
        buttonTheme = state.theme==="primary"?"primary":"dark"
        console.log(buttonTheme)
        dispatch({type:"SET_THEME",payload:nextTheme})
    }

    return(
            <Navbar bg={state.theme}>
                <Navbar.Brand>
                <form onSubmit={(event)=> {
                    event.preventDefault()
                    passSearch()}}>
                    <FormControl type="text" placeholder="Wizeline" className=" mr-sm-2" onChange={(e)=> dispatch({type:"SET_SEARCH",payload:e.target.value})}/>
                </form>
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Button variant={state.theme==="primary"?"dark":"primary"} id="darkmode" onClick={manageDark} style={{marginRight:"20px"}}> 
                            Darkmode  
                    </Button>
                    <br/>
                   <Form inline>
                        <Button variant={buttonTheme} style={{border:"1px solid black"}} id="Login">
                            Login
                        </Button>
                    </Form>
                    
                </Navbar.Collapse>
            </Navbar>
    )
}

export default Header