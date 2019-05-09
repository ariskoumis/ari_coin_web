import React from 'react';
import {
    Container,
    Card,
    Row,
    Col,
    Button,
    CardTitle,
    CardBody
    } from 'reactstrap';
import {
    Redirect
} from 'react-router-dom';
import db from '../utils/db_wrapper';

export default class Mine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    async loggedIn() {
        let logged_in = await db.loggedIn();

        if (logged_in.result) {
            return true
        } else {
            alert("Error: You must log in before visitng the Market!");
            this.props.history.push("/home")
            return false;
        }
    }

    render() {
        if (this.loggedIn()) {
            return(
                <Container>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <Card body>
                            <CardTitle>Login</CardTitle>
                            <CardBody>Click the button below for free coins!</CardBody>
                            <Button color="primary" block>Login</Button>
                        </Card>
                    </Col>
                </Container>
            );
        } else {
            return(
                <Container>
                    
                </Container>
            )
        }
        
    }
}