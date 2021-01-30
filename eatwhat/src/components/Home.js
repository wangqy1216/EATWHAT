import React, {Component} from 'react';
import { Button, Card, Image} from "antd";
const { Meta } = Card;


class Home extends Component {



    render() {
        const operations = <Button type="Primary">Create New Post</Button>;




        return (

            <div>
                Apply for a special meal on your flight!
                <h1>Are you a</h1>
                <img alt="customer" src="../assets/images/customer-card.jpg"/>
                <Card

                    hoverable
                    style={{ width: 300 }}
                    cover={<img alt="customer" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>}
                >
                    <Meta title="Customer" description="www.instagram.com" />
                </Card>
            </div>
        );
    }
}

export default Home;
