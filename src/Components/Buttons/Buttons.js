import React from 'react';
import ButtonList from './buttonslist';
import {Redirect} from 'react-router-dom';
import Navigation from '../Navigation';
const initialstate={
      buttons:[],
      sections:[],
      name:'',
      designation:'',
      redirect1:false,
      redirect2:false
    };
class  Buttons extends React.Component
{
constructor(props)
{
    super(props);
    this.state=initialstate
}

componentDidMount()
{
  fetch('https://afternoon-fortress-98106.herokuapp.com/buttons',
  {
  method:'post',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
   email:this.props.email})
  })
  .then(response => response.json())
  .then(data=>
  {
	this.setState({buttons:data});
	this.setState({sections:this.state.buttons.map((button)=>button.section)});
  })
  .catch(err=>{
	window.alert('stop');})

  fetch('https://afternoon-fortress-98106.herokuapp.com/user',
  {
  method:'post',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    email:this.props.email})
  })
  .then(response=>response.json())
  .then(user=>
  {
  this.setState({
  name:user[0].name,
  designation:user[0].designation})})
  .catch(err=>
  {
  window.alert('stop');})

}

onResetPassword=()=>
{
	fetch('https://afternoon-fortress-98106.herokuapp.com/mail1',
  {
  method:'post',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    email:this.props.email})
  })
  .then(response=>response.json())
  .then(user=>{
  if(user===false)
  {
    window.alert(`email does'nt exits`);
  }
  else
  {
    window.alert('enter new password and the token send to your email');
  this.setState({redirect1:true});
  }})

}
onButtonSubmit=(section)=>
{
  this.props.onButtonSubmit(section);
    this.setState({redirect2:true});
}
onButtonSubmit1=()=>
{
  this.props.onButtonSubmit(this.state.sections);
    this.setState({redirect2:true});
}
render()
{
   if(this.state.redirect1===true)
   return <Redirect push to="/Pass" />;
else if(this.state.redirect2===true)
   return <Redirect push to="/Home" />;
   const {name,designation}=this.state;
  return(
	<div className="App"> 
  <Navigation  isSignedIn={true} onRouteChange1='/' onRouteChange={this.props.onRouteChange} />
	<h2>{`HEY ${name},${designation}`}</h2>
  <h3>SELECT THE SECTION</h3>
	<div className='center'>
	<ButtonList buttons={this.state.buttons} onButtonSubmit={this.onButtonSubmit} />
 </div>
 <div className='mv4 ml0'>
 		  <button className='w-30 grow f4 link ph3 pv3 dib white bg-light-purple' onClick={this.onButtonSubmit1}>ALL</button>
  </div>
  <div className='mv4 mr0'>
  <button className='w-30 grow f4 link ph3 pv3 dib white bg-light-purple' onClick={this.onResetPassword}>RESET PASSWORD</button>
	</div>
	</div>
	);
}
}
export default  Buttons; 
