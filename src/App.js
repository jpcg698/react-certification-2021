// import logo from './logo.svg';
// import './App.css';
import styled from "styled-components";
import Header from "./components/header/header.jsx";
import VideoCard from "./components/videocard/videocard.jsx";
import Modal from "./components/Modal/modal.jsx";
//import "./css/index.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useGlobal } from "./context/Global.jsx";
const GridWrapper = styled.div`
  display: grid;
  column-gap: 1rem;
  row-gap: 3rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const Cards = styled.div`
  display: flex;
  max-width: 300px;
  margin: auto;
  text-align: center;
  padding: 0.5fr;
  border: 1px solid black;
`;

const API_KEY = process.env.REACT_APP_API_KEY_YT;

function App() {
  // const [data,setData] = useState(js.items)
  // const [video,setVideo] = useState({
  //   title:"",
  //   url:"",
  //   description:""
  // // })

  // const [modalVisible,setModalVisible] = useState(false)

  const showModal = (info) => {
    //setModalVisible(true)
    dispatch({ type: "SET_MODAL_VISIBLE", payload: true });
    // setVideo(data)
    dispatch({ type: "SET_VIDEO", payload: info });
  };

  const { state, dispatch } = useGlobal();

  var VideoList = state.data
    .filter((vid) => vid.id.kind === "youtube#video")
    .map((vid) => (
      <Cards key={vid.id.videoId} className="cards">
        <VideoCard
          thumbnail={vid.snippet.thumbnails.high.url}
          title={vid.snippet.title}
          url={vid.id.videoId}
          description={vid.snippet.description}
          kind={vid.id.kind}
          showModal={showModal}
        />
      </Cards>
    ));

  function start() {
    // 2. Initialize the JavaScript client library.
    window.gapi.client.init({
      apiKey: API_KEY,
    });
  }

  function execute() {
    // 3. Initialize and make the API request.
    return window.gapi.client
      .request({
        path: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${state.search}`,
      })
      .then(
        function (response) {
          //setData(response.result.items)
          dispatch({ type: "SET_DATA", payload: response.result.items });
        },
        function (reason) {
          console.log("Error: " + reason.result.error.message);
        }
      );
  }

  function closeModal() {
    console.log("modal is closing");
    //setModalVisible(false)
    dispatch({ type: "SET_MODAL_VISIBLE", payload: false });
  }

  useEffect(() => {
    window.gapi.load("client", start);
    console.log("Client loaded");
  }, []);

  return (
    <div>
      {state.modalVisible && (
        <Modal {...state.video} closeAction={closeModal} />
      )}
      <Header passSearch={() => execute()} />
      <GridWrapper>{VideoList}</GridWrapper>
    </div>
  );
}

export default App;
