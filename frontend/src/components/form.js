import React, { useState } from 'react';
import './nav.css'
import '../App.css';
import './form.css';
import { useForm } from "react-hook-form";
import { insertDelivery } from './utilities'
import 'antd/dist/antd.css';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    Button,
    InputNumber,
    Upload
} from 'antd';


function DeliveryForm() {
    // const { handleSubmit, register, errors } = useForm();
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('horizontal');
    const [componentSize, setComponentSize] = useState('default');
    const [imageName, setImageName] = useState()
 
    const onFinish = (values) => {
      
        insertDelivery({
            email: values.email,
            payment: values.payment,
            image: imageName
        });
        // console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const normFile = (e) => {
        console.log('Upload event:', e);

        //Check file name & image format
        if (e.file && e.file.name && e.file.type in ["image / jpeg", "image / png"]){
            setImageName(e.file.name);
        }

        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const formItemLayout =
        formLayout === 'horizontal'
            ? {
                labelCol: {
                    span: 4,
                },
                wrapperCol: {
                    span: 10,
                },
            }
            : null;
    const buttonItemLayout =
        formLayout === 'horizontal'
            ? {
                wrapperCol: {
                    span: 10,
                    offset: 4,
                },
            }
            : null;

    return (
        <>
            <h1>Delivery Form</h1>
            <Form
                {...formItemLayout}
                layout={formLayout}
                form={form}
                initialValues={{
                    layout: formLayout,
                }}
                onValuesChange={onFormLayoutChange}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item label="Email" name="email">
                    <Input type="email"/>
                </Form.Item>             
                <Form.Item label="Payment" name="payment">
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name="upload"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra=""
                >
                    <Upload name="image" listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                    {/* <Upload name="logo" action="/upload.do" listType="picture"> 
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload> */}
                </Form.Item>
                <Form.Item {...buttonItemLayout}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </>
    );
} 

export default DeliveryForm;