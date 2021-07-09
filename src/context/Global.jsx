import React from "react"
import { useContext,useReducer,createContext } from "react"
import yt from "../data/yt.js";

const GlobalContext = createContext({});

const reducer = (state,action)=>{
    switch (action.type){
        case "SET_SEARCH":
            return{...state,search:action.payload};
        case "SET_DATA":
            return{...state,data:action.payload};
        case "SET_VIDEO":
            return{...state,video:action.payload};
        case "SET_MODAL_VISIBLE":
            return{...state,modalVisible:action.payload};
        case "SET_THEME":
            return{...state,theme:action.payload}
        case "SET_FAVORITE":
            return{...state,favorites:action.payload}
        case "SET_FAV_VISIBLE":
            return{...state,favVisible:action.payload}
        default:
            return state;
    }
}

const initialState = {
    search: 'Wizeline',
    data: yt.items,
    video:{
        title:"",
        url:"",
        description:""
      },
    modalVisible:false,
    favVisible:false,
    theme:"primary",
    favorites:[]
}

function useGlobal(){
    const context = useContext(GlobalContext);
    return context
}

function GlobalProvider({children}) {
    const [state,dispatch] = useReducer(reducer,initialState)

    return (
        <GlobalContext.Provider
          value={{
            state,
            dispatch
          }}
        >
          {children}
        </GlobalContext.Provider>
      );
}

export { useGlobal };
export default GlobalProvider;