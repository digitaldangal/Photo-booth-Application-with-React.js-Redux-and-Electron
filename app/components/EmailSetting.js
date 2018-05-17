import React, { Component } from 'react';
import {FormGroup,Form,FormControl,HelpBlock,ControlLabel,Button} from 'react-bootstrap'
function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default class EmailSetting extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    	email:props.email,
    	password:props.password,
    };
  }
  componentDidMount() {
    console.log(this)
  }
  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  
  handleChange = (e) => {

    this.setState({ [e.target.name]: e.target.value });    
  }
  handleSubmit = (e) => {
  	this.props.onChangeEmailSetting({"email":this.state.email,"password":this.state.password})
  }

  render() {
  	console.log(this.state)
    return (
    	<div>
	    <FieldGroup
	      id="formControlsEmail"
	      type="email"
	      value = {this.state.email}
	      name = "email"
	      label="Email address"
	      placeholder="Enter email"
	      onChange={this.handleChange}
	    />
	    <FieldGroup id="formControlsPassword" label="Password" name="password" value={this.state.password} type="password" onChange={this.handleChange} />
        <Button onClick = {this.handleSubmit}>Submit</Button>
        </div> 
    );
  }
}
