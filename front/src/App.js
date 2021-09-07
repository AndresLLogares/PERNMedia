import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import "./sass/app/app.scss";
import Scroll from "./components/scrooltotop/scroll";
import LandPage from "./components/landpage/landpage";
import Home from "./components/home/home";
import AboutMe from "./components/aboutme/about";
import Reset from "./components/reset/reset";
import Profile from "./components/profile/profile";
import ProfileOut from "./components/profile/profileOut";
import Friends from "./components/friends/friends";
import Messages from "./components/messages/messages";

function App() {
  return (
    <BrowserRouter>
      <Scroll />
      <Switch>
        <Route exact path="/" component={LandPage} />
        <Route exact path="/Home" component={Home} />
        <Route exact path="/AboutMe" component={AboutMe} />
        <Route exact path="/Reset" component={Reset} />
        <Route exact path="/Profile" component={Profile} />
        <Route exact path="/ProfileO" component={ProfileOut} />
        <Route exact path="/Friends" component={Friends} />
        <Route exact path="/Messages" component={Messages} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
