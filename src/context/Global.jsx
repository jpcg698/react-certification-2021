import React from "react"
import { useContext,useReducer,createContext,useEffect } from "react"
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
        case "SET_USER":
            return{...state,user:action.payload}
        case 'SET_STATE':
            return { ...action.payload };
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
    favorites:[],
    user:{},
}

function useGlobal(){
    const context = useContext(GlobalContext);
    return context
}   

function GlobalProvider({children}) {
    const myStorage = window.localStorage
    const [state,dispatch] = useReducer(reducer,initialState)
    

    useEffect(()=>{
        myStorage.setItem("state", JSON.stringify(state))
    },[state])

    function getStorage(){
        //console.log(myStorage.getItem("state"))
        const storageState = JSON.parse(myStorage.getItem("state"))
        //console.log({storageState})
        dispatch({type:"SET_STATE",payload:storageState||initialState})
    }
    return (
        <GlobalContext.Provider
          value={{
            state,
            dispatch,
            getStorage
          }}
        >
          {children}
        </GlobalContext.Provider>
      );
}

export { useGlobal };
export default GlobalProvider;