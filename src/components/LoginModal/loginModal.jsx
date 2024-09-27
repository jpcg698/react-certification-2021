import React from "react";
import styled from "styled-components";
import { useGlobal } from "../../context/Global";
import { useHistory } from "react-router";
import { useState } from "react";
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


const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 1% auto;
  padding: 2em;
  border: 1px solid #888;
  width: 90vw;
`;

function FavModal({ title, url, description, thumbnail, closeAction, vidID }) {
  // console.log(`Modal loaded with video ${title}`)
  const { dispatch } = useGlobal();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const mockedUser = {
    id: "123",
    name: "Wizeline",
    avatarUrl:
      "https://media.glassdoor.com/sqll/868055/wizeline-squarelogo-1473976610815.png",
  };

  async function loginApi() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "wizeline" && password === "Rocks!") {
          history.push("/");
          return resolve(dispatch({ type: "SET_USER", payload: mockedUser }));
        }
        reject(new Error("Username or password invalid"));
      }, 500);
    }).catch((err) => alert(err));
  }

  const goBack = (event) => {
    event.stopPropagation();
    history.goBack();
  };

  return (
    <ModalWrapper>
      <ModalContent>
        <button className="close" onClick={goBack} style={{ float: "right" }}>
          X
        </button>
        <h1>Login</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            loginApi();
          }}
        >
          <div className="form-group">
            <label htmlFor="username">
              <strong>username </strong>
              <input
                required
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <strong>password </strong>
              <input
                required
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="actions">
            <button type="button" className="ui red button" onClick={goBack}>
              Cancel
            </button>
            <button type="submit" className="ui blue button">
              Login
            </button>
          </div>
        </form>
      </ModalContent>
    </ModalWrapper>
  );
}

export default FavModal;
