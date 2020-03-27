import React from "react";
import ReactDOM from "react-dom";
import GuestApp from "./guest/GuestApp.js";
import CustomerApp from "./cust/CustomerApp.js";
import AdminApp from "./admin/AdminApp.js";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {role: "", email: "",password: "",};
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.signIn = this.signIn.bind(this);

    }

    setEmail(event){
        this.setState({
            email: event.target.value
            //email: this.refs.email.value,
        });
    }

    setPassword(event){
        this.setState({
            password: event.target.value
            //password: this.refs.password.value,
        });
    }

    signIn() {
       let that = this;
        console.log("Button pressed");

        if(this.state.email === "sided1830@outlook.com"){
            console.log('admin');
            console.log(this.state);
            this.props.OnSucces("admin",{email: this.state.email, password: this.state.password});
        }
        else if(this.state.email === "cust@email.org"){
            console.log('customer');
            this.props.OnSucces("customer",{email: this.state.email, password: this.state.password});
        }
        else {
            console.log('guest');
            this.props.OnSucces("guest",{email: this.state.email, password: this.state.password});
        }
        fetch('/login',{
            method:'POST',
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }).then(function(response){
            if(response.ok){
                return response.json();
            } else{
                let info =`Status Code: ${response.status}, ${response.statusText}`;
                console.log('response ',response);
                return Promise.reject(info);
            }
            console.log(response.json());
            return response.json();
        }).then(function(Info){
            console.log('Info',Info);
            that.props.OnSucces(Info.role,Info)
        })
    }

  render() {
    return (
    <div>
    <main>
        <h1>Login</h1>
      <form>

        Email : <input type="text" ref="email" onChange={this.setEmail} placeholder="abcd@gmail.com" /><br/>
        Password: <input type="password" ref="password" onChange={this.setPassword} placeholder="password" /><br/>
        <button onClick={this.signIn}>LOGIN</button>
        <br/>
            <br/>
      </form>

    <br/>
    <br/>
     </main>
      </div>
        )

  }

}

export default Login;
