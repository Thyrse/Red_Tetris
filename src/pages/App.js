import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import { Switch, Route } from "react-router-dom";
import { Layout } from "../Layout";
import Login from "./Login";
import Home from "./Home";
import Game from "./Game";
import socketIOClient from "socket.io-client";
import "../styles/tetris.scss";
import { setUsersList } from "../redux/usersList/action";
import { setRooms } from "../redux/rooms/action";

// import Board from "../pages/Board";

const App = () => {
  const [socket, setSocket] = useState(
    socketIOClient.connect("http://localhost:4000")
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setSocket(socketIOClient.connect("http://localhost:4000"));
    socket.on("REFRESH_USERSLIST", function (data) {
      dispatch(setUsersList(data));
    });

    socket.on("REFRESH_ROOMS", function (data) {
      dispatch(setRooms(data));
    });
  }, []);

  return (
    <>
      <Layout socket={socket}>
        <Switch>
          {/* <Route exact path="/board" render={() => <Board />} /> */}
          <Route
            exact
            path="/"
            render={() => <Login socket={socket} />}
          ></Route>
          <PrivateRoute
            path="/home"
            render={() => <Home socket={socket} />}
          ></PrivateRoute>
          <PrivateRoute
            path="/game"
            render={() => <Game socket={socket} />}
          ></PrivateRoute>
        </Switch>
      </Layout>
    </>
  );
};

export default App;
