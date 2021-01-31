import React, {Component} from 'react';

class FlightInfo extends Component {
    state = {
        info: ''
    }
    componentDidMount() {
        // const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "https://flights-engine.herokuapp.com/flights?date=";
        var utc = new Date().toJSON().slice(0,10);
        fetch(url.concat(utc), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                    // console.log(data);
                    this.setState({
                        info: data
                    });
                }
            )
            .catch((err) => {
                console.error(err);
                // message.error('NO Orders');
            });

    }


    render() {
        // console.log(this.state.info);
        let i, infoArr = this.state.info;
        for (i = 0; i < infoArr.length; i++) {
            let text = infoArr[i];
            console.log(text)
        }
        return (
            <div>

            </div>
        );
    }
}

export default FlightInfo;
