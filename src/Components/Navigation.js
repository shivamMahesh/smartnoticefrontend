import React from 'react';
import {Link,Redirect} from 'react-router-dom';
const initialstate={
  redirect:false,
  redirectto:''
}
class Navigation extends React.Component
{
  constructor(props)
  {
super(props);
this.state=initialstate
  }
onRouteChange=()=>
{
 const val=this.props.onRouteChange();
 if(val!==false)
 {
  this.setState({redirectto:val});
  this.setState({redirect:true});
}
}
  render()
	{
      if(this.state.redirect===true)
        return <Redirect push to={this.state.redirectto} />;
    if(!this.props.isSignedIn) 
      {
        return(<nav className="navbar navbar-default">
  <div className="container-fluid ">
    <div className="navbar-header">
      <a className="navbar-brand black" href="https://smart-notice-board.herokuapp.com/">SMART NOTICE BOARD</a>
    </div>
    <ul className="nav navbar-nav black">
      <li className="active"><Link to='/'>Home</Link></li>
    <li><Link to='/Signin'>SignIn</Link></li>
     <li><Link to='/Register'>Register</Link></li>
    </ul>
  </div>
</nav>);
	}
	else
	{
	return(
		 <nav className="navbar navbar-default">
  <div className="container-fluid">
    <div className="navbar-header">
      <a className="navbar-brand black" href="https://smart-notice-board.herokuapp.com/">SMART NOTICE BOARD</a>
    </div>
    <ul className="nav navbar-nav ">
    <li>  <Link to={this.props.onRouteChange1}>Back</Link></li>
     <li onClick={this.onRouteChange} className="pointer">Signout</li>
    </ul>
  </div>
</nav>
	);
	}
}
}
export default Navigation;