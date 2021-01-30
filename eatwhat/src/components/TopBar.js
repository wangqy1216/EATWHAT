import React, {Component} from 'react';
import logo from "../assets/images/aalogo.png";
import Icon from '@ant-design/icons';

class TopBar extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <span className= "App-title">E</span>
                <span className= "Big-A">A</span>
                <span className= "App-title">TWH</span>
                <span className= "Big-A" >A</span>
                <span className= "App-title">T</span>
                {this.props.isLoggedIn ?
                    <a className="logout" onClick={this.props.handleLogout} >
                        <Icon type="logout"/>{' '}Logout
                    </a> : null }

            </header>
        );
    }
}

export default TopBar;
