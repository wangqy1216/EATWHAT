import React, {Component} from 'react';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';

class Confirm extends Component {
  render() {
    const {orderID} = localStorage;
    return (
        <div className="confirm">
          <h1>Thank you for your order.</h1>
          <h1>
            Enjoy your flight !
            <FlightTakeoffIcon color="primary" style={{fontSize:40}}/>
          </h1>
          <h2>Your order number is {orderID}</h2>
          <h4>The detail of your order is sent to your phone number.</h4>
        </div>
    );
  }
}

export default Confirm;