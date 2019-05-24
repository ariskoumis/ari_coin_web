import React from 'react';
import {
    Container
    } from 'reactstrap';
import {
    FaArrowRight,
    FaAmilia,
    FaShoppingCart,
    FaIndustry
    } from "react-icons/fa";
import {
    Link
} from 'react-router-dom';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardText,
    Button,
    Input,
    InputGroupAddon,
    InputGroup
} from 'reactstrap';
import db from '../utils/db_wrapper';           


export default class Market extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalCoins: 1,
            totalMoney: 1,
            coinPrice: 1
        };
    }

    async componentWillMount() {
        let market_data = db.getMarketData();
        this.setState({
            totalCoins: market_data.total_coins,
            totalMoney: market_data.total_money,
            coinPrice: market_data.coin_price
        });
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
                    <Row>
                        <Card body>
                            <CardHeader>Your Wallet</CardHeader>
                            <CardBody>
                                <CardText>AriCoins: {this.state.totalCoins}</CardText>
                                <CardText>Money: ${this.state.totalMoney}</CardText>
                            </CardBody>
                        </Card>
                        <Card body>
                            <CardHeader>Analytics</CardHeader>
                            <CardBody>
                                <CardText>Current AriCoin Value: ${this.state.coinPrice}</CardText>
                            </CardBody>
                        </Card>
                    </Row>
                    <Row>
                        <Card body>
                            <CardHeader>Buy</CardHeader>
                            <CardBody>
                                <CardText>How many?</CardText> <Input placeholder="price"></Input>
                                <Button onClick={this.buyCoins}> Confirm </Button>
                            </CardBody>
                        </Card>
                        <Card body>
                            <CardHeader>Sell</CardHeader>
                            <CardBody>
                                <span> <CardText>How many?</CardText> <Input placeholder="price"></Input> </span>
                                <Button onClick={this.sellCoins}> Confirm </Button>
                            </CardBody>
                        </Card>
                    </Row>
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