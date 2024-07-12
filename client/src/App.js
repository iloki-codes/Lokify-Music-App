import {Fragment, useEffect} from "react";
// import {BrowserRouter as Router} from "react-router-dom"; 
import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import PrivateRoute from "./PrivateRoute.js";

import { useSelector, useDispatch } from "react-redux";
import {getUser} from "./redux/userSlice/apiCalls";
import {getPlaylists} from "./redux/playlistSlice/apiCalls";

import Main from "./Pages/Main";
import SignUp from "./Pages/SignUp/index.jsx";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Home from "./Pages/Home/index.jsx";
import Library from "./Pages/Library";
import Playlist from "./Pages/Playlist";
import Search from "./Pages/Search";
import LikedSongs from "./Pages/LikedSongs";
import Profile from "./Pages/Profile";

import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import AudioPlayer from "./Components/AudioPlayer";

import "./app.css";
import './output.css';

const App = () => {

  const dispatch = useDispatch();
    
  const location = useLocation();
  const {user} = useSelector((state) => state.auth);
  const {currentSong} = useSelector((state) => state.audioPlayer);

  useEffect(() => {
    let token = null;
    const root = JSON.parse(window.localStorage.getItem("persist:root"));

    if (root) {
      const {auth} = root;
      const {user} = JSON.parse(auth);
      if (user) token = user.token;
    }

    if (user && token) {
      getUser(user._id, dispatch);
      getPlaylists(dispatch);
    }
  }, [dispatch, user]);


  return (
    
    <Fragment>

      {user &&
        location.pathname !== "/login" &&
        location.pathname !== "/" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/not-found" && (
          
          <Fragment>
            <Navbar />
            <Sidebar />
            { currentSong && <AudioPlayer /> }
          </Fragment>
        )
      }

    {/* <Router> */}

      <Routes>

          <Route exact path="/" element={<Main />} />

          <Route
                exact user={user}
                path="/home"
                element={<PrivateRoute component={Home} />} />
          <Route 
                exact user={user}
                path="/collection/tracks"
                element={<PrivateRoute component={LikedSongs} />} />
          <Route
                exact user={user}
                path="/collection/playlists"
                element={<PrivateRoute component={Library} />} />
          <Route
                exact user={user}
                path="/search"
                element={<PrivateRoute component={Search} />} />
          <Route
                exact user={user}
                path="/playlist/:id"
                element={<PrivateRoute component={Playlist} />} />
          <Route
                exact user={user}
                path="/me"
                element={<PrivateRoute component={Profile} />} />

          {/* {user && <Route path="/signup" element={ <Navigate to="/home" /> } />} */}
          {user && <Route path="/login" element={ <Navigate to="/home" />} />}

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/not-found" element={<NotFound />} />
          
          <Route path="/not-found" element={ <Navigate to="/not-found" /> } />

        </Routes>
      
      {/* </Router> */}
    
    </Fragment>
  
  );

};

export default App;