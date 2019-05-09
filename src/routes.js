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

import NavBar from './views/navbar.js';

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
                <Route>
                    <Redirect to="/home" />
                </Route>
            </Switch>
        </div>
    )
}