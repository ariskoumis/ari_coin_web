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
            coinPrice: 1,
            buy_qty: 0,
            sell_qty: 0
        };

        this.buyCoins = this.buyCoins.bind(this);
        this.sellCoins = this.sellCoins.bind(this);
        this.updateMarketData = this.updateMarketData.bind(this);
    }

    async componentWillMount() {
        let market_data = await db.getMarketData();
        console.log("hey!")
        console.log(market_data)
        this.setState({
            totalCoins: market_data.totalCoins,
            totalMoney: market_data.totalMoney,
            coinPrice: market_data.coinPrice
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

    async buyCoins(){
        let buy_qty = parseInt(this.state.buy_qty);
        let coinPrice = parseInt(this.state.coinPrice);
        if (isNaN(buy_qty)) {
            alert("Error making purchase - quantity must be number");
            return;
        }

        if (coinPrice * buy_qty > parseInt(this.state.totalMoney)) {
            alert(`You currently have $${this.state.totalMoney}, which cannot cover purchasing ${buy_qty} at a rate of $${coinPrice}`)
            return;
        }

        let purchaseAttempt = await db.buyCoins(buy_qty, coinPrice);
        if (purchaseAttempt.result == "OK") {
            alert("Purchase successful!")
        }

        this.updateMarketData();
    }

    async sellCoins (){
        let sell_qty = parseInt(this.state.sell_qty);
        if (isNaN(sell_qty)) {
            alert("Error making purchase - quantity must be number");
            return;
        }

        if (sell_qty > this.state.totalCoins) {
            alert(`Error making purchase - you don't have ${sell_qty} coins to sell.`)
            return;
        }

        let salesAttempt = await db.sellCoins(sell_qty, this.state.coinPrice);
        if (salesAttempt.result == "OK") {
            alert(`You have successfully sold ${this.state.sell_qty} AriCoins.`);
        }

        this.updateMarketData();
    }
    
    async updateMarketData() {
        let market_data = await db.getMarketData();

        this.setState({
            totalCoins: market_data.totalCoins,
            totalMoney: market_data.totalMoney,
            coinPrice: market_data.coinPrice
        });
    }

    handleChange = (e) =>{
        switch(e.target.id) {
            case "sell-input":
                this.setState({
                    sell_qty: parseInt(e.target.value)
                });
                console.log(this.state.sell_qty)
                break;

            case "buy-input":
                this.setState({
                    buy_qty: parseInt(e.target.value)
                });
                break;

            default:   
                break;
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
                                <CardText>How many?</CardText> 
                                <Input id="buy-input" placeholder="Quantity" onChange={this.handleChange}></Input>
                                <Button onClick={this.buyCoins}> Confirm </Button>
                            </CardBody>
                        </Card>
                        <Card body>
                            <CardHeader>Sell</CardHeader>
                            <CardBody>
                                <span> <CardText>How many?</CardText> 
                                <Input id="sell-input" placeholder="Quantity" onChange={this.handleChange}></Input> </span>
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