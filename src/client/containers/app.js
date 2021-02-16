import React from 'react'
import { connect } from 'react-redux'
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import { Switch, Route, useLocation, useParams } from "react-router-dom";
import Yolo from "./Yolo/Yolo";
import Salut from "./Yolo/Salut";

const App = ({message}) => {
  // const location = useLocation();
  // const authContext = useContext(AuthContext);
  // const withNavbar = location.pathname !== "/";
  // const snackbar = useSnackbar();
  // const dispatch = useDispatch();
  // const [id, setId] = useState();

  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Yolo />}
        ></Route>
          <PrivateRoute
          path="/yolo"
          render={() => <Yolo />}
        ></PrivateRoute>
                  <PrivateRoute
          path="/salut"
          render={() => <Salut />}
        ></PrivateRoute>
      </Switch>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     message: state.message
//   }
// }

// export default connect(mapStateToProps, null)(App)


export default App
