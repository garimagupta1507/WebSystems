import React from "react";
import ReactDOM from "react-dom";
import Whale from "./guest/images/whale.jpg";
import GuestApp from "./guest/GuestApp.js";
import CustomerApp from "./cust/CustomerApp.js";
import AdminApp from "./admin/AdminApp.js";
import Login from "./Login.js";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {role: "guest",user: null}; // We will have "user" and "admin" roles too.
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogin(role, Info){
        if(role === "admin"){
            this.setState({
                role : role,
                user: Info,
            })
        } else if(role === "customer"){
            this.setState({
                role : role,
                user: Info,
            })
        }
    }

    handleLogout(){
        this.setState({
            role: "guest",
            user: null,
        })

    }
    render()
    {
      return(
      <div>
          {this.state.role === "guest" && (<GuestApp handleLogin = {this.handleLogin} />)}
          {this.state.role === "admin" && (<AdminApp handleLogout = {this.handleLogout}/>)}
          {this.state.role === "customer" && (<CustomerApp handleLogout = {this.handleLogout}/>)}
      </div>
      )

  }
}

ReactDOM.render(<App />, document.getElementById("root"));
