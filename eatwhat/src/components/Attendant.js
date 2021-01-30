import React, {Component} from 'react';
import AttendantLogin from "./AttendantLogin";
import {Redirect, Route, Switch} from "react-router-dom";
import AttendantPanel from "./AttendantPanel";

class Attendant extends Component {

    render() {
        return (
            <div>

                <Switch>
                  <Route path = "/attendant/login" component={AttendantLogin}/>
                  <Route path = "/attendant/panel" component={AttendantPanel}/>
                  <Redirect exact from="/attendant" to="/attendant/login" />

                </Switch>

            </div>
        );
    }
}

export default Attendant;
