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

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newUser: false 
        };
    }

    render() {
        return (
            <Container>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Card body>
                    <CardTitle>Login</CardTitle>
                    <InputGroup>
                        <InputGroupAddon className="input-group-text" addonType="prepend"> <FaUserAlt /> </InputGroupAddon>
                        <Input placeholder="username" />
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon className="input-group-text"   addonType="prepend"> <FaLock /> </InputGroupAddon>
                        <Input placeholder="password" />
                    </InputGroup>
                    <Row>
                        <Col>
                            <Button color="primary" block>Login</Button>
                        </Col>
                        <Col>
                            <Button block>New User?</Button>  
                        </Col>
                    </Row>
                </Card>
                </Col>
            </Container>
        );
    }
}