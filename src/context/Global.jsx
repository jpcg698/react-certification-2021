import React from "react";
import { useContext, useReducer, createContext, useEffect } from "react";
import yt from "../data/yt.js";

const GlobalContext = createContext({});

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_DATA":
      return { ...state, data: action.payload };
    case "SET_VIDEO":
      return { ...state, video: action.payload };
    case "SET_MODAL_VISIBLE":
      return { ...state, modalVisible: action.payload };
    case "SET_THEME":
      return { ...state, theme: action.payload };
    case "SET_FAVORITE":
      return { ...state, favorites: action.payload };
    case "SET_FAV_VISIBLE":
      return { ...state, favVisible: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_STATE":
      return { ...action.payload };
    case "SET_RELATED":
      return{...state, related:action.payload}
    default:
      return state;
  }
};

const initialState = {
  search: "Wizeline",
  data: yt.items,
  related: yt.items,
  video: {
    title: "",
    url: "",
    description: "",
  },
  modalVisible: false,
  favVisible: false,
  theme: "primary",
  favorites: [],
  user: {},
  
};

function useGlobal() {
  const context = useContext(GlobalContext);
  return context;
}

function GlobalProvider({ children }) {
  const myStorage = window.localStorage;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    myStorage.setItem("fav", JSON.stringify(state.favorites));
    myStorage.setItem("user", JSON.stringify(state.user));
  }, [state.favorites]);

  function getStorage() {
    //console.log(myStorage.getItem("state"))
    const favState = JSON.parse(myStorage.getItem("fav"));
    const userState = JSON.parse(myStorage.getItem("user"));
    //console.log({storageState})
    dispatch({ type: "SET_FAVORITE", payload: favState || initialState });
    dispatch({ type: "SET_USER", payload: userState || initialState });
  }
  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
        getStorage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export { useGlobal };
export default GlobalProvider;
