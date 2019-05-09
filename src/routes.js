import React from 'react';
import { 
    Redirect,
    Route,
    Switch
} from 'react-router-dom';
import Home from './views/home';
import Admin from './views/admin';
import Market from './views/market';
import Mine from './views/mine';
import Login from './views/login';
import About from './views/about';

import NavBar from './components/navbar.js';

export const Routes = () => {
    return(
        <div>
            <NavBar />
            <Switch>
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
                <Route exact path="/home" component={Home}></Route>
                <Route exact path="/admin" component={Admin}></Route>
                <Route exact path="/market" component={Market}></Route>
                <Route exact path="/mine" component={Mine}></Route>
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/about" component={About}></Route>
                <Route>
                    <Redirect to="/home" />
                </Route>
            </Switch>
        </div>
    )
}