import React, {Component} from 'react';
import {Radio, Tabs, Button} from 'antd';

class ChooseMeal extends Component {
    state = {
        value: 1,
    };

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const radioStyle = {
            display: 'block',
            height: '50px',
            lineHeight: '50px',
            textAlign:'left'
        };
        const { value } = this.state;

        const { TabPane } = Tabs;

        return (
            <div>
                <h1>Select a Special Meal: </h1>

                <Radio.Group
                    onChange={this.onChange}
                    value={value}
                >
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="Religious meals" key="1">
                            <Radio style={radioStyle} value={1}>
                                Hindu: Prepared according to Hindu dietary practices and may include dairy, curries and spicy flavors
                            </Radio>
                            <Radio style={radioStyle} value={2}>
                                Kosher: Prepared to comply with Jewish dietary laws
                            </Radio>
                            <Radio style={radioStyle} value={3}>
                                Muslim:	Does not contain pork, by-products of pork or ingredients containing alcohol
                            </Radio>
                        </TabPane>
                        <TabPane tab="Medical & dietary meals" key="2">
                            <Radio style={radioStyle} value={4}>
                                Asian vegetarian：Spicy vegetarian meals with limited use of dairy products
                            </Radio>

                            <Radio style={radioStyle} value={5}>
                                Bland: Simple cooking methods used specifically for passengers with digestive sensitivities
                            </Radio>

                            <Radio style={radioStyle} value={6}>
                                Diabetic: Suitable for reduced sugar, hyperglycemic, hypoglycemic and carbohydrate controlled meal requests
                            </Radio>
                            <Radio style={radioStyle} value={7}>
                                Gluten-intolerant: This meal eliminates all foods prepared with wheat, rye, barley and oats
                            </Radio>
                            <Radio style={radioStyle} value={8}>
                                Lacto-ovo vegetarian:	Vegetarian meal that may include eggs and dairy products
                            </Radio>
                            <Radio style={radioStyle} value={9}>
                                Low fat: High fiber, low fat meal
                            </Radio>
                            <Radio style={radioStyle} value={10}>
                                Low sodium:	No added salt, MSG or baking powder/soda
                            </Radio>
                            <Radio style={radioStyle} value={11}>
                                Non-lactose:Does not contain cheese, dairy products and their derivatives, lactose or milk products
                            </Radio>
                            <Radio style={radioStyle} value={12}>
                                Vegetarian / Vegan:	Does not contain meat, fish, fowl, eggs, dairy products or derivatives
                            </Radio>
                        </TabPane>
                        <TabPane tab="Children's meals" key="3">
                            <Radio style={radioStyle} value={13}>
                                Baby: Selection of commercial baby food for children 2 and younger. Attached to the parent/guardian PNR
                            </Radio>
                            <Radio style={radioStyle} value={14}>
                                Child's: Foods that appeal to kids age 2-5; available to everyone
                            </Radio>
                        </TabPane>
                    </Tabs>

                </Radio.Group>

                <div className="orderDiv">
                    <Button type="primary" htmlType="submit" className="orderBtn">
                        Submit
                    </Button>
                </div>

            </div>

        );
    }
}

export default ChooseMeal;
