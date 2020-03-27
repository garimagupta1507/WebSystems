import React from "react";
import ReactDOM from "react-dom";
import Whale from "../guest/images/whale.jpg";
import About from "../About.js";
import Home from "../Home.js";
import Tour from "../Tour.js";
import Customer from "../Customer.js";
import {  BrowserRouter as Router,  Route,  Link,  Switch,  Redirect} from 'react-router-dom';
import { Admin, Resource } from 'react-admin';
import GuestApp from "../guest/GuestApp.js";
import CustomerApp from "../cust/CustomerApp.js";
import AdminTour from "./AdminTour.js";

class AdminApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {role: "admin", show: "Customer"};
        this.atHome = this.atHome.bind(this);
        this.atAbout = this.atAbout.bind(this);// We will have "user" and "admin" roles too.
        this.atCustomer = this.atCustomer.bind(this);
        this.atTour = this.atTour.bind(this);
        this.signOut = this.signOut.bind(this);// We will have "user" and "admin" roles too.
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
    atCustomer(){
      this.setState({
        show:"Customer"
      });
    }
    atTour(){
      this.setState({
        show:"Tour"
      });
    }
    signOut() {
      let that = this;
fetch('/logout')
.then(function(response){
         if(response.ok){
             return response.json();
         } else{
             let info =`Status Code: ${response.status}, ${response.statusText}`;
             console.log('response ',response);
             return Promise.reject(info);
         }
     })
     .then(function(Info){
       that.props.handleLogout("guest",null);
     })
     .catch(function(msg){
         console.log("Something bad "+msg);
     })
    }
    // Renders component based on current state and props
    render() {
        return <div>
        <nav id= "navbar">
      		  <ul>
      			<li><p className="logo"> <h4>California's Whale Watching Tours</h4></p></li>
      			<li><a className="button" onClick = {this.atHome}>Home</a></li>
      			<li><a className="button" onClick = {this.signOut}>Logout</a></li>
      			<li><a className="button" onClick = {this.atTour}>Tour Management</a></li>
      			<li><a className="button" onClick = {this.atCustomer}>Customer Management</a></li>
      			<li><a className="button" onClick = {this.atAbout}>About Us</a></li>
      		</ul>
          </nav>
          {this.state.show === "Home" &&( <Home/>)}
           {this.state.show === "About" &&( <About/>)}
          {this.state.show === "Customer" &&( <Customer/>)}
          {this.state.show === "Tour" && (<AdminTour/>)}
          {this.state.email === null && (<GuestApp/>)}
          </div>
    }
}

export default AdminApp;
