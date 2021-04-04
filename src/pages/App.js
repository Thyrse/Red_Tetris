import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import { Switch, Route, useLocation, useParams } from "react-router-dom";
import { Layout } from "../Layout";
import Login from "./Login";
import Home from "./Home";
import Game from "./Game";
import socketIOClient from "socket.io-client";
import "../styles/tetris.scss";
import { AuthContext } from "../contexts";
import { setUsersList } from "../redux/usersList/action";
import { setRooms } from "../redux/rooms/action";

const App = ({ message }) => {
  // const location = useLocation();
  const authContext = useContext(AuthContext);
  const socket = socketIOClient.connect("http://localhost:4000");
  // const withNavbar = location.pathname !== "/";
  // const snackbar = useSnackbar();
  const dispatch = useDispatch();
  // const [id, setId] = useState();
  socket.on("REFRESH_USERSLIST", function (data) {
    console.log("DATA REFRESH ==>", data);
    dispatch(setUsersList(data));
  });

  socket.on("REFRESH_ROOMS", function (data) {
    console.log("DATA REFRESH ==>", data);
    dispatch(setRooms(data));
  });

  return (
    <>
      <Layout socket={socket}>
        <Switch>
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

// const mapStateToProps = (state) => {
//   return {
//     message: state.message
//   }
// }

// export default connect(mapStateToProps, null)(App)

export default App;
