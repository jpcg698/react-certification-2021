import React from "react";
import styled from "styled-components";
import he from "he";
import { useGlobal } from "../../context/Global";
import { useEffect } from "react";
import VideoCard from "../videocard/videocard.jsx";

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 1;
  margins: auto;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

const VideoGridWrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  column-gap: 1rem;
`;

const ModalContent = styled.div`
  background: ${(props) => props.theme.background};
  margin: 1% auto;
  padding: 2em;
  border: 1px solid #888;
  width: 80vw;
`;


const MyIframe = styled.iframe`
  display: block;
  background: #000;
  border: none;
  height: 80vh;
  max-height: 40vw;
  width: 80vw;
  max-width: 100%;
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

const RelatedBody = styled.div`
  display: block;
  background: ${(props) => props.theme.background};
  margin: 5% auto;
  padding: 1em;
  border: 1px solid #888;
  min-height: 30vw;
  max-height: 92vh;
  overflow-y: auto;
`;

const API_KEY = process.env.REACT_APP_API_KEY_YT;
function VideoModal({
  title,
  url,
  description,
  closeAction,
  thumbnail,
  vidID,
}) {
  function start() {
    // 2. Initialize the JavaScript client library.
    window.gapi.client.init({
      apiKey: API_KEY
    });
  }
  const { state, dispatch } = useGlobal();
  useEffect(() => {
    start()
    const execute = () => {
      return window.gapi.client
        .request({
          path: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&relatedToVideoId=${state.video.url}&type=video`,
        })
        .then(
          function (response) {
            //setData(response.result.items)
            dispatch({ type: "SET_RELATED", payload: response.result.items });
          },
          function (reason) {
            console.log("Error: " + reason.result.error.message);
          }
        );
    };
    execute();
  }, []);




  const showModal = (info) => {
    dispatch({ type: "SET_VIDEO", payload: info });
    const execute = () => {
      return window.gapi.client
        .request({
          path: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&relatedToVideoId=${state.video.url}&type=video`,
        })
        .then(
          function (response) {
            //setData(response.result.items)
            dispatch({ type: "SET_RELATED", payload: response.result.items });
          },
          function (reason) {
            console.log("Error: " + reason.result.error.message);
          }
        );
    };
    execute();

  };

  var VideoList = state.related
    .filter((vid) => vid.id.kind === "youtube#video")
    .map((vid) => 
    {console.log(vid.snippet)
    return(

      <Cards key={vid.id.videoId} className="cards">
        <VideoCard
          vidId={vid.id.videoId}
          thumbnail={vid.snippet.thumbnails.high.url}
          title={vid.snippet.title}
          url={vid.id.videoId}
          description={vid.snippet.description}
          kind={vid.id.kind}
          showModal={showModal}
        />
      </Cards>
    )});

  function addFav() {
    dispatch({
      type: "SET_FAVORITE",
      payload: [
        ...state.favorites,
        {
          title: title,
          url: url,
          description: description,
          thumbnail: thumbnail,
          id: vidID,
        },
      ],
    });
  }
  const logedIn = Boolean(state.user.id);
  function removeFav() {
    let newFav = state.favorites.filter((fav) => fav.url !== url);
    dispatch({ type: "SET_FAVORITE", payload: newFav });
  }
  var inFav = state.favorites.some((fav) => fav.url === url);
  return (
    <ModalWrapper data-testid="modal">
      <VideoGridWrapper>
        <ModalContent>
          <button
            className="close"
            onClick={closeAction}
            style={{ float: "right" }}
          >
            X
          </button>
          <h1 className="title">{he.decode(title)}</h1>
          <div className="content">
            <MyIframe
              src={`https://www.youtube.com/embed/${url}`}
              title={title}
            />
            <p className="description">{description}</p>

            {logedIn && !inFav && (
              <button className="addFav" onClick={addFav}>
                Add to Favorites
              </button>
            )}
            {logedIn && inFav && (
              <button className="removeFav" onClick={removeFav}>
                Remove from Favorites
              </button>
            )}
            <button className="close" onClick={closeAction}>
              Close
            </button>
          </div>
        </ModalContent>
          <RelatedBody>
            <h2>Related</h2>
            {VideoList}
          </RelatedBody>
      </VideoGridWrapper>
    </ModalWrapper>
  );
}

export default VideoModal;
