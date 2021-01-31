import React, {Component, useState} from 'react';
import {Radio, Tabs, Button, message} from 'antd';
import axios from "axios";
import {BASE_URL} from "../constants";

function ChooseMeal(props) {
    const [type, setType] = useState("Hindu");

   const onChange = e => {
        console.log('radio checked', e.target.value);
        setType( e.target.value);
    };

   const goNext = () => {
       console.log(type);
        const {Phone, FlightID} = localStorage;
        const cors = 'https://cors-anywhere.herokuapp.com/';
        const url = cors+BASE_URL + '/customer/takeorder/?cid='+Phone+'&fid='+FlightID+'&type='+type;
        console.log(url);
        const opt = {
            method: 'POST',
            url: url,
            headers: { 'content-type': 'application/json'}
        };

        axios(opt)
        .then( response => {
            console.log(response)
            // case1: registered success
            if(response.status === 200) {
                message.success('Order succeed!')
                // switch to login page
                localStorage.setItem("order", response.data.orderId);
                props.history.push('/customer/confirm');
            }
        })
        .catch( error => {
            console.log('order failed: ', error.message);
            message.error('Order failed!');
        })
    };


        const radioStyle = {
            display: 'block',
            height: '50px',
            lineHeight: '50px',
            textAlign:'left'
        };
        // const { value } = this.state;

        const { TabPane } = Tabs;


        return (
            <div>
                <h1>Select a Special Meal: </h1>

                <Radio.Group
                    onChange={onChange}
                    value={type}
                >
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="Religious meals" key="1">
                            <Radio style={radioStyle} value={"Hindu"}>
                                Hindu: Prepared according to Hindu dietary practices and may include dairy, curries and spicy flavors
                            </Radio>
                            <Radio style={radioStyle} value={"Kosher"}>
                                Kosher: Prepared to comply with Jewish dietary laws
                            </Radio>
                            <Radio style={radioStyle} value={"Muslim"}>
                                Muslim:	Does not contain pork, by-products of pork or ingredients containing alcohol
                            </Radio>
                        </TabPane>
                        <TabPane tab="Medical & dietary meals" key="2">
                            <Radio style={radioStyle} value={"AsianVegetarian"}>
                                Asian vegetarian：Spicy vegetarian meals with limited use of dairy products
                            </Radio>

                            <Radio style={radioStyle} value={"Bland"}>
                                Bland: Simple cooking methods used specifically for passengers with digestive sensitivities
                            </Radio>

                            <Radio style={radioStyle} value={"Diabetic"}>
                                Diabetic: Suitable for reduced sugar, hyperglycemic, hypoglycemic and carbohydrate controlled meal requests
                            </Radio>
                            <Radio style={radioStyle} value={"GlutenIntolerant"}>
                                Gluten-intolerant: This meal eliminates all foods prepared with wheat, rye, barley and oats
                            </Radio>
                            <Radio style={radioStyle} value={"LactoOvoVegetarian"}>
                                Lacto-ovo vegetarian:	Vegetarian meal that may include eggs and dairy products
                            </Radio>
                            <Radio style={radioStyle} value={"LowFat"}>
                                Low fat: High fiber, low fat meal
                            </Radio>
                            <Radio style={radioStyle} value={"LowSodium"}>
                                Low sodium:	No added salt, MSG or baking powder/soda
                            </Radio>
                            <Radio style={radioStyle} value={"NonLactose"}>
                                Non-lactose:Does not contain cheese, dairy products and their derivatives, lactose or milk products
                            </Radio>
                            <Radio style={radioStyle} value={"Vegetarian"}>
                                Vegetarian / Vegan:	Does not contain meat, fish, fowl, eggs, dairy products or derivatives
                            </Radio>
                        </TabPane>
                        <TabPane tab="Children's meals" key="3">
                            <Radio style={radioStyle} value={"Baby"}>
                                Baby: Selection of commercial baby food for children 2 and younger. Attached to the parent/guardian PNR
                            </Radio>
                            <Radio style={radioStyle} value={"Child"}>
                                Child's: Foods that appeal to kids age 2-5; available to everyone
                            </Radio>
                        </TabPane>
                    </Tabs>

                </Radio.Group>

                <div className="orderDiv">
                    <Button type="primary" htmlType="submit" className="orderBtn"
                    onClick={goNext}
                    >
                        Submit
                    </Button>
                </div>

            </div>

        );

}

export default ChooseMeal;
