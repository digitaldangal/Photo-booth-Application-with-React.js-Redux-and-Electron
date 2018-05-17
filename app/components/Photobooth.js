import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WebcamCapture from '../components/webcam';
import Webcam from 'react-webcam';
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';

export default class PhotoBooth extends Component {


  render() {
    return (
      <div>
        <h2>PhotoBooth Page</h2>        
        <Link to="/photobooth/take" ><Button> TapToStart </Button> </Link>
      </div>
    );
  }
}
