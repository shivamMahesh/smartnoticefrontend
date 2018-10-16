import React from 'react';
import {Redirect} from 'react-router-dom';
import Navigation from '../Navigation';
const initialstate={
      token:'',
      redirect1:false,
      redirect2:false
    };
class  Verify extends React.Component
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

onSubmitSign=()=>
{
  const {email}=this.props;
fetch('https://afternoon-fortress-98106.herokuapp.com/verify',
{
  method:'post',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    email:email,
  token:this.state.token
  })
})
.then(response => response.json())
.then(user=>{
  console.log(user);
  if(user===true)
  {
    window.alert('successfully verified');
    
    this.setState({redirect1:true});
  }
  else
   { window.alert('not verified');
  
    this.setState({redirect2:true});
}})
}

  render()
  {
    if(this.state.redirect1===true)
      return <Redirect push to='/Buttons' />;
    else if(this.state.redirect2===true)
      return <Redirect push to='/Signin'/>;
	return(
    <div>
    <Navigation  isSignedIn={false} />
		<article className="br3 ba  b--black-10 mv4 w-150 w-50-m w-25-l mw6  shadow-5 center">
		<main className="pa4 black-80">
  <div className="measure ">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">VERIFY</legend>
        <label className="db fw6 lh-copy f6" htmlFor="password" >Token</label>
        <input onChange={this.onTokenChange}  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
    </fieldset>
    <div className="">
      <input onClick={this.onSubmitSign} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib " 
      type="submit" 
      value="VERIFY"
       />
    </div>
  </div>
</main>
</article>
</div>
		);
}
}

 export default Verify;