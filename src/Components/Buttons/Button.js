import React from 'react';

const Button=({section,onButtonSubmit})=>
{
	const sec=[];
	sec.push(section);
	return(
		<div >
		 <button className='w-30 grow f4 link ph3 pv3 dib white bg-light-purple' onClick={()=>onButtonSubmit(sec)}>{section}</button>
		</div>
		);
}
export default Button;