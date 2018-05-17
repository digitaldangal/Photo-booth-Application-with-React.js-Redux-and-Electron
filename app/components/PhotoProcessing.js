import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button,ButtonToolbar,Input} from 'react-bootstrap'
import ReactToPrint from "react-to-print";
import 'html2canvas'
export default class PhotoProcessing extends Component {
  constructor(props)
  {
    super(props)
    this.state ={
      email:""
    }
  }
  upload_picture(){
    console.log("############",this)
    if(this.props.photo.PrintablePhoto)
    {
      var payload = {
        'image': {
          'picture_file_name': 'guapo.jpg',
          'base64': this.props.photo.PrintablePhoto
        }
      }
      var obj = {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token token=8d702b11f4b1fc52d06b90b49750b2217d57831c1b23b25561' 
        },
        body: JSON.stringify(payload)
      };
      console.log("==============================================")
      fetch('https://photo-booth-201515.appspot.com/api/v1/images', obj)  
      .then(function(res) {
        return res.json();
       }).then(function(resjson){
          //alert(JSON.stringify( resjson ) )
        })
    }
  }
  componentDidMount() {
    console.log("DID MOUNT BEFORE 1000")
      // html2canvas = require('html2canvas')
      let html2canvas = require('html2canvas')
      html2canvas(this.refs.mydiv).then(canvas => {
        const dataURL = canvas.toDataURL()
        this.props.onSavePrintablePhoto(dataURL)
      });

      if(navigator.onLine){
        this.upload_picture()
      }else{
        alert("NO INTERNET CONNECT")
      }

      // const canvas = this.refs.canvas
      // const ctx = canvas.getContext("2d")
      // console.log("PHOTOS ssssssssssssssssssssssssssssssss",this.props)
      // const { photos } = this.props.photo;
      // let img = this.refs.img
      // photos.map((photo, index) =>
      //   {
          
      //     img.onload = function(){
      //       ctx.drawImage(img,100,100)            
      //     }
      //     img.src = photo;
      //   }  
      // );

      console.log("DID MOUNT AFTER 1000")
  }
  handleChange = (e) => {
    this.setState({email:e.target.value})
  }
  handleEmail = ()=> {
    let text = this.state.email
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(text) === false)
    {
        alert("Email is Not Correct");
        this.setState({email:text})
        return false;
    }
    else {
      this.setState({email:text})
      console.log(this)
      alert("Email is Correct");
      var nodemailer = require('nodemailer');
      var transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
              user: this.props.emailInfo.email,
              pass: this.props.emailInfo.password
          }
      });
      const mailOptions = {
        from: this.props.emailInfo.email, // sender address
        to: this.state.email, // list of receivers
        subject: 'Subject of your email', // Subject line
        html: '<p>Your html here</p>'// plain text body
        //html:'<img src = "' +{this.props.photo.PrintablePhoto} + '"/>'
      };
      transporter.sendMail(mailOptions, function (err, info) {
         if(err)
           console.log(err)
         else
         {
            alert("SuccessFully Sent")
            this.props.onEmailPassed();
           console.log(info);          
         }
      });
      
    }
    alert(this.state.email)
  }
  handlePrint= () => {
    const {remote} = require('electron');
    const {BrowserWindow, dialog, shell} = remote;
    let printWindow = new BrowserWindow({'auto-hide-menu-bar':true});
    
    var my_content = '<img src ="'+this.props.photo.PrintablePhoto+'" ></img>'
    var content_template = 'data:text/html;charset=utf-8,<html><head></head><body>'+ my_content +'</body></html>'
    console.log(my_content)
    printWindow.loadURL(content_template);
    printWindow.show()
    printWindow.webContents.on('did-finish-load', function() {
        if (printWindow)
            printWindow.webContents.print();
    });
  }
  render(){
      const { photos } = this.props.photo;
      let style_photo1 = {backgroundImage:"url("+photos[0]+")",backgroundSize:"cover",height:300,}
      // let style_photo2 = {backgroundImage:"url("+photos[1]+")",backgroundSize:"cover",height:300,}
      let style_photo3 = {backgroundImage:"url("+photos[2]+")",backgroundSize:"cover",height:300,}
      let style_photo4 = {backgroundImage:"url("+photos[3]+")",backgroundSize:"cover",height:300,}

      // let style_photo1 = {backgroundImage:"url('./image/1.jpg')",backgroundSize:"cover",height:300,}
      let style_photo2 = {backgroundImage:"url('./image/anim1.jpg')",backgroundSize:"cover",height:300,}
      // let style_photo3 = {backgroundImage:"url('./image/3.jpg')",backgroundSize:"cover",height:300,}
      // let style_photo4 = {backgroundImage:"url('./image/4.png')",backgroundSize:"cover",height:300,}
      return (
        
        <div className="container">
          <h1>PhotoProcessing ...</h1>
              <Button type = "submit" onClick={this.handleEmail}>Email</Button>            
              <input type="email" onChange={this.handleChange}/>
        <ReactToPrint
          trigger={() => <Button style={{float:"right"}}>Print</Button>}
          content={() => this.refs.mydiv}
        />
        <Button onClick = {this.handlePrint} style={{float:"right"}}> Own Print</Button>
          <div ref = "mydiv" id = "print_id" className="row">
            <div className ="row">
              <div className = "col-md-3" style = {style_photo1}> </div>
              <div className = "col-md-3" style = {style_photo2}> </div>
            </div>
            <div className="row">
              <div className = "col-md-3" style = {style_photo3}> </div>
              <div className = "col-md-3" style = {style_photo4}> </div>
            </div>
          </div>
        </div>
      );
  }
}
