import React from 'react';
import {
    Container,
    Card,
    CardTitle,
    Row,
    Col,
    Input,
    InputGroup,
    InputGroupAddon,
    Button
    } from 'reactstrap';
import db from '../utils/db_wrapper';

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            marketValue: null,
            miningCap: null
        };

        this.saveChanges = this.saveChanges.bind(this);
    }
    
    async loggedIn() {
        let logged_in = await db.loggedIn();
        if (logged_in.result) {
            
            let is_admin = await db.currentUserIsAdmin();
            if (is_admin.result) {
                return true;
            }
            else {
                alert("Error: You're logged in, but you're not Ari - impostor!!!");
                this.props.history.push("/home");
                return false;
            }

        } else {
            alert("Error: You must log in before visitng the Market!");
            this.props.history.push("/home")
            return false;
        }
    }

    async componentWillMount() {
        this.setState({
            marketValue: await this.getMarketValue(),
            miningCap: await this.getMiningCap()
        })
    }

    async getMarketValue() {
        let market_value_req = await db.getMarketValue();
        console.log(market_value_req.result);
        return market_value_req.result;
    }

    async getMiningCap() {
        let mining_cap_req = await db.getMiningCap();
        console.log(mining_cap_req.result);
        return mining_cap_req.result;
    }

    async saveChanges() {
        db.updateCoinData(this.state.marketValueInput, this.state.miningCapInput);
        this.setState({
            marketValue: await this.getMarketValue(),
            miningCap: await this.getMiningCap()
        })
    }

    handleChange = (e) => {
        switch(e.target.id) {
            case "market-value":
                this.setState({
                    marketValueInput: e.target.value
                });
                break;
            case "mining-cap":
                this.setState({
                    miningCapInput: e.target.value
                });
                break;
            default:
                break;
        }
    }

    render() {
        if (this.loggedIn()) {
            return (
                <Container>
                    <Card body>
                        <CardTitle>Login</CardTitle>
                        <InputGroup>
                            <InputGroupAddon className="input-group-text" addonType="prepend"> MarketValue (current: ${this.state.marketValue}) </InputGroupAddon>
                            <Input onChange={this.handleChange} id="market-value" placeholder={this.state.marketValue} />
                        </InputGroup>
                        <InputGroup>
                            <InputGroupAddon className="input-group-text" addonType="prepend"> Mineable AriCoins per User (current: {this.state.miningCap}) </InputGroupAddon>
                            <Input onChange={this.handleChange} id="mining-cap" placeholder={this.state.miningCap} />
                        </InputGroup>
                        <Button block onClick={this.saveChanges}>Save Changes</Button>
                        {/* <Button color ="danger" block onClick={this.removeAllUsers}>Remove All Users</Button> */}
                    </Card>
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