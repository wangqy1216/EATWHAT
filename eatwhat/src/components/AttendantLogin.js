import React, {Component} from 'react';
import { Form, Input, Button} from "antd";
import { UserOutlined,  } from "@ant-design/icons";
import FlightIcon from '@material-ui/icons/Flight';
import {Link} from "react-router-dom";

class AttendantLogin extends Component {


  render() {
    const onFinish = () =>{

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
                prefix={<FlightIcon className="site-form-item-icon" />}
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
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Attendant ID"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <Link to="/home">back home!</Link>
          </Form.Item>
        </Form>
    );
  }
}

export default AttendantLogin;