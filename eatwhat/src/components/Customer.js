import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import CustomerCheckin from "./CustomerCheckin";
import ChooseMeal from "./ChooseMeal";

class Customer extends Component {
  render() {
    return (
        <div>
          <Switch>
            <Route path = "/customer/checkin" component={CustomerCheckin}/>
            <Route path="/customer/choose" component={ChooseMeal} />

            <Redirect exact from="/customer" to="/customer/checkin" />
          </Switch>
        </div>
    );
  }
}

export default Customer;