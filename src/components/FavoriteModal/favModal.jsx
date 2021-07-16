import React from "react";
import styled from "styled-components";
import { useGlobal } from "../../context/Global";
import VideoCard from "../videocard/videocard";
import { useHistory } from "react-router";

const ModalWrapper = styled.div`
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

const GridWrapper = styled.div`
  display: grid;
  column-gap: 1rem;
  row-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  background: ${(props) => props.theme.background};
`;

const Cards = styled.div`
  display: flex;
  max-width: 300px;
  margin: auto;
  text-align: center;
  padding: 0.5fr;
  border: 2px solid ${(props) => props.theme.border};
  background: ${(props) => props.theme.cardBG};
`;

const ModalBody = styled.div`
  background: ${(props) => props.theme.background};
  margin: 1% auto;
  padding: 1em;
  min-height: 30vw;
  max-height: 75vh;
  overflow-y: auto;
`;

const ModalContent = styled.div`
  background: ${(props) => props.theme.background};
  margin: 1% auto;
  padding: 2em;
  border: 1px solid #888;
  width: 90vw;
`;

function FavModal({ title, url, description, thumbnail, closeAction, vidID }) {
  // console.log(`Modal loaded with video ${title}`)
  const { state, dispatch } = useGlobal();

  const showModal = (info) => {
    //setModalVisible(true)
    dispatch({ type: "SET_FAV_VISIBLE", payload: false });
    dispatch({ type: "SET_MODAL_VISIBLE", payload: true });
    // setVideo(data)
    dispatch({ type: "SET_VIDEO", payload: info });
  };

  var VideoList = state.favorites.map((vid) => (
    <Cards key={vid.id} className="cards">
      <VideoCard
        vidID={vid.id}
        thumbnail={vid.thumbnail}
        title={vid.title}
        url={vid.url}
        description={vid.description}
        showModal={showModal}
      />
    </Cards>
  ));

  const history = useHistory();

  const goBack = (event) => {
    event.stopPropagation();
    history.goBack();
  };

  return (
    <ModalWrapper data-testid="modal">
      <ModalContent>
        <div className="modal-header">
          <h2>Favorites!</h2>
          <button className="close" onClick={goBack} style={{ float: "right" }}>
            X
          </button>
        </div>
        <ModalBody>
          <div className="content" key="CONTENT">
            <GridWrapper key="GRID">{VideoList}</GridWrapper>
            <button className="close" onClick={goBack}>
              Close
            </button>
          </div>
        </ModalBody>
      </ModalContent>
    </ModalWrapper>
  );
}

export default FavModal;
