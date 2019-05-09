import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './routes';
import './styles/index.css';
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
    <Router>
        <Routes />
    </Router>, 
    document.getElementById('root')
);