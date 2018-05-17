import React, { Component } from 'react';
import Webcam from 'react-webcam';
import PropTypes from 'prop-types';
import CountDown from '../components/layout/countdown';

const COUNT_DOWN_SECONDS = 5;
const COUNT_DOWN_RESTART_AFTER = 5*1000;

//import './take.scss';

export default class BoomerangTake extends Component {
   constructor (props) {
    super(props);
    this.audio =  new Audio('./sound/camera-shutter-click.wav')
    this.state = {
      smile:false,
      first_entrance:true,      
      interval_id:0,
      show_flash:false,
      data_of_photos_taken : [],
    };
  }
  static propTypes = {
    onBoomerangPhotoCaptured:PropTypes.func.isRequired,
  }
  componentDidMount() {
    setTimeout(()=>{this.refs.countdown.setactive();},3*1000)
  }
  componentWillReceiveProps (props) {
    console.log("WillReceiveProps")
    clearInterval(this.state.interval_id)
    const { photos } = this.props.boomerang.boomerang_photos;
  }
  handleOnCountDownFinish () {
    this.setState({smile:true});
    setTimeout(
      () => {
        console.log("Get Boomerang")
          var intervalId = setInterval(::this.timer, 100);
          this.state.interval_id = intervalId
          this.setState({show_flash:true})
      },1000
    )
  }
  timer() {
   // setState method is used to update the state
   this.audio.currentTime = 0
   this.audio.play() 
   this.state.data_of_photos_taken.push(this.refs.webcam.getScreenshot())

   console.log(this.state)
   if(this.state.data_of_photos_taken.length >= this.props.boomerang.Boomerang_Photos_Once_CAPTURED)
    this.props.onBoomerangPhotoCaptured(this.state.data_of_photos_taken)
  }

  render () {
    console.log("Boomerang Render Render  ")
    const photos = this.props.boomerang.boomerang_photos;

    let webcamClassName;
    let myname;
    let imageClsssName;
    var text = "Ok! Get Ready ...";
    let flashClassName = "flash-hide";

    imageClsssName = "display-none";
    myname = "photos-webcam "
    webcamClassName = "webcam"
    if(this.state.smile)
    {
      text = "SMILE!"
    }

    if(this.state.first_entrance){
      myname = myname + "camera-enter";
    }else
    {
      myname = myname +"camera-show "
    }
    if(this.state.show_flash){
      flashClassName ="flash-show"
    }
    console.log(photos)   
    return (     
        <div className="photo-take">
          <div className={flashClassName}>
          </div>
          <div className={myname}>
            <CountDown
              seconds={ COUNT_DOWN_SECONDS }
              onCountDownFinish={ ::this.handleOnCountDownFinish }
              ref="countdown" />

            <div style={{ zIndex:2 ,position:"absolute",top:"50%",color:"red",width:"100%",textAlign:"center"}}>
              <h1>{text} Camera </h1>
            </div>
            <div>
              <Webcam ref="webcam" audio={ false } className={ webcamClassName } style={{zIndex:-1,backgroundColor: "coral"}}/>
            </div>
          </div>
        </div>
    );
  }
}
