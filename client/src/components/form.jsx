import React, { useState } from 'react';
import { FcAutomotive,FcInTransit,FcShipped } from "react-icons/fc";
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
} from 'antd';
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
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
const FormText = (props) => {
    const [formLayout, setFormLayout] = useState("vertical");
    // const [form] = Form.useForm();
    const form = props.form
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const positiveNumberValidator = (rule, value, callback) => {
        if (value >= 0) {
          callback(); 
        } else {
          callback('Speed limit must be a positive number or zero');
        }
      };

    return (
        <Form
            {...formItemLayout}
            form={form}
            
            name="register"
            onFinish={onFinish}

            layout={formLayout}
            initialValues={{
                layout: formLayout,
                Vtype:'am',
                avc:0,
                slimit:0,
                Dicon:'1',
                days:'days',
                ln:'none',
                gps:30,
                it:5


            }}
            style={{
                maxWidth: 900,
            }}
            scrollToFirstError
        >

            <div style={{ display: 'flex' }}>
                <Form.Item
                    name="Dname"
                    label="Device name"

                    rules={[

                        {
                            required: true,
                            message: 'Please input Device name',
                        },
                    ]}

                    labelCol={{ span: 80 }}
                    wrapperCol={{ span: 100 }}

                >
                    <Input style={{ width: '240px' }} />
                </Form.Item>

                <Form.Item
                    name="Vtype"
                    label="Device Type"
                    
                    labelCol={{ span: 80 }}
                    wrapperCol={{ span: 100 }}
                    style={{ marginLeft: '20px' }}
                >
                    <Select style={{ width: '240px' }} >
                        <Option value="am" >Android mobile</Option>
                        <Option value="im">Ios mobile</Option>
                        <Option value="other">Other</Option>
                    </Select>
                </Form.Item>
            </div>

            <div style={{ display: 'flex' }}>
                <Form.Item
                    name="imei"
                    label="Device IMEI"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Device IMEI',
                            
                        },
                    ]}
                    labelCol={{ span: 80 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Input style={{ width: '340px' }} />
                </Form.Item>

                <Form.Item
                    name="Dicon"
                    label="Device Icon"
                    labelCol={{ span: 80 }}
                    wrapperCol={{ span: 16 }}
                    style={{ marginLeft: '20px' }}
                >
                    <Select style={{ width: '140px' }} defaultValue={'1'} >
                        <Option value="1"><FcAutomotive size={25} className="colored-icon" /></Option>
                        <Option value="2"><FcInTransit size={25} className="colored-icon" /></Option>
                        <Option value="3"><FcShipped size={25} className="colored-icon" /></Option>
                    </Select>
                </Form.Item>
            </div>


            <div style={{ display: 'flex' }}>
                <Form.Item
                    name="vno"
                    label="Vehicle No"
                    rules={[

                        {
                            required: true,
                            message: 'Please input Vehicle No',
                        },
                    ]}
                    labelCol={{ span: 80 }}
                    wrapperCol={{ span: 100 }}

                >
                    <Input style={{ width: '240px' }} />
                </Form.Item>

                <Form.Item
                    name="cno"
                    label="Connection No"
                    rules={[

                        {
                            required: true,
                            message: 'Please input Connection No',
                        },
                    ]}
                    labelCol={{ span: 80 }}
                    wrapperCol={{ span: 100 }}
                    style={{ marginLeft: '20px' }}
                >
                    <Input style={{ width: '240px' }} />
                </Form.Item>
            </div>

            <div style={{ display: 'flex' }}>
                <Form.Item
                    name="rdata"
                    label="Renewal Data"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Vehicle No',
                        },
                    ]}
                    labelCol={{ span: 80 }}
                    wrapperCol={{ span: 100 }}

                >
                    <Input type='date' style={{ width: '200px' }} />
                </Form.Item>

                <Form.Item
                    name="tvalidity"
                    label="TopUp Validity"
                    rules={[

                        {
                            required: true,
                            message: 'Please input Connection No',
                        },
                    ]}
                    labelCol={{ span: 80 }}
                    wrapperCol={{ span: 20 }}
                    style={{ marginLeft: '20px' }}
                >
                    <Input style={{ width: '130px' }} />
                </Form.Item>
                <Form.Item
                    name="days"
                    label=" "
                    labelCol={{ span: 80 }}
                    wrapperCol={{ span: 16 }}
                    style={{ marginLeft: '20px' }}
                >
                    <Select initialValues="days" style={{ width: '130px' }} >
                        <Option value="days">days</Option>
                        <Option value="months">months</Option>
                        <Option value="years">years</Option>
                    </Select>
                </Form.Item>
            </div>

            <div style={{ display: 'flex' }}>
                <Form.Item
                    name="slimit"
                    label="Speed Limit(km/h)"
                    rules={[

                       
                        {
                            validator: positiveNumberValidator,
                            message: 'Speed must be between 1 and 10'
                        }
                    ]}
                    labelCol={{ span: 80 }}
                    wrapperCol={{ span: 100 }}

                >
                    <InputNumber style={{ width: '240px' }} />
                </Form.Item>

                <Form.Item
                    name="avc"
                    label="Average Consumption (km/l)"
                    rules={[

                        {
                            type: 'number',
                            min: 0, // Set the minimum allowed value
                            max: 200, // Set the maximum allowed value
                            message: 'Consumption must be between 1 and 100'
                        }
                    ]}
                    labelCol={{ span: 80 }}
                    wrapperCol={{ span: 100 }}
                    style={{ marginLeft: '20px' }}
                >
                    <InputNumber style={{ width: '240px' }} />
                </Form.Item>
            </div>
            <div style={{ display: 'flex' }}>
                <Form.Item
                    name="ln"
                    label="Level No"
                    labelCol={{ span: 80 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Select placeholder="select your gender" style={{ width: '150px' }} defaultValue={'none'} >
                        <Option value="none">none</Option>
                        <Option value="level1">level 1</Option>
                        <Option value="level2">level 2</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="slevel"
                    label="Selected Level"
                    labelCol={{ span: 80 }}
                    wrapperCol={{ span: 16 }}
                    style={{ marginLeft: '20px' }}
                    rules={[

                        {
                            required: true,
                            message: 'Please input Level',
                        },
                    ]}
                >
                    <Select placeholder="" style={{ width: '330px' }}>
                        <Option value="none">none</Option>
                        <Option value="level1">level 1</Option>
                        <Option value="level2">level 2</Option>
                    </Select>
                </Form.Item>
            </div>
            <div style={{ display: 'flex' }}>
                <Form.Item
                    name="gps"
                    label="GPS Data Sync interval(min)"
                    rules={[
                        {
                            type: 'number',
                            min: 0, // Set the minimum allowed value
                            max: 200, // Set the maximum allowed value
                            message: 'Number must be between 1 and 200'
                        }
                    ]}
                    labelCol={{ span: 80 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Input type="number"  />
                </Form.Item>

                <Form.Item
                    name="it"
                    label="Idling Time (min)"
                    rules={[

                        {
                            type: 'number',
                            min: 0, // Set the minimum allowed value
                            max: 200, // Set the maximum allowed value
                            message: 'Number must be between 1 and 200'
                        }
                    ]}
                    labelCol={{ span: 80 }}
                    wrapperCol={{ span: 16 }}
                    style={{marginLeft:'20px'}}
                >
                    <Input type="number" />
                </Form.Item>
            </div>


            {/* <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item> */}
        </Form>
    );
};
export default FormText;