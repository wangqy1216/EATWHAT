import {Switch, Route, Redirect} from "react-router-dom";
import { Input } from 'antd';

import React, {Component} from 'react';
// import Login from "./Login";
import Home from "./Home";
import Customer from "./Customer";
import Attendant from "./Attendant";

class Main extends Component {

    render() {
        return (

            <div className="main">
                {/*<Input placeholder="Basic usage" />*/}
                <Switch>


                    <Route path = "/home" component={Home} />
                    <Route path = "/customer" component={Customer}/>
                    <Route path = "/attendant" component={Attendant}/>

                </Switch>


            </div>
        );
    }


    getHome = () => {
        return this.props.isLoggedIn ? <Home/> : <Redirect to="/login"/>;
    }

}

export default Main;
