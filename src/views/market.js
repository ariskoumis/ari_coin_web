import React from 'react';
import {
    Container
    } from 'reactstrap';
import {
    Redirect
} from 'react-router-dom';
import db from '../utils/db_wrapper';           


export default class Market extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    async loggedIn() {
        let logged_in = await db.loggedIn();

        if (logged_in.result) {
            return true;
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
                    Market!
                </Container>
            );
        } else {
            return (
                <Container>
                    
                </Container>
            )
        }
    }
}