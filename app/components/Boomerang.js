import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default class Boomerang extends Component {
  render() {
    return (
      <div>
        <h2>Boomerang Page</h2>
        <Link to="/boomerang/take" ><Button> TapToStart </Button> </Link>
      </div>
    );
  }
}
