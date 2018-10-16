import React,{ Component} from 'react';
import CardList from './CardList';
import Scroll from './Scroll';
import SearchBox from './SearchBox';
import ErrorBoundary from './ErrorBoundary';
import './home.css';
import {Redirect} from 'react-router-dom';
import Navigation from '../Navigation';
const initialstate={
			files1 : [],
			files2: [],
			files3: [],
			searchfield1:'',
			searchfield2:'',
			searchfield3:'',
			redirect1:false,
			redirect2:false
		};
class Home extends Component
{
constructor(props)
{
		super(props);
		this.state =initialstate 
}

componentDidMount()
{
	fetch('https://afternoon-fortress-98106.herokuapp.com/filesd',
	{
  method:'post',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
   status:"current",
   section:this.props.section})
	})
	.then(response => response.json())
	.then(data=>
	{
	this.setState({files1:data});
	})
	.catch(err=>{
	window.alert('stop');
	})	

	fetch('https://afternoon-fortress-98106.herokuapp.com/filesd',
	{	
  method:'post',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
   status:"previous",
   section:this.props.section})
	})
	.then(response => response.json())
	.then(data=>
	{
	this.setState({files2:data});
	})
	.catch(err=>{
	window.alert('stop');
	})

	fetch('https://afternoon-fortress-98106.herokuapp.com/filesd',
	{
  method:'post',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
   status:"upcoming",
   section:this.props.section })
	})
	.then(response => response.json())
	.then(data=>
	{
	this.setState({files3:data});})
	.catch(err=>{
	window.alert('stop');
	})
}


onSearchChange1=(event)=>
{
	this.setState({searchfield1: event.target.value});
}

onSearchChange2=(event)=>
{
	this.setState({searchfield2: event.target.value});
}

onSearchChange3=(event)=>
{
	this.setState({searchfield3: event.target.value});
}

onButtonSubmit1=(event)=>
{
this.setState({redirect1:true});
}

onButtonSubmit2=(event)=>
{

this.setState({redirect2:true});
}

render()
{
	if(this.state.redirect1===true)
		return <Redirect push to='/Upload' />
	else if(this.state.redirect2===true)
		return <Redirect push to='/Download' />
	const {files1,files2,files3,searchfield1,searchfield2,searchfield3}=this.state;
	const filteredfiles1=files1.filter(file=>{
		return file.email.toLowerCase().includes(searchfield1.toLowerCase())})
	const filteredfiles2=files2.filter(file=>{
		return file.email.toLowerCase().includes(searchfield2.toLowerCase())})
	const filteredfiles3=files3.filter(file=>{
		return file.email.toLowerCase().includes(searchfield3.toLowerCase())})
	return(
		<div>
<Navigation  isSignedIn={true} onRouteChange1='/Buttons' onRouteChange={this.props.onRouteChange} />
		<div className="App">
	<button className='w-30 mv2grow f4 link ph3 pv3 dib white bg-light-purple' onClick={this.onButtonSubmit1}>
	UPLOAD</button>
	<button className='w-30 mv2grow f4 link ph3 pv3 dib white bg-light-purple' onClick={this.onButtonSubmit2}>
	DOWNLOAD</button></div>
	  <div className='tc'>
		<h1 className='f1'>CURRENT IMAGES</h1>
		<SearchBox searchChange={this.onSearchChange1}/>
		<Scroll>
		<ErrorBoundary>
		<CardList files={filteredfiles1} />
		</ErrorBoundary>

	</Scroll>
	<h1 className='f1'>PREVIOUS IMAGES</h1>
		<SearchBox searchChange={this.onSearchChange2}/>
		<Scroll>
		<ErrorBoundary>
		<CardList files={filteredfiles2} />
		</ErrorBoundary>

	</Scroll>

	<h1 className='f1'>UPCOMING IMAGES</h1>
		<SearchBox searchChange={this.onSearchChange3}/>
		<Scroll>
		<ErrorBoundary>
		<CardList files={filteredfiles3} />
		</ErrorBoundary>

	</Scroll>
	</div>
	</div>
)
}
}

export default Home;
