import React from 'react';
import { 
    Button,
    Card, 
    CardImg, 
    CardText, 
    CardBody,
    CardTitle, 
    CardSubtitle,
    Col,
    Container,
    Row } from 'reactstrap';
import {
    FaArrowRight,
    FaAmilia,
    FaShoppingCart,
    FaIndustry
    } from "react-icons/fa";
import {
    Link
} from 'react-router-dom';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    
    render() {
        return (
            <Container>
                <Row>
                    <Col sm="4">
                    <Card body>
                        <CardTitle>Admin</CardTitle>
                        <FaAmilia size={70} />
                        <CardText>ARI ONLY - KEEP OUT!</CardText>
                        <Button tag={Link} to="/admin"> <FaArrowRight/> </Button>
                    </Card>
                    </Col>
                    <Col sm="4">
                    <Card body>
                        <CardTitle>Market</CardTitle>
                        <FaShoppingCart size={70} />
                        <CardText>Buy, sell, montior AriCoins</CardText>
                        <Button tag={Link} to="/market"> <FaArrowRight/> </Button>
                    </Card>
                    </Col>
                    <Col sm="4">
                    <Card body>
                        <CardTitle>Mine</CardTitle>
                        <FaIndustry size={70} />
                        <CardText>Earn AriCoins for free!</CardText>
                        <Button tag={Link} to="/mine"> <FaArrowRight/> </Button>
                    </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}