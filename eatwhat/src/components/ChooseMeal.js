import React, {Component} from 'react';
import { Radio, Input } from 'antd';

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
            height: '30px',
            lineHeight: '30px',
        };
        const { value } = this.state;
        return (
            <div>
                <Radio.Group
                    onChange={this.onChange}
                    value={value}
                >
                    <Radio style={radioStyle} value={1}>
                        Gluten Free Meal
                    </Radio>
                    <Radio style={radioStyle} value={2}>
                        Vegan Meal
                    </Radio>
                    <Radio style={radioStyle} value={3}>
                        Vegetarian Meal
                    </Radio>
                    <Radio style={radioStyle} value={4}>
                        Diabetic Meal
                    </Radio>
                    <Radio style={radioStyle} value={5}>
                        Cholesterol Meal
                    </Radio>
                </Radio.Group>
            </div>

        );
    }
}

export default ChooseMeal;
