import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from "@reduxjs/toolkit"
import { Provider } from 'react-redux'   
import store from "./redux";                                                                                                                                                 
import {storeStateMiddleWare} from './middleware/storeStateMiddleWare'
import reducer from './reducers'
import App from './containers/app'
import {alert} from './actions/alert'
import { BrowserRouter } from 'react-router-dom'


// PROVIDED BOILERPLATE CODE BELOW
// const initialState = {}

// const store = createStore(
//   reducer,
//   initialState,
//   applyMiddleware(thunk, logger())
// )

// TD CODE
// Mise en place de l'authentification (en cas de réactualisation de la page)
// setupAuthentication();


const Shell = () => {
  console.log("SALUT ICI UI")
  useEffect(() => {
    // connectSocketClient();
  }, []);
  // Etat de l'authentification
  // const authState = isAuthenticated();


  // const [user, setUser] = useState(getAuthenticatedUserData());

  // async function refreshUser(info) {
  //   await refreshUserSession((user) => {
  //     setUser({ ...user, ...info });
  //     setAuthState(true);
  //   });
  // }

  // function setUserInfo(user) {
  //   updateStorageData({ user });
  //   setUser(user);
  // }

  // Valeur du contexte d'authentification
  // let authContextValue = {
  //   userMustChooseSpace: false,
  //   isAuthenticated: authState,
  //   user: user,
  //   sid: workspaceAndSid.sid,
  //   smsValidated: deviceEnrolled,
  //   /* cid: cidAndPin.cid, */
  //   cid: getAuthenticatedCid(),
  //   /* pin: cidAndPin.pin, */
  //   pin: getAuthenticatedPin(),
  //   workspace: workspaceAndSid.workspace,
  //   setCid: (cid) => updateWorkspaceOrSidOrCidOrPin({ cid }),
  //   setPin: (pin) => updateWorkspaceOrSidOrCidOrPin({ pin }),
  //   setSid: (sid) => updateWorkspaceOrSidOrCidOrPin({ sid }),
  //   setWorkspace: (workspace) => updateWorkspaceOrSidOrCidOrPin({ workspace }),
  //   setWorkspaceAndSid: updateWorkspaceOrSidOrCidOrPin,
  //   //setIsAuthenticated: (bool) => setAuthState(bool),
  //   setSmSValidated: (bool) => setDeviceEnrolled(bool),
  //   // refreshUser: (info) => refreshUser(info),
  //   setUser: (user) => setUserInfo(user),
  // };


return (
  <div>
    <BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
    </BrowserRouter>
  </div>
)
}


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
