import React from 'react';
import {
    Row,
    Col,
    Modal,
    Button,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    InputGroup,
    InputGroupAddon,
    } from 'reactstrap';
import { 
    FaLock,
    FaUserAlt,
    FaTimes,
    FaBreadSlice
    } from "react-icons/fa";

export default class NewUserModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };

      this.createAccount = this.createAccount.bind(this);
    }

    toggle = () => {
        this.props.toggleModal()
    }

    async createAccount() {
        let accountCreateAttempt = await this.props.createAccount(this.state.username, this.state.password);
        if (accountCreateAttempt.result == 1) {
            alert("Login Successful!");
        } else {
            alert(`Login Failed! Reason: ${accountCreateAttempt.reason}`);
        }
    }

    handleChange = (e) =>{
        switch(e.target.placeholder) {
            case "username":
                this.setState({
                    username: e.target.value
                });
                break;

            case "password":
                this.setState({
                    password: e.target.value
                });
                break;

            default:   
                break;
        }
    }
  
    render() {
      return (
            <Modal isOpen={this.props.modalOpened} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>
                New User                    
            </ModalHeader>
            <ModalBody>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <InputGroup>
                        <InputGroupAddon className="input-group-text" addonType="prepend"> <FaUserAlt /> </InputGroupAddon>
                        <Input onChange={this.handleChange} placeholder="username" />
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon className="input-group-text"   addonType="prepend"> <FaLock /> </InputGroupAddon>
                        <Input onChange={this.handleChange} placeholder="password" type="password"/>
                    </InputGroup>
                </Col>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.createAccount}>Create Account</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
            </Modal>
      );
    }
  }