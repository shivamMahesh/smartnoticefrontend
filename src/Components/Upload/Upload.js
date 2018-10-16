import React from 'react';
import axios from 'axios';
import TimeField from 'react-simple-timefield';
import Rotate from './Rotate';
import Navigation from '../Navigation';
const initialstate={
      description:'',
      name:'',
    selectedFile:null,
    imagePreviewUrl: '',
    startd:'',
    startt:'08:00',
    endd:'',
    endt:'11:59',
    preference:''
  };
class  Upload extends React.Component
{
  
	constructor(props)
  {
    super(props);
    this.state=initialstate
}
onTimeChange1=(time)=>
{
  console.log(time);
    this.setState({startt:time});
}

onTimeChange2=(time)=>
{
  console.log(time);
    this.setState({endt:time});
}



onButtonSubmit=(event)=>
{
const { description,name, selectedFile,startd,startt,endd,endt,preference} = this.state;
        let formData = new FormData();
        formData.append('description', description);
        formData.append('name',name);
        formData.append('selectedFile', selectedFile);
        formData.append('startd',startd);
        formData.append('startt',startt)
        formData.append('endd',endd);
        formData.append('endt',endt)
        formData.append('preference',preference);
        formData.append('section',this.props.section);
        formData.append('email',this.props.email);
         if((endd+' '+endt)<(startd+' '+startt) )
  {  
  window.alert("wrong dates");
  }
  else if(preference>5 || preference<1)
  {
  window.alert("wrong preference");
  }
  else if(!description)
  {
  window.alert('select somefile');
  }
  else
  {
    //console.log(description,name, selectedFile,startd,startt,endd,endt,preference,section ,email);
        window.alert('uploading started wait till the confirmation appears');
        axios.post('https://afternoon-fortress-98106.herokuapp.com/upload', formData)
          .then(res=>{
            window.alert('confirm upload');
            fetch('https://afternoon-fortress-98106.herokuapp.com/utdb')
            .then(res=>
            {
        window.alert(`${name} uploaded successfully`); 
        this.setState(initialstate);
          }).catch(err=>
          {
            window.alert("error");
          });}
          ).catch(err=>
          {
            window.alert(err);
          })


  }
}
handleImageChange=(e)=> {

    let reader = new FileReader();
    let sf = e.target.files[0];
    const des=sf.name.split('.')[1];
    const n=sf.name.split('.')[0];
  this.setState({
  description:des,
  name:n
  });

    reader.onloadend = () => {
      this.setState({
        selectedFile:sf,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(sf)
  }


onStartDateChange=(event)=>
{
this.setState({startd:event.target.value});
}

onEndDateChange=(event)=>
{
this.setState({endd:event.target.value});
}

onStatusChange=(event)=>
{
this.setState({status:event.target.value});
}

onPrefenceChange=(event)=>
{
this.setState({preference:event.target.value});
}

render()
{
   let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<Rotate src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText"></div>);
    }

  return(
	<div >
  <Navigation  isSignedIn={true} onRouteChange1='/Home' onRouteChange={this.props.onRouteChange} />
	<p className='f3 App'>
	{'UPLOAD IMAGES'}
	</p>
	<div >
  <p >Start Date</p>
  <input className='f4 pa2  center' type='date'  onChange={this.onStartDateChange}/>
     <p >Start Time</p>
     <div>
   <TimeField  className='f6 center w-25' value={this.state.startt} onChange={this.onTimeChange1}/>
   </div><p >End Date</p>
  <input className='f4 pa2  center' type='date'  onChange={this.onEndDateChange}/>
     <p >End Time</p>
   <div><TimeField   className='f6  center w-25' value={this.state.endt} onChange={this.onTimeChange2}/>
  </div><p >Preference integer between 1 and 5</p>
  <input className='f4 pa2  center' type='text'  onChange={this.onPrefenceChange}/>
  <p >Enter File</p>
   <div className="previewComponent">
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <input className="fileInput" 
            type="file" 
            onChange={this.handleImageChange} />
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
	<button className=' grow f4 link ph3 pv3 dib white bg-light-purple' onClick={this.onButtonSubmit}>
	UPLOAD</button>
  </div>
	</div>
	)
}
}

export default Upload;