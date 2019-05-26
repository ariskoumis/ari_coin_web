import React from 'react';
import {
    Container,
    Card,
    Row,
    Col,
    Button,
    CardTitle,
    CardHeader,
    CardBody,
    Input,
    InputGroupAddon,
    InputGroup
    } from 'reactstrap';
import {
    Redirect
} from 'react-router-dom';
import db from '../utils/db_wrapper';
import { declareExportAllDeclaration } from '@babel/types';

export default class Mine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mineableCoins: 0,
            coinsMined: 0,
            buttonClickedCount: 0,
            complement: null
        };

        this.mineCoins = this.mineCoins.bind(this);
        this.submitComplement = this.submitComplement.bind(this);
    }

    async componentWillMount() {
        let miningCap = await db.getMiningCap();
        console.log(miningCap)
        this.setState({
            mineableCoins: miningCap.result
        });
    }

    async loggedIn() {
        let logged_in = await db.loggedIn();

        if (logged_in.result) {
            return true
        } else {
            alert("Error: You must log in before visitng the Mine!");
            this.props.history.push("/home")
            return false;
        }
    }

    async getMineableCoins() {
        // let coin_count = await db.getMineableCoins();

        this.setState({
            mineableCoins: 0
        })
    }

    async mineCoins() {
        let prev_count = this.state.buttonClickedCount;
        let prev_coins_mined = this.state.coinsMined;
        this.setState({
            buttonClickedCount: prev_count + 1
        }, async () => {
            if (this.state.buttonClickedCount % 5 == 0 ) {
                await db.buyCoins(1, 0);
                alert("Success: You mined 1 coin!")
                this.setState({
                    buttonClickedCount: 0,
                    coinsMined: prev_coins_mined + 1
                })
            }
        });
    }

    async submitComplement() {
        let analytics = await fetch (
                `/api/submitComplement?text=${encodeURIComponent(this.state.complement)}`
            );
        // let peepee = await analytics.body.getReader().read();
        let result = await analytics.json();

        if (result.tones.length == 0) {
            alert("Your complement was rejected. Do better next time. \n Tip: Write more to increase your chances")
            return;
        }
        if (this.state.complement.toLowerCase().indexOf("ari") ==  -1) {
            alert("You didn't mention Ari at all! How dare you!");
            return;
        }

        result.tones.forEach((tone) => {
            if (tone.tone_id ==  "joy" && tone.score  > .5) {
                let score = Math.ceil(tone.score * 10);
                db.buyCoins(score, 0);
                alert(`Ari appreciates your kind words. You recieve ${score} AriCoins`);
            } else {
                alert(`Ari rejects your complement. Try harder next time.`);
            }
        })
    }

    handleChange = (e) => {
        switch(e.target.id) {
            case "complement-input":
                this.setState({
                    complement: e.target.value
                });
                break;
        } 
    }

    render() {
        if (this.loggedIn()) {
            return(
                <Container>
                    <Row>
                    <Col sm="6">
                        <Card body>
                            <CardHeader>Click Farm</CardHeader>
                            <CardBody>
                                You can mine {this.state.mineableCoins - this.state.coinsMined} more coins.
                                <br/>
                                Click the button below {5 - this.state.buttonClickedCount} more times for free coins!
                                <Button onClick={this.mineCoins} color="primary" block>Mine</Button>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="6">
                        <Card body>
                            <CardHeader>Complement Farm</CardHeader>
                            <CardBody>
                                Please write something nice about Ari!
                                <InputGroup>
                                    <Input onChange={this.handleChange} id="complement-input" placeholder="Ari is a great web developer!!"></Input>
                                    <InputGroupAddon addonType="append"><Button onClick={this.submitComplement} color="secondary">Submit</Button></InputGroupAddon>
                                </InputGroup>
                                
                            </CardBody>
                                
                        </Card>
                    </Col>
                    </Row>
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