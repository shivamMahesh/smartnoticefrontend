import React from 'react';
import {Redirect} from 'react-router-dom';
import Navigation from '../Navigation';
const initialstate={
      Name:'',
      Password1:'',
      Password2:'',
      Email:'',
      redirect:false
    }
class  Register extends React.Component
{

constructor(props)
{
    super(props);
    this.state=initialstate
}

onEmailChange=(event)=>
{
  this.setState({Email:event.target.value});
}

onNameChange=(event)=>
{
    this.setState({Name:event.target.value});
}

onPasswordChange1=(event)=>
{
  this.setState({Password1: event.target.value});
}

onPasswordChange2=(event)=>
{
  this.setState({Password2: event.target.value});
}
onSubmitSign=()=>
{

  if(this.state.Password1!==this.state.Password2)
  {
  window.alert(`PASSWORD DOES'NT MATCH`);
  }
  else
  {
  this.props.emailChange(this.state.Email);
  fetch('https://afternoon-fortress-98106.herokuapp.com/register',
  {
  method:'post',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    email:this.state.Email,
    password:this.state.Password1,
    name:this.state.Name})
  })
  .then(response=>response.json())
  .then(user=>{
  if(user===true)
  {
    window.alert('successfully registered now verify your email')
    fetch('https://afternoon-fortress-98106.herokuapp.com/mail',
  {
  method:'post',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    email:this.state.Email})
  })
  .then(response => response.json())
  .then(user=>{
  if(user===true)
  {
    this.setState({redirect:true});
  }
  })
  }
  else
    window.alert(user);
  })
  }
}

render()
{
  if(this.state.redirect===true)
    return <Redirect push to='/Verify' />;
	return(
    <div>
         <Navigation  isSignedIn={false} />
	<article className="br3 ba  b--black-10 mv0 w-100 w-50-m w-25-l mw6  shadow-5 center">
		<main className="pa4 black-80">
  <div className="measure ">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f2 fw6 ph0 mh0">Register</legend>
      <div className="mt0">
        <label className="db fw6 lh-copy f7" htmlFor="name" required>Name</label>
        <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
      </div>
      <div className="mt0">
        <label className="db fw6 lh-copy f7" htmlFor="email-address" required>Email</label>
        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
      </div>
     <div className="mv1">
        <label className="db fw6 lh-copy f7" htmlFor="password1" >Password</label>
        <input onChange={this.onPasswordChange1} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password1"  id="password1" min="8"/>
      </div>
       <div className="mv1">
        <label className="db fw6 lh-copy f7" htmlFor="password2" >Re-Enter Password</label>
        <input onChange={this.onPasswordChange2} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password2"  id="password2" min="8"/>
      </div>
    </fieldset>
    <div className="">
      <input onClick={this.onSubmitSign} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f7 dib" 
      type="submit" 
      value="Register"
       />
    </div>
    </div>
  </main>
  </article>
  </div>
		);
}
}

 export default Register;