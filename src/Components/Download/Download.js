import React from 'react';
import Navigation from '../Navigation';
const initialstate={
      f_id:''
    }
class  Download extends React.Component
{
constructor()
{
    super();
    this.state=initialstate
}


onButtonSubmit=(event)=>
{
   fetch('http://localhost:3000/download',
  {
  method:'post',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
  		f_id:this.state.f_id})
  })
  .then(response => response.json())
  .then(data=>
  {
    this.setState(initialstate);
    window.open(data,'_blank');
})
  .catch(err=>
  window.alert("wrong id"))

}

onInputChange=(event)=>
{
  	this.setState({f_id:event.target.value});
}
render()
{
  return(
	<div>
  <Navigation  isSignedIn={true} onRouteChange1='/Home' onRouteChange={this.props.onRouteChange} />
	<p className='f3'>
	{'DOWNLOAD IMAGES'}
	</p>
	<div className='center'>
  <h1>ENTER THE FILE ID</h1>
		<input className='f4 pa2 w-70 center' type='text' onChange={this.onInputChange}/>
	<button className='w-30 grow f4 link ph3 pv3 dib white bg-light-purple' onClick={this.onButtonSubmit}>
	DOWNLOAD</button>
	</div>
	</div>
	)
}
}
export default Download;