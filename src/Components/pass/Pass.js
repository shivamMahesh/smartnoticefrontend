import React from 'react';
import {Redirect} from 'react-router-dom';
import Navigation from '../Navigation';
const initialstate={
      Password1:'',
      Password2:'',
       token:'',
       redirect:false
    };
class  Pass extends React.Component
{
  
constructor(props)
{
    super(props);
    this.state=initialstate
}
 
onTokenChange=(event)=>
{
    this.setState({token: event.target.value});
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
  const {email}=this.props;
  fetch('https://afternoon-fortress-98106.herokuapp.com/verify',
  {
  method:'post',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    email:email,
  token:this.state.token})
  })
  .then(response => response.json())
  .then(user=>{
  if(user===true)
  {
   fetch('https://afternoon-fortress-98106.herokuapp.com/pass',
  {
  method:'post',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    email:email,
    password:this.state.Password1})
  })
  .then(response=>response.json())
  .then(user=>{
  if(user===true)
  {
    window.alert('successfully changed your password');
    this.setState({redirect:true});
  }
  else
  {
    window.alert(`password did'nt change`);
    this.setState({redirect:true});
  }
  }) 
  }
  else
   { window.alert(`password did'nt change`);
    this.setState({redirect:true});
  }})
  }
}


render()
{
  if(this.state.redirect===true)
    return <Redirect push to='/Signin' />;
	return(
    <div>
    <Navigation  isSignedIn={false}/>
  <article className="br3 ba  b--black-10 mv0 w-100 w-50-m w-25-l mw6  shadow-5 center">
    <main className="pa4 black-80">
  <div className="measure ">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f2 fw6 ph0 mh0">CHANGE PASSWORD</legend>
  
     <div className="mv1">
        <label className="db fw6 lh-copy f6" htmlFor="password1" >Password</label>
        <input onChange={this.onPasswordChange1} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password1"  id="password1" min="8"/>
      </div>
       <div className="mv1">
        <label className="db fw6 lh-copy f6" htmlFor="password2" >Re-Enter Password</label>
        <input onChange={this.onPasswordChange2} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password2"  id="password2" min="8"/>
      </div>
        <div className="mv1">
        <label className="db fw6 lh-copy f6" htmlFor="password2" >ENTER TOKEN</label>
        <input onChange={this.onTokenChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password2"  id="password3" min="8"/>
      </div>
    </fieldset>
    <div className="">
      <input onClick={this.onSubmitSign} className="b ph3 pv0 input-reset ba b--black bg-transparent grow pointer f6 dib" 
      type="submit" 
      value="CHANGE PASSWORD"
       />
    </div>
    </div>
  </main>
  </article>
	</div>
		);
}
}

 export default Pass;