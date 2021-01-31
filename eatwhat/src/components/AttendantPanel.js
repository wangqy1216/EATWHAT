import React, {Component} from 'react';
import SeatPicker from 'react-seat-picker';
import {Button, Row, Col, Card, message} from "antd";
import {Link} from "react-router-dom";
import customer from "../assets/images/customer-card.jpg";
import attendant from "../assets/images/attendant-card.jpg";
import {BASE_URL} from "../constants";
class AttendantPanel extends Component {
    state = {
        loading: false
    };

    addSeatCallback = ({ row, number, id }, addCb) => {
        this.setState(
            {
                loading: true
            },
            async () => {
                await new Promise(resolve => setTimeout(resolve, 1500));
                console.log(`Added seat ${number}, row ${row}, id ${id}`);
                const newTooltip = `tooltip for id-${id} added by callback`;
                addCb(row, number, id, newTooltip);
                this.setState({ loading: false });
            }
        );
    };

    addSeatCallbackContinousCase = (
        { row, number, id },
        addCb,
        params,
        removeCb
    ) => {
        this.setState(
            {
                loading: true
            },
            async () => {
                if (removeCb) {
                    await new Promise(resolve => setTimeout(resolve, 750));
                    console.log(
                        `Removed seat ${params.number}, row ${params.row}, id ${params.id}`
                    );
                    removeCb(params.row, params.number);
                }
                await new Promise(resolve => setTimeout(resolve, 750));
                console.log(`Added seat ${number}, row ${row}, id ${id}`);
                const newTooltip = `tooltip for id-${id} added by callback`;
                addCb(row, number, id, newTooltip);
                this.setState({ loading: false });
            }
        );
    };

    removeSeatCallback = ({ row, number, id }, removeCb) => {
        this.setState(
            {
                loading: true
            },
            async () => {
                await new Promise(resolve => setTimeout(resolve, 1500));
                console.log(`Removed seat ${number}, row ${row}, id ${id}`);
                // A value of null will reset the tooltip to the original while '' will hide the tooltip
                const newTooltip = ["A", "B", "C"].includes(row) ? null : "";
                removeCb(row, number, newTooltip);
                this.setState({ loading: false });
            }
        );
    };

    notify = () =>{
        const cors = 'https://cors-anywhere.herokuapp.com/';
        let url = cors+ BASE_URL +"/flights/?fid=";
        let flightID = localStorage.getItem("FlightID");
        fetch(url.concat(flightID), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if(!response.ok) throw new Error(response.status);
            else return message.success("Notify succeed! ");;
        })
        .catch((err) => {
            console.error(err);
            // message.error('NO Orders');
        });
    }

    render() {
        const rows = [
            [

                { id: 1, number: "A1", isSelected: true, tooltip: "Muslim" },
                { id: 2, number: "B1", isSelected: true, tooltip: "LowFat" },
                null,
                {
                    id: 3,
                    number: "C1",
                    // isReserved: true,
                    orientation: "east",

                },
                { id: 4, number: "D1" },
                { id: 5, number: "E1", orientation: "west" }
            ],
            [
                {
                    id: 6,
                    number: "A2",
                    tooltip: "Reserved by Matthias Nadler"
                },
                { id: 7, number: "B2",  },
                null,
                { id: 8, number: "C2",  orientation: "east" },
                { id: 9, number: "D2" },
                { id: 10, number: "E2", orientation: "west" }
            ],
            [
                { id: 11, number: "A3" },
                { id: 12, number: "B3" },
                null,
                { id: 13, number: "C3", orientation: "east" },
                { id: 14, number: "D3",isSelected: true,
                    tooltip: "Baby"},
                { id: 15, number: "E3", orientation: "west" }
            ],
            [
                { id: 16, number: "A4", tooltip: "Cost: 25$" },
                { id: 17, number: "B4" },
                null,
                { id: 18, number: "C4", orientation: "east" },
                { id: 19, number: "D4", },
                { id: 20, number: "E4", orientation: "west" }
            ],
            [
                { id: 21, number: "A5",  },
                { id: 22, number: "B5",  },
                null,
                { id: 23, number: "C5", orientation: "east" },
                { id: 24, number: "D5", },
                { id: 25, number: "E5", orientation: "west" }
            ]
        ];


        const paddingStyle = {padding: "4px", textAlign:"right"};
        const { loading } = this.state;
        rows[1][0].tooltip = "Change"
        console.log(rows[1]);

        const {FlightID}=localStorage;
        return (
            <div>
                <h1>Admin Panel</h1>
                <h2>Flight Number: {FlightID} </h2>
                <Button type="primary" htmlType="submit" onClick={this.notify}>Notify All</Button>
                <h5>As an attendant, you can notify all passengers to make a special meal.</h5>
                <div style={{ marginTop: "50px"}}>
                    <Row gutter={18} align = "center">
                        <Col span={12} >
                            <div style={paddingStyle}> 1 ---------</div>
                            <div style={paddingStyle}> 2 ---------</div>
                            <div style={paddingStyle}> 3 ---------</div>
                            <div style={paddingStyle}> 4 ---------</div>
                            <div style={paddingStyle}> 5 ---------</div>
                        </Col>
                        <Col span={12} >
                            <SeatPicker
                                addSeatCallback={this.addSeatCallback}
                                removeSeatCallback={this.removeSeatCallback}
                                rows={rows}
                                maxReservableSeats={3}
                                alpha
                                // visible
                                selectedByDefault
                                loading={loading}
                                tooltipProps={{ multiline: true }}
                            />
                        </Col>




                    </Row>

                </div>

            </div>
        );
    }
}

export default AttendantPanel;
