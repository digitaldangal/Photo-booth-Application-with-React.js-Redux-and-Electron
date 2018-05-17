import React, { Component } from 'react'
import { NavItem, Navbar, Nav } from 'react-bootstrap'
export default class Header extends Component {
  GoBack () {
    this.props.history.goBack()
  }
  render () {
    return (
      <div className='row'>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href='#brand'>PHOTOBOOTH</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href='#' />
              <NavItem eventKey={2} href='#' onClick={() => this.GoBack()}>
			      		Go Back
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
