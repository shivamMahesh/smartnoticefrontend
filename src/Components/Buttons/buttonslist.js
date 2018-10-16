import React from 'react';
import Button from './Button';

const  ButtonList=({buttons,onButtonSubmit})=>
{
return(
		<div>
		{
		buttons.map((button,i)=>
		{
			return (<Button 
			key={i} 
			section={button.section} 
			onButtonSubmit={onButtonSubmit}/>
			);
		}
			)
		}
		</div>
);
}
export default ButtonList;