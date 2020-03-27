import React from "react";
import ReactDOM from "react-dom";
import Whale from "../guest/images/whale.jpg";
import About from "../About.js";
import Home from "../Home.js";
import Login from "../Login.js";
import { Admin, Resource } from 'react-admin';
import Tour from "../tour.js";
import GuestApp from "../guest/GuestApp.js";

class CustomerApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {role: "customer", show: "Tour"};
        this.atHome = this.atHome.bind(this);
        this.atAbout = this.atAbout.bind(this);// We will have "user" and "admin" roles too.
        this.atTour = this.atTour.bind(this); // We will have "user" and "admin" roles too.
        this.atLogin = this.atLogin.bind(this);
        this.signOut = this.signOut.bind(this);
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
            showing: "Login"
        });
    }
    atTour(){
      this.setState({
        show:"Tour"
      });
    }
    signOut() {
       this.props.handleLogout("guest",{});
    }
    // Renders component based on current state and props
    render() {
        return <div>
        <nav id= "navbar">
      		  <ul>
      			<li><p className="logo"> <h4>California's Whale Watching Tours</h4></p></li>
      			<li><a className="button" onClick = {this.atHome}>Home</a></li>
      			<li><a className="button" onClick = {this.atTour}>My Tours</a></li>
      			<li><a className="button" href="https://seaspiritsantacruz.com/wildlife-safaris/morning-safari/">Coming Tours</a></li>
      			<li><a className="button" onClick={this.signOut}>Logout</a></li>
      			<li><a className="button" onClick = {this.atAbout}>About Us</a></li>
      		</ul>
          </nav>
          {this.state.show === "Home" &&( <Home/>)}
           {this.state.show === "About" &&( <About/>)}
          {this.state.show === "Tour" &&( <Tour/>)}
          {this.state.show === "Login" && (<Login/>
           )}
           {this.state.email === null && (
            <CustomerApp/>
            )}

          </div>
    }
}

export default CustomerApp;
