import React, { useEffect } from "react";
import socketIOClient from "socket.io-client";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux";
// import {storeStateMiddleWare} from './middleware/storeStateMiddleWare'
// import reducer from './reducers'
import App from "./pages/App";
// import {alert} from './actions/alert'
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./contexts";
import { isAuthenticated, setupAuthentication } from "./services/auth";
// const express = require("express");
// const router = express.Router();

// router.get("/", (req, res) => {
//   res.send({ response: "Its working!!!!" }).status(200);
// });
const socket = socketIOClient("http://localhost:4000");
// module.exports = router;

// const express = require("express");
// const http = require("http");
// const path = require("path");
// const socketIO = require("socket.io");
// const { initListeners } = require("./src/server/listeners/index.js");
// const params = require("./params");

// PROVIDED BOILERPLATE CODE BELOW
// const initialState = {}

// const store = createStore(
//   reducer,
//   initialState,
//   applyMiddleware(thunk, logger())
// )

// TD CODE
// Mise en place de l'authentification (en cas de réactualisation de la page)
setupAuthentication();

const Shell = () => {
  useEffect(() => {
    // connectSocketClient();
  }, []);

  const authState = isAuthenticated();

  console.log("AUTH STATE IN INDEX ==>", authState);

  let authContextValue = {
    isAuthenticated: authState,
  };

  return (
    <>
      <AuthContext.Provider value={authContextValue}>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
};

// PROVIDED BOILERPLATE CODE BELOW
// ReactDom.render((
//   <Provider store={store}>
//     <App/>
//   </Provider>
// ), document.getElementById('tetris'))
// store.dispatch(alert('Soon, will be here a fantastic Tetris ui...'))

ReactDOM.render(<Shell />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// serviceWorker.unregister();
// serviceWorker.register();
