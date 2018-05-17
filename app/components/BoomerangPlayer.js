import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
export default class BoomerangPlayer extends Component {    
  constructor(props){
    super(props);
    this.state={
      index:0,
      email:'',
      render:true
    };
    this.intervalId = 0;
    this.fps = 2;
  }
      static propTypes = {
        images:PropTypes.array.isRequired,
        onDone:PropTypes.func.isRequired,
        onRedo:PropTypes.func.isRequired
      }
      componentDidMount() {          
        this.intervalId = setInterval(::this.timer, 1000/this.fps);        
      }
      componentWillUnmount(){
        clearInterval(this.intervalId);
      }
      timer(){
        this.setState({index:this.state.index + 1});
      }
      shouldComponentUpdate(nextProps, nextState){
        console.log(nextState);
        if(nextState.render == false)
        {
          nextState.render = true;
          return false;              
        }
        return true;
      }
      handleChange = (e) => {
        this.setState({email:e.target.value,render:false});
      }
      handleEmail = ()=> {
        let text = this.state.email;
        let reg = /^\S+@\S+.\S+$/;
        //let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(text) === false)
        {
          alert('Email is Not Correct');
          this.setState({email:text,render:false});
          return false;
        }
        else {
          this.setState({email:text,render:false});   
          alert('Email is Correct');
          this.props.onDone();
        }
        alert(this.state.email);
      }
      render() {
        var len = this.props.images.length;
        const name_list = ['anim1.jpg','anim2.jpg','anim3.jpg','anim4.jpg','anim5.jpg','anim6.jpg','anim7.jpg','anim8.jpg'];
        len = name_list.length;
        var photo = '';
        if(len >0)
        {
          photo = this.props.images[this.state.index%len];
          this.setState({index:this.state.index%len,render:false})
        }
        // if(len >0)
        // {
        //   photo = name_list[this.state.index%len];
        //   this.setState({index:this.state.index%len,render:false});
        // }
        // photo = './image/' + photo;
        return (
          <div className = "container">
            <div className = "row">
              <img src={ photo }  />
            </div>
            <div className = "row">
              <Button type = "submit" onClick={this.handleEmail}>Email</Button>            
              <input type="email" onChange={this.handleChange}/>
              <Button onClick={this.props.onRedo} style={{float:'right'}}>Redo</Button>
              <Button onClick={this.props.onDone} style={{float:'right'}}>Done</Button>
            </div>
          </div>
        );
      }
}