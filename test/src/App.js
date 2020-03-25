import React from 'react';
import {  Switch, Route } from "react-router-dom";

import Header from "./layout/Header";
import Footer from "./layout/Footer";

import HomePage from "./containers/HomePage";
import "./index.css";


const App = () => {
  return(
    <div>
      <Header/>
      <Switch>
          <Route exact path="/" component={HomePage} />
      </Switch>
      <Footer/>
    </div>)
}
export default App;