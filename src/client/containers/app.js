import React from 'react'
import { connect } from 'react-redux'
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import { Switch, Route, useLocation, useParams } from "react-router-dom";
import Yolo from "./Yolo/Yolo";

const App = ({message}) => {
  // const location = useLocation();
  // const authContext = useContext(AuthContext);
  // const withNavbar = location.pathname !== "/";
  // const snackbar = useSnackbar();
  // const dispatch = useDispatch();
  // const [id, setId] = useState();

  return (
    <>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Route
        exact
        path="/"
        render={() => <Login playerId={oneSignalUserid} />}
      ></Route>
      <Switch>
        <PrivateRoute
          path="/yolo"
          render={() => <Yolo/>}
        ></PrivateRoute>
      </Switch>
    </MuiPickersUtilsProvider>
    </>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     message: state.message
//   }
// }

// export default connect(mapStateToProps, null)(App)


export default App
