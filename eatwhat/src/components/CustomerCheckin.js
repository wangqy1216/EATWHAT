import React, {Component} from 'react';
import { Form, Input, Button} from 'antd';
import {Link} from "react-router-dom";

class CustomerCheckin extends Component {
    render() {

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        const onFinish = (values) => {
            console.log('Received values of form: ', values);



        };

        return (
            <Form
                {...formItemLayout}
                onFinish={onFinish}
                className="checkIn"
            >
                <Form.Item
                    name="FlightNumber"
                    label="Flight Number"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Flight Number!',
                        },
                    ]}
                >
                    <Input style={{width: "100%"}}
                           placeholder="Please input Flight Number"/>
                </Form.Item>
                <Form.Item
                    name="FlightID"
                    label="Flight ID"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Flight ID!',
                        },
                    ]}
                >
                    <Input style={{width: "100%"}}
                           placeholder="Please input Flight ID"/>
                </Form.Item>


                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit"
                            className="checkIn-btn">
                        Check In
                    </Button>
                    Or <Link to="/home">go Back!</Link>
                </Form.Item>
            </Form>
        );
    }

}

export default CustomerCheckin;
