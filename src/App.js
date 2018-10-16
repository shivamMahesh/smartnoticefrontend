import React, { Component } from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import './App.css';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Home from './Components/home/home';
import Verify from './Components/Verify/Verify';
import Buttons from './Components/Buttons/Buttons';
import Upload from './Components/Upload/Upload';
import Download from './Components/Download/Download';
import Forget from './Components/forget/Forget';
import Pass from './Components/pass/Pass';
import First from './first';
import Error from "./Components/Error";
const initialstate={
      section:[],
      email:'',
      redirect:false
}

class App extends Component {
  
  constructor()
  {
    super();
    this.state=initialstate
  }

  
onRouteChange=()=>
{ 
 var r = window.confirm("ARE YOU SURE!");
  if (r === true) {
     this.setState(initialstate);
  return `/`;
}
else 
return false;
}

emailChange=(email)=>
{
  this.setState({email:email});
}


onButtonSubmit = (section)=>
{ 
      fetch('https://afternoon-fortress-98106.herokuapp.com/')
          .then(res=>res.json()); 
    this.setState({section:section});
}



render() 
{
    return (
      <BrowserRouter>
      <div>
   <Switch>
      <Route exact path='/' component={First} />
      <Route path='/Signin'  render={(props) => (
    <Signin   email={this.state.email} emailChange={this.emailChange} />)}/>

      <Route path='/Register' render={(props) => (
    <Register   email={this.state.email} emailChange={this.emailChange} />)}/>

       <Route path='/Forget'  render={(props) => (
    <Forget onRouteChange={this.onRouteChange} email={this.state.email} emailChange={this.emailChange} />)}/>

      <Route path='/Verify'  render={(props) => (
    <Verify onRouteChange={this.onRouteChange} email={this.state.email}/>)}/>
             
      <Route path='/Buttons'  render={(props) => (
    <Buttons onRouteChange={this.onRouteChange} email={this.state.email} onButtonSubmit={this.onButtonSubmit} />)}/>

      <Route path='/Pass'  render={(props) => (
    <Pass onRouteChange={this.onRouteChange} email={this.state.email}/>)}/>
        
        <Route path='/Upload'  render={(props) => (
    <Upload onRouteChange={this.onRouteChange} section={this.state.section} email={this.state.email}/>)}/>

        <Route path='/Download'  render={(props) => (
    <Download onRouteChange={this.onRouteChange}/>)}/>

    <Route onRouteChange={this.onRouteChange} path='/Home'  render={(props) => (
    <Home onRouteChange={this.onRouteChange} email={this.state.email} section={this.state.section}/>)}/>
    <Route component={Error}/>
    </Switch>
  </div>
  </BrowserRouter>
    );
}
}

export default App;
