import Routes from "./components/Route/Routes.jsx";
import { BrowserRouter as Router } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import {ThemeProvider} from "styled-components"
import { useGlobal } from "./context/Global.jsx";
import Home from "./components/home/home"

const theme={
  dark:{
    background:"grey",
    border: "white",
    cardBG: "#c2b5ae"
  },
  primary:{
    background:"white",
    border: "#007bff",
    cardBG:"white" 
  }
}
function App(){
  const { state } = useGlobal();

  return (
    <ThemeProvider theme ={theme[state.theme]}> 
      <Router>
        <Routes/>
      </Router>
    </ThemeProvider>
  );
  }

export default App;
