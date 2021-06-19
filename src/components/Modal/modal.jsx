import React from "react"
import styled from "styled-components"
import he from "he"


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
padding: 20px;
border: 1px solid #888;
width: 80%;
height:90%;
`


function Modal ({title,url,description,closeAction}){
    console.log(`Modal loaded with video ${title}`)
    return (
        <ModalWrapper data-testid="modal">
            <ModalContent>
            <h1 className="title">{he.decode(title)}</h1>
            <div className="content">
              <iframe
                width="100%"
                height="700px"
                src={`https://www.youtube.com/embed/${url}`}
                title={title}
              />
              <p className="description">{description}</p>
              <button className="close" onClick={closeAction}>Close</button>
            </div>
            </ModalContent>
        </ModalWrapper>
      );
}

export default Modal