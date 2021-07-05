import React from "react";
//import { useState } from "react";
import {Navbar,Button,Form,FormControl} from "react-bootstrap";
import useGlobal from "../../context/Global"

function Header({passSearch}){

    //const [search,setSearch] = useState("Wizeline")
    const { dispatch } = useGlobal();
    dispatch({type:"SET_SEARCH",payload:"WIzeline"})

    return(
            <Navbar bg="primary" variant ="dark">
                <Navbar.Brand>
                <form onSubmit={(event)=> {
                    event.preventDefault()
                    passSearch()}}>
                    <FormControl type="text" placeholder="Wizeline" className=" mr-sm-2" onChange={(e)=> dispatch({type:"SET_SEARCH",payload:e.target.value})}/>
                </form>
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text id="darmode">
                            Darkmode  
                    </Navbar.Text>
                   <Form inline>
                        <Button id="Login">
                            Login
                        </Button>
                    </Form>
                    
                </Navbar.Collapse>
            </Navbar>
    )
}

export default Header