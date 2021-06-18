// import logo from './logo.svg';
// import './App.css';
import styled from "styled-components"
import Header from './components/header/header.jsx';
import VideoCard from "./components/videocard/videocard.jsx"
//import "./css/index.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import js from "../src/data/yt";
import { useEffect, useState } from "react";

const GridWrapper = styled.div`
display:grid;
column-gap:1rem;
row-gap: 3rem;
grid-template-columns:repeat(auto-fit, minmax(300px, 1fr))
`


const Cards = styled.div`
display:flex;
max-width:300px;
margin: auto;
text-align:center;
padding:0.5fr;
border:1px solid black
`


function App() {
  const [data,setData] = useState(js.items)
  var VideoList = data.filter(vid => (vid.id.kind === "youtube#video")).map((vid)=>(
    <Cards key={vid.id.videoId} className="cards">
      <VideoCard 
      thumbnail={vid.snippet.thumbnails.high.url} 
      title={vid.snippet.title} url={vid.id.videoId} 
      description={vid.snippet.description}
      kind={vid.id.kind}
      />
    </Cards>
  ));

  // function start() {
  //   // 2. Initialize the JavaScript client library.
  //   window.gapi.client.init({
  //     'apiKey': "AIzaSyDHYuXbei8FcFwG52FQS6_Ad66aH0e5YHA",
  //     // // clientId and scope are optional if auth is not required.
  //     // 'clientId': 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  //     // 'scope': 'profile',
  //   }).then(function() {
  //     // 3. Initialize and make the API request.
  //     return window.gapi.client.request({
  //       'path': `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=Wizeline`,
  //     })
  //   }).then(function(response) {
  //     console.log(response.result);
  //     setData(response.result.items)
  //   }, function(reason) {
  //     console.log('Error: ' + reason.result.error.message);
  //   });
  // };
  
  function start(q="Wizeline") {
    // 2. Initialize the JavaScript client library.
    window.gapi.client.init({
      'apiKey': "AIzaSyDHYuXbei8FcFwG52FQS6_Ad66aH0e5YHA",
      // // clientId and scope are optional if auth is not required.
      // 'clientId': 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
      // 'scope': 'profile',
    })
  };

  function execute( q= "Wizeline") {
    // 3. Initialize and make the API request.
    return window.gapi.client.request({
      'path': `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${q}`,
    }).then(function(response) {
    console.log(response.result);
    console.log({q})
    setData(response.result.items)
  }, function(reason) {
    console.log('Error: ' + reason.result.error.message);
  });
  }
  
  useEffect(() => {
    window.gapi.load('client', start);
    console.log("Client loaded")
  }, []);



  return (
    <div>
        <Header passSearch={searchVal =>execute(searchVal)}/>
      <GridWrapper>
          {VideoList}
      </GridWrapper>
    </div>
  );
}

export default App;
