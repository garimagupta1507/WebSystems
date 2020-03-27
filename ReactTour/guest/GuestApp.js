import React from "react";
import ReactDOM from "react-dom";
import Whale from "../guest/images/whale.jpg";
import Home from "../Home.js";
import About from "../About.js";
import Login from "../Login.js";
import Tour from "../Tour.js";
import {  BrowserRouter as Router,  Route,  Link,  Switch,  Redirect} from 'react-router-dom';
import { Admin, Resource } from 'react-admin';

class GuestApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {role: "guest", show: "Home"};
        this.atHome = this.atHome.bind(this);
        this.atAbout = this.atAbout.bind(this);// We will have "user" and "admin" roles too.
        this.atLogin = this.atLogin.bind(this)
        this.OnSucces = this.OnSucces.bind(this);
        this.atTour = this.atTour.bind(this);
    }

    atHome(){
      this.setState({
        show:"Home"
      });
    }
    atAbout(){
      this.setState({
        show:"About"
      });
    }
    atLogin(){
      this.setState({
        show:"Login"
      });
    }
    OnSucces(role, Info){
        this.props.handleLogin(role,Info);
        this.setState({
          role: role,
          user: Info,
        });
    }
    atTour(){
      this.setState({
        show:"Tour"
      });
    }
    // Renders component based on current state and props
    render() {
        return <div>
        <nav id= "navbar">
      		  <ul>
      			<li><p className="logo"> <h4>California's Whale Watching Tours</h4></p></li>
      			<li><a className="button" onClick = {this.atHome}>Home</a></li>
      			<li><a className="button" onClick = {this.atLogin}>Login</a></li>
      			<li><a className="button" onClick = {this.atTour}>Coming Tours</a></li>
      			<li><a className="button" href="">NewsLetter Signup</a></li>
      			<li><a className="button" onClick = {this.atAbout}>About Us</a></li>
      		</ul>
          </nav>

           {this.state.show === "Home" &&( <Home/>)}
            {this.state.show === "About" &&( <About/>)}
            {this.state.show === "Tour" &&( <Tour/>)}
            {this.state.show === "Login" &&( <Login OnSucces = {this.OnSucces} />)}
          </div>
    }
}

export default GuestApp;
