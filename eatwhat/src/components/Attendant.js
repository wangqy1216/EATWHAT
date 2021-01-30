import React, {Component} from 'react';
import AttendantLogin from "./AttendantLogin";
import {Redirect, Route, Switch} from "react-router-dom";

class Attendant extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path = "/attendant/login" component={AttendantLogin}/>

                    <Redirect exact from="/attendant" to="/attendant/login" />

                </Switch>
            </div>
        );
    }
}

export default Attendant;
