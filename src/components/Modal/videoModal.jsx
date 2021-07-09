import React from "react"
import styled from "styled-components"
import he from "he"
import { useGlobal } from "../../context/Global";

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 1;
  margins:auto;
  width: 100%;
  height: 100%; 
  overflow: hidden;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
`


const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 1% auto;
  padding: 2em;
  border: 1px solid #888;
  width: 80vw;
`

const MyIframe = styled.iframe`
  display: block;
  background: #000;
  border: none;
  height: 80vh;
  max-height: 40vw;
  width: 80vw;
  max-width:100%;
`


function VideoModal ({title,url,description,closeAction,thumbnail,vidID}){
    // console.log(`Modal loaded with video ${title}`)
    const {state,dispatch} = useGlobal()
    function addFav(){
      dispatch({type:"SET_FAVORITE",payload:[...state.favorites,{title:title,url:url,description:description,thumbnail:thumbnail,id:vidID}]})

    }

    function removeFav(){
      let newFav = state.favorites.filter((fav)=>fav.url!==url)
      dispatch({type:"SET_FAVORITE",payload:newFav})
    }
    var inFav = state.favorites.some((fav) => fav.url===url)
    console.log({url})
    console.log(state.favorites)
    console.log({inFav})
    return (
        <ModalWrapper data-testid="modal">
            <ModalContent>
            <button className="close" onClick={closeAction} style={{float:"right"}}>X</button>
            <h1 className="title" >{he.decode(title)}</h1>
            <div className="content">
                <MyIframe
                  src={`https://www.youtube.com/embed/${url}`}
                  title={title}
                />
              <p className="description">{description}</p>
              {!inFav && <button className="addFav" onClick={addFav}>Add to Favorites</button>}
              {inFav && <button className="removeFav" onClick={removeFav}>Remove from Favorites</button>}
              <button className="close" onClick={closeAction}>Close</button>
            </div>
            </ModalContent>
        </ModalWrapper>
      );
}

export default VideoModal