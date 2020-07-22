import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Search from "./components/users/Search";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import axios from "axios";

import GithubState from "./context/github/GithubState";

import "./App.css";

const App = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const getUserRepos = async (username) => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setRepos(res.data);
    setLoading(false);
  };

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <GithubState>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search setAlert={showAlert} />
                    <Users />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={(props) => (
                  <User {...props} getUserRepos={getUserRepos} repos={repos} />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

const magnet =
  "magnet:?xt=urn:btih:eba08053dc1247d761ffb00a76fbaeee4a8a8e04&dn=%5bFreeTutorials.Us%5d%20Udemy%20-%20React%20Front%20To%20Back%202019&tr=udp%3a%2f%2fcoppersurfer.tk%3a6969%2fannounce&tr=udp%3a%2f%2famigacity.xyz%3a6969%2fannounce&tr=udp%3a%2f%2fbt.xxx-tracker.com%3a2710%2fannounce&tr=udp%3a%2f%2fopen.stealth.si%3a80%2fannounce&tr=udp%3a%2f%2ftracker.torrent.eu.org%3a451%2fannounce&tr=udp%3a%2f%2ftracker.iamhansen.xyz%3a2000%2fannounce&tr=https%3a%2f%2fopentracker.xyz%3a443%2fannounce&tr=http%3a%2f%2fopen.trackerlist.xyz%3a80%2fannounce&tr=udp%3a%2f%2ftracker.leechers-paradise.org%3a6969%2fannounce&tr=udp%3a%2f%2fexplodie.org%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.nyaa.uk%3a6969%2fannounce&tr=udp%3a%2f%2fnewtoncity.org%3a6969%2fannounce&tr=https%3a%2f%2ftracker.vectahosting.eu%3a2053%2fannounce&tr=udp%3a%2f%2fretracker.akado-ural.ru%3a80%2fannounce&tr=udp%3a%2f%2fopentor.org%3a2710%2fannounce&tr=udp%3a%2f%2ftracker.zer0day.to%3a1337%2fannounce&tr=udp%3a%2f%2ftorrentclub.tech%3a6969%2fannounce";

export default App;
