import React, {Component} from 'react';
import {Form, Input, Button, message} from "antd";
import {UserOutlined,} from "@ant-design/icons";
import FlightIcon from '@material-ui/icons/Flight';
import {Link} from "react-router-dom";
import {BASE_URL} from "../constants";
import axios from "axios";

function AttendantLogin(props) {

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    const {AttendantID, FlightID} = values;
    const cors = 'https://cors-anywhere.herokuapp.com/';
    const url = cors + BASE_URL + '/attendant/checkin/?cid=' + AttendantID
        + '&fid=' + FlightID;

    const opt = {
      method: "GET",
      url: url,
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': true
      }
    };

    axios(opt)
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
        const {data} = res;
        message.success("Login succeed! ");
        localStorage.setItem("AttendantID", AttendantID);
        localStorage.setItem("FlightID", FlightID);
        props.history.push('/attendant/panel');

      }
    })
    .catch((err) => {
      console.log("login failed: ", err.message);
      message.error("Login failed!");
    })
  }

  return (
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
        <Form.Item
            name="FlightID"
            rules={[
              {
                required: true,
                message: "Please input your Username!"
              }
            ]}
        >
          <Input
              prefix={<FlightIcon className="site-form-item-icon"/>}
              placeholder="Flight ID"
          />
        </Form.Item>


        <Form.Item
            name="AttendantID"
            rules={[
              {
                required: true,
                message: "Please input your Username!"
              }
            ]}
        >
          <Input
              prefix={<UserOutlined className="site-form-item-icon"/>}
              placeholder="Attendant ID"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit"
                  className="login-form-button">
            Log in
          </Button>
          Or <Link to="/home">back home!</Link>
        </Form.Item>
      </Form>
  );

}

export default AttendantLogin;