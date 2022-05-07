import React from 'react';
import { Switch, Route, Redirect, Router, HashRouter } from 'react-router-dom';
import LoadingIndicator from 'components/LoadingIndicator';
import { Icon, Link, Grid, Chip, Avatar, Paper, Typography, GridList, GridListTile, GridListTileBar, Button, TextField} from '@material-ui/core';
import style from './style'
import Cookies from 'js-cookie';

class Login extends React.PureComponent {
  
  constructor(props) {
    super(props)
    this.state = {
        componentType: "login",
        email: "",
        password: "",
        name: "",
        address: "",
        phoneNumber: ""
    }
  }
  
  componentDidMount() {
    console.log("hey there");
  }

  componentDidUpdate(prevProps) {
    if (prevProps.signInDetails !== this.props.signInDetails) {
      const {signInDetails} = this.props; 
      Cookies.set('name', signInDetails.name);
      Cookies.set('role', signInDetails.role);
      Cookies.set('token', signInDetails.token);
      Cookies.set('id', signInDetails.id);
      Cookies.set('booksOwned', JSON.stringify(signInDetails.booksOwned))

      window.location.href = "#/books/listing";
    }

    if (prevProps.loginStatus !==  this.props.loginStatus) {
      console.log(this.props.loginStatus);
      if (this.props.loginStatus && this.props.loginStatus.message) {
        alert(this.props.loginStatus.message);
      }
    }
  }


  toggleRegister(type) {
    this.setState({'componentType': type})
  }

  updateTextField(type, e) {
    this.setState({[type]: e.target.value})
  }

  login() {
    this.props.login({
      email: this.state.email,
      password: this.state.password
    })
  }

  signup() {
    this.props.signup({
      email: this.state.email, 
      password: this.state.password, 
      name: this.state.name, 
      address: this.state.address,
      phoneNumber: this.state.phoneNumber
    })
  }

  render() {

    return (
      <Grid container className="cropper-container">
        <Grid container item sm={12} xs={12} justify="center">

            <Grid container item sm={6} xs={6} className="crop-title" justify="center">
                <h2 justify="center">
                   Welcome to Book Exchange Platform
                </h2>
                <p>Exchange your books to earn rewards, which you can use to get more books.</p>


                <Grid container item sm={6} xs={6}>
                  
                  {
                    this.state.componentType === 'login' ? 
                    (
                      <Grid container item sm={12}>
                          <Grid item sm={12} className="title">
                            <b>Log In</b>
                          </Grid>
                          <Grid item sm={12} className="textfield">
                            <TextField value={this.state.email} onChange={this.updateTextField.bind(this, "email")} placeholder="Enter Email" fullWidth />
                          </Grid>
                          <Grid item sm={12} className="textfield">
                            <TextField value={this.state.password} type="password" onChange={this.updateTextField.bind(this, "password")} placeholder="Enter password" fullWidth />
                          </Grid>
                          <Grid container item sm={12} justify="center">
                            <Button onClick={this.login.bind(this)}>
                              Login
                            </Button>
                          </Grid>
                          <Grid container item sm={12} justify="center">
                            <p>Don't have an account yet? <b onClick={this.toggleRegister.bind(this, "register")}>Register</b></p>
                          </Grid>
                      </Grid>
                    ) : 
                    (
                      <Grid container item sm={12}>
                          <Grid item sm={12} className="title">
                            <b>Signup</b>
                          </Grid>
                          <Grid item sm={12} className="textfield">
                            <TextField value={this.state.name} onChange={this.updateTextField.bind(this, "name")} placeholder="Enter Name" fullWidth />
                          </Grid>
                          <Grid item sm={12} className="textfield">
                            <TextField value={this.state.email} onChange={this.updateTextField.bind(this, "email")} placeholder="Enter Email" fullWidth />
                          </Grid>
                          <Grid item sm={12} className="textfield">
                            <TextField value={this.state.password} type="password" onChange={this.updateTextField.bind(this, "password")} placeholder="Enter password" fullWidth />
                          </Grid>
                          <Grid item sm={12} className="textfield">
                            <TextField value={this.state.address} onChange={this.updateTextField.bind(this, "address")} placeholder="Enter Address" fullWidth />
                          </Grid>
                          <Grid item sm={12} className="textfield">
                            <TextField value={this.state.phoneNumber} onChange={this.updateTextField.bind(this, "phoneNumber")} placeholder="Enter Phone Number" fullWidth />
                          </Grid>
                          <Grid container item sm={12} justify="center">
                            <Button onClick={this.signup.bind(this)}>
                              Signup
                            </Button>
                          </Grid>
                          <Grid container item sm={12} justify="center">
                            <p>Go back to <b onClick={this.toggleRegister.bind(this, "login")}>login</b></p>
                          </Grid>
                      </Grid>
                    )
                  }
                </Grid>
                  
            </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default Login;
