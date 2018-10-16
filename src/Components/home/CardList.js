import React from 'react';
import Card from './Card';

const  CardList=({ files })=>
{
return(
		<div>
		{
		files.map((file,i)=>
		{
			return (<Card  
			key={i}
			id={file.f_id}
			fileid={file.fileid} 
			email={file.email}
			section={file.section} />
			);
		}
			)
		}
		</div>
);
}
export default CardList;