import React from 'react';
import './home.css';
const Card=({id,fileid,email,section})=>
{
	return(
		<div className='tc bg-light-green dib br3 pa3 ma5  bw2 shadow-5'>
		<img className='image' alt='files' src={`https://drive.google.com/uc?export=view&id=${fileid}`} />
		<div>
		<h2>id = {id}</h2>
		<p>email = {email}</p>
		<h3>section = {section}</h3>
		</div>
		</div>
		);
}
export default Card;