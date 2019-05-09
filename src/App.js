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
import NavBar from './components/navbar.js';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <Container>
      <NavBar />
      <Row>
        <Col sm="4">
          <Card body>
            <CardTitle>Special Title Treatment</CardTitle>
            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            <Button>Go somewhere</Button>
          </Card>
        </Col>
        <Col sm="4">
          <Card body>
            <CardTitle>Special Title Treatment</CardTitle>
            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            <Button>Go somewhere</Button>
          </Card>
        </Col>
        <Col sm="4">
          <Card body>
            <CardTitle>Special Title Treatment</CardTitle>
            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            <Button>Go somewhere</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
