import React, {Component} from 'react';
import {Form, Input, Button, InputNumber, message} from 'antd';
import {Link} from "react-router-dom";
import FlightIcon from '@material-ui/icons/Flight';
import {PhoneOutlined} from "@ant-design/icons";
import {BASE_URL} from "../constants";
import axios from "axios";
import ChooseMeal from "./ChooseMeal";

function CustomerCheckin(props) {

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
            const {Phone, FlightID} = values;
            const cors = 'https://cors-anywhere.herokuapp.com/';
            const url = cors+BASE_URL + '/customer/checkin/?cid='+Phone+'&fid='+FlightID;

            const opt = {
                method:"GET",
                url:url,
                headers:{
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': true
                }
            };

            axios(opt)
                .then((res) => {
                    if (res.status === 200){
                        console.log(res);
                        const {data} = res;
                        message.success("Login succeed! ");
                        localStorage.setItem("Phone",Phone);
                        localStorage.setItem("FlightID", FlightID);
                        if (data.order !== null){
                            localStorage.setItem("orderID", data.order._id);
                            props.history.push('/customer/confirm');
                        } else {
                            props.history.push('/customer/choose');
                        }
                    }
                })
                .catch((err) => {
                    console.log("login failed: ", err.message);
                    message.error("Login failed!");
                })
        };

        return (
            <Form
                {...formItemLayout}
                onFinish={onFinish}
                className="checkIn"
            >
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
                    <Input
                        style={{width: "100%"}}
                           placeholder="Please input Flight ID"/>
                </Form.Item>

                <Form.Item
                    name="Phone"
                    label="Phone Number"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Phone Number!',
                        },
                    ]}
                >
                    <Input
                        style={{width: "100%"}}
                        placeholder="Please input Phone Number"/>
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

export default CustomerCheckin;
