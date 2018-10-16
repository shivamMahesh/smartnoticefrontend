import React from 'react';
class Rotate extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return <div>
      <img  src={this.props.src} width="400" alt='rvce' />
      
    </div>
  }
}

export default Rotate;