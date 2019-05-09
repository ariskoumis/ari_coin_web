import { 
    FaLock,
    FaUserAlt
    } from "react-icons/fa";
import React from 'react';
import {
    Button,
    Card,
    CardText,
    CardTitle,
    Col,
    Container,
    Input,
    InputGroup,
    InputGroupAddon,
    Row,
    } from 'reactstrap';
import NewUserModal from '../components/new_user_modal';
import db from '../utils/db_wrapper';                

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newUser: false,
            modalOpened: false
        };

        this.handleLoginAttempt = this.handleLoginAttempt.bind(this);
    }

    toggleModal = () => {
        this.setState(prevState => ({
            modalOpened: !prevState.modalOpened
        }));
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

    async handleLoginAttempt() {
        let loginAttempt = await db.attemptLogin(this.state.username, this.state.password);
        console.log(loginAttempt)
        if (loginAttempt.result == 1) {
            alert("Login Successful!");
        } else {
            alert(`Login failed! Reason: ${loginAttempt.reason}`);
        }

    }

    render() {
        return (
            <Container>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Card body>
                        <CardTitle>Login</CardTitle>
                        <InputGroup>
                            <InputGroupAddon className="input-group-text" addonType="prepend"> <FaUserAlt /> </InputGroupAddon>
                            <Input onChange={this.handleChange} placeholder="username" />
                        </InputGroup>
                        <InputGroup>
                            <InputGroupAddon className="input-group-text"   addonType="prepend"> <FaLock /> </InputGroupAddon>
                            <Input onChange={this.handleChange} placeholder="password" />
                        </InputGroup>
                        <Row>
                            <Col>
                                <Button onClick={this.handleLoginAttempt} color="primary" block>Login</Button>
                            </Col>
                            <Col>
                                <Button onClick={this.toggleModal} block>New User?</Button>  
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <NewUserModal modalOpened={this.state.modalOpened} toggleModal={this.toggleModal} createAccount={db.createAccount}/>
            </Container>
        );
    }
}