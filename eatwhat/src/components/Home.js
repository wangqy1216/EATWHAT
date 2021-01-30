import customer from "../assets/images/customer-card.jpg";
import attendant from "../assets/images/attendant-card.jpg";
import { Link } from 'react-router-dom';
import React, {Component} from 'react';
import { Button, Card, Row, Col} from "antd";
const { Meta } = Card;



class Home extends Component {



    render() {
        const operations = <Button type="Primary">Create New Post</Button>;




        return (

            <div>
                <h1>Welcome to "EATWHAT"</h1>
                <p>Apply for a special meal on your flight!</p>
                <h2>I am identified as:</h2>
                <Row gutter={16} align = "center"
                >

                    <Col span={5} >
                        <Link to="/customer"> <Card

                            hoverable
                            cover={<img alt="customer"  width="100px" height="250" src={customer}/>}
                        >
                            <Meta title="CustomerCheckin" description="If you are a customer, click here" />
                        </Card></Link>
                    </Col>
                    <Col span={5}>
                        <Link to="/attendant"> <Card

                            hoverable
                            cover={<img alt="attendant" width="100" height="250" src={attendant}/>}
                        >
                            <Meta title="attendant" description="If you are a flight attendant, click" />
                        </Card></Link>
                        </Col>


                </Row>


            </div>
        );
    }
}

export default Home;
