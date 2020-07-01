import React from 'react';
import Logo from './Components/Logo/Logo';
import Navigation from './Components/Navigation';

                
class First extends React.Component
{
	render()
	{
		return(
<div className="App">
  <Navigation  isSignedIn={false}/>        
          <Logo />
      <div className='ma0'><h2><p><i>R V College of Engineering</i></p></h2></div>
<div><h2><p>WELCOME TO SMART NOTICE BOARD AT RVCE</p></h2>
                        <img alt='rvce' src='https://drive.google.com/uc?export=view&id=1adMzqwq95QpNf_1qMyHEZE4yt7FI5Zju'/>
                          </div>
                          </div>
)
	}
}


export default First;