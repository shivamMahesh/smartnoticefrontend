import React from 'react';
import {Link,Redirect} from 'react-router-dom';

import Navigation from '../Navigation';
const initialstate={
    signInEmail:'',
      signInPassword:'',
      redirect1:false,
      redirect2:false,
}
class  Signin extends React.Component
{

constructor(props)
{
    super(props);
    this.state=initialstate;
}

onPasswordChange=(event)=>
{
  this.setState({signInPassword: event.target.value});
}

onEmailChange=(event)=>
{
  this.setState({signInEmail:event.target.value});
}
 
onSubmitSign=()=>
{
  this.props.emailChange(this.state.signInEmail);
  fetch('https://afternoon-fortress-98106.herokuapp.com/signin',
  {
  method:'post',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    email:this.state.signInEmail,
    password:this.state.signInPassword})
  })
.then(response => response.json())
.then(user=>{
  if(!user.id)
  {
window.alert('invalid email or password');
  }
  else if(user.id  && user.active===true)
  {
    this.props.emailChange(user.email);
    this.setState({redirect1:true});
  }
  else if(user.id && user.active===false)
  {
    window.alert('verify your email');
  fetch('https://afternoon-fortress-98106.herokuapp.com/mail',
  {
  method:'post',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    email:this.state.signInEmail})
  })
  .then(response => response.json())
  .then(user=>{
  if(user===true)
  {
   this.setState({redirect2:true});
  }
  })
  }
  })
}
render()
{
  const {redirect1,redirect2}=this.state;
 if(redirect1===true)
    return <Redirect push to="/Buttons" />;
  else if(redirect2===true)
   return <Redirect push to="/Verify" />;
	return(
    <div>
     <Navigation  isSignedIn={false}/>
		<article className="br3 ba  b--black-10 mv0 w-100 w-50-m w-25-l mw6  shadow-5 center v-top pl3">
		<main className="pa4 black-80">
    <div className="measure ">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
      <div className="mt0">
        <label className="db fw6 lh-copy f6" htmlFor="email-address" >Email</label>
        <input required onChange={this.onEmailChange}className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
      </div>
      <div className="mv1">
        <label className="db fw6 lh-copy f6" htmlFor="password" >Password</label>
        <input min="8" onChange={this.onPasswordChange}  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
      </div>
    </fieldset>
    <div className="">
      <input onClick={this.onSubmitSign} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib " 
      type="submit" 
      value="Sign in"
       />
    </div>
    <div className="lh-copy mt0">
      <Link to='/Register'><p className="f6 link dim black db pointer">Register</p></Link>
    </div>
     <div className="lh-copy mt0">
      <Link to='/Forget'><p  className="f6 link dim black db pointer">Forget Password</p>
    </Link></div>
  </div>
  </main>
  </article>
  </div>
		);
}
}

 export default Signin;