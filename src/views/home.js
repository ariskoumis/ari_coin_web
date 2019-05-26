import React from 'react';
import { 
    Button,
    Card, 
    CardImg, 
    CardText, 
    CardBody,
    CardHeader,
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
                        <CardHeader>Admin</CardHeader>
                        <CardBody>
                            <FaAmilia size={70} />
                            <CardText>ARI ONLY - KEEP OUT!</CardText>
                            <Button tag={Link} to="/admin"> <FaArrowRight/> </Button>
                        </CardBody>
                    </Card>
                    </Col>
                    <Col sm="4">
                    <Card body>
                        <CardHeader>Market</CardHeader>
                        <CardBody>
                            <FaShoppingCart size={70} />
                            <CardText>Buy, sell, montior AriCoins</CardText>
                            <Button tag={Link} to="/market"> <FaArrowRight/> </Button>
                        </CardBody>
                    </Card>
                    </Col>
                    <Col sm="4">
                    <Card body>
                        <CardHeader>Mine</CardHeader>
                        <CardBody>
                            <FaIndustry size={70} />
                            <CardText>Earn AriCoins for free!</CardText>
                            <Button tag={Link} to="/mine"> <FaArrowRight/> </Button>
                        </CardBody>
                    </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}