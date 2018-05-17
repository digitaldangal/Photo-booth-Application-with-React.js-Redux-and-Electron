import React, { Component, props } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonToolbar } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class Start extends Component {

  	constructor(props) {
      super(props);   
      this.IsCameraExists;
      this.isPrinterConnected; 	
	  }
    static propTypes = {
     onUpdate: PropTypes.func.isRequired
    };

	ConfigureOwnState(results) {

		if(results.updated_at === undefined)
			return;
		if(this.state.apiHost.updated_at!=results.updated_at){
			this.setState({apiHost:results});
			console.log("SDJFLSDJF:LSDKJF:LSDKJF: => ", this.state.apiHost);
			this.saveToLocal();
		}
  }
  isCameraExists() {
		navigator.webkitGetUserMedia({video: true}, function() {
		  // webcam is available
		  console.log("Camera Available")
		}, function() {
		  // webcam is not available
		  console.log('Camera Not available')
		});
  }
  isPrinterExists(){
		var printer = require("node-thermal-printer");
		printer.init({
			  type: 'epson',
			  interface: '/dev/usb/lp0'
			});
		printer.isPrinterConnected ( 
			function (isConnected) { 
				if (isConnected) { 
					
					alert("Printer Connected");
				} else { 
					
					alert("Printer Not Connected"); 
				} 
			} 
		)
	}
	// isCameraExists() {

	// 	navigator.getMedia({video: true}, function() {
	// 	  // webcam is available
	// 	  alert('YES')
	// 	}, function() {
	// 	  // webcam is not available
	// 	});
	// 	navigator.mediaDevices.getUserMedia({video: true})
	// 	  .then(function(stream) {
	// 	    alert('connected to the camera')
	// 	  }).catch(function() {
	// 	    alert('could not connect camera');
	// 	  });
  // }
  
	// IsPrinterExists(){
	// 	var printer = require("node-thermal-printer");
	// 	printer.init({
	// 		  type: 'epson',
	// 		  interface: '/dev/usb/lp0'
	// 		});
	// 	printer.isPrinterConnected( function(isConnected){ if(isConnected){alert("Printer Connected");}else{alert("Printer Not Connected")} } )
	// }
  componentDidMount() {
    
    let mycomponent = this;
    this.isCameraExists();
    this.isPrinterExists(); 
       
    var obj = {  
    method: 'Get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token token=8d702b11f4b1fc52d06b90b49750b2217d57831c1b23b25561' 
    }};
    fetch('https://photo-booth-201515.appspot.com/api/v1/photo_booth', obj)  
    .then(function(res) {
      return res.json();
      }).then(function(resjson){
      if(resjson.updated_at === undefined)
      return;
    if(mycomponent.props.apiHost.updated_at!=resjson.updated_at){
      mycomponent.props.onUpdate(resjson);
    }
      
      return resjson;
      })
  }
    
  handleStartPhotoBooth (e) {

    	this.props.history.push('/photobooth');
  }

	render() {
	    return (
	      <div>
	      		<div>
	      			<Button onClick={ ::this.handleStartPhotoBooth }> Photo Booth </Button>
		      		<Link to="/boomerang"><Button> Boomerang </Button> </Link>
		      		<Link to="/setting/email"><Button >Email Setting</Button></Link>
	      		</div>
	      </div>
	    );
	  }
}