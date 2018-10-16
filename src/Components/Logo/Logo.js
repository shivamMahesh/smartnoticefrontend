import React from 'react';
import Tilt from 'react-tilt';
import brain from './Logo.jpg';
import './Logo.css';
const Logo=()=>
{
	return(
		<div className='ma0 mh6 '>
		<Tilt className="Tilt  shadow-2" options={{ max : 50 }} style={{ height: 100, width: 100 }} >
 	<div className="Tilt-inner pa2"><img style={{
 	paddingTop:'2px'}} alt='logo' src={brain} /></div>
	</Tilt>
	</div>
	);
}

export default Logo;