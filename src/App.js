import React, { useEffect } from 'react';
import './App.css';
import WebcamCapture from './WebcamCapture';
import Preview from './Preview';
import ChatView from './ChatView';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Chats from './Chats';
import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';
import { login, selectUser } from './features/appSlice';
import { auth } from './firebase';
function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoUrl,
          id: authUser.uid
        }))
      }
    })
  }, [])
  return (
    <div className="app">
      <Router>
        {!user ? (<Login />) : (<div className="app__body">
          <Switch>
            <Route path="/chats/view">
              <ChatView />
            </Route>
            <Route path="/chats">
              <Chats />
            </Route>
            <Route path="/preview">
              <Preview />
            </Route>
            <Route path="/">
              <WebcamCapture />
            </Route>
          </Switch>
        </div>)}


      </Router>
    </div >
  );
}

export default App;
