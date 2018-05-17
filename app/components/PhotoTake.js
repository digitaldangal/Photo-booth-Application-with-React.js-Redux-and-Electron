import React, { Component } from 'react';
import Webcam from 'react-webcam';
import PropTypes from 'prop-types';
import CountDown from '../components/layout/countdown';
import Sound from 'react-sound';

const COUNT_DOWN_SECONDS = 5;
const COUNT_DOWN_RESTART_AFTER = 5*1000;

//import './take.scss';

export default class PhotoTake extends Component {
   constructor (props) {
    super(props);
    this.state = {
      isWebcamActive: true,
      smile:false,
      show_flash:false,
      first_entrance:true,      
    };
  }
  static propTypes = {
    onLastPhotoCaptured:PropTypes.func.isRequired,
    onPhotoCaptured:PropTypes.func.isRequired,
  }
  componentDidMount() {
    setTimeout(()=>{this.refs.countdown.setactive();},3*1000)
  }
  componentWillReceiveProps (props) {
    const { photos } = this.props.photo;
    setTimeout(
      ()=>{
        this.setState({
          isWebcamActive: false,
          show_flash:false,
          smile:false,
          first_entrance:false
        });
      },2000
    )

    const { shouldStopCapture } = props.photo;

    setTimeout(() => {
      if (shouldStopCapture) {
        this.props.history.push('/photobooth/processing');
        return;
      }
      this.goon()
    }, COUNT_DOWN_RESTART_AFTER);
  }

  goon(){
    this.setState({smile:false,show_flash:false,isWebcamActive:true})
    setTimeout(
      ()=>{
        this.refs.countdown.reset() 
      },1000
    )    
  }  
  handleOnCountDownFinish () {
    const { number_of_remain } = this.props.photo;
    this.setState({smile:true});
    setTimeout(
      () => {
        console.log("Get Photo")
        if (number_of_remain <=1) {          
          this.props.onLastPhotoCaptured(this.refs.webcam.getScreenshot())
          return;
        }
        this.props.onPhotoCaptured(this.refs.webcam.getScreenshot())        
      },1000
    )
    setTimeout(
      ()=> {
        console.log(" Trigger Flash ");
        this.setState({show_flash:true})
      },1100
    )
  }

  render () {
    console.log("Render Render Render Render ")
    console.log(this.props)
    const { photos } = this.props.photo;
    const lastPhoto = photos[photos.length - 1];

    let webcamClassName;
    let myname;
    let imageClsssName;
    var text = "Ok! Get Ready ...";
    let flashClassName = "flash-hide"
    let shutter_sound_status = Sound.status.STOPPED
    
    imageClsssName = "display-none";
    myname = "photos-webcam "
    webcamClassName = "webcam"
    

    if(this.state.smile)
    {
      text = "SMILE!"
    }

    if(this.state.first_entrance){
      myname = myname + "camera-enter ";
    }else if(this.state.isWebcamActive)
    {
      myname = myname +"camera-show "
    }

    if(this.state.show_flash)
    {
      flashClassName ="flash-show"
      shutter_sound_status = Sound.status.PLAYING
    }
    if (!this.state.isWebcamActive) {
      myname = myname + "display-none "
      webcamClassName = 'display-none '; 
      imageClsssName = "position-relatvie";
      text ="Nice!";
    }
    return (        
        <div className="photo-take">
          <div className={flashClassName}>
            <Sound          
              url="./sound/camera-shutter-click.wav"
              playStatus={shutter_sound_status}
              playFromPosition={0 /* in milliseconds */}
            />
          </div>
          <div className={myname}>
            <CountDown
              seconds={ COUNT_DOWN_SECONDS }
              onCountDownFinish={ ::this.handleOnCountDownFinish }
              ref="countdown" />
            <div style={{ position:"absolute",top:"50%",color:"red",width:"100%",textAlign:"center"}}>
              <h1>{text} Camera </h1>
            </div>
            <div style={{zIndex:-1,textAlign:"center"}}>
              <Webcam ref="webcam" audio={ false } className={ webcamClassName } style={{backgroundColor: "coral"}}/>
            </div>

            <div className="photo-list">
              <ul>
                {
                  photos.map((photo, index) =>
                    <li key={index} style = {{float:"left"}}>
                    <img src={ photo } width = "50px" height="50px"/>
                    </li>
                  )
                }
              </ul>
            </div>
          </div>
          <div className={imageClsssName}>
            <div style = {{textAlign:"center"}}>
              <img src={ lastPhoto } className="photo-last-img" style={{zIndex:-1}} />
            </div>
            <div style={{position:"absolute",top:"50%",color:"red",width:"100%",textAlign:"center"}}>
              <h1>{text}</h1>
            </div>
          </div>
        </div>
    );
  }
}
