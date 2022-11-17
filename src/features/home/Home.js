import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);



    const onFinish = (values) => {
        handleLogin(values);
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const navigate = useNavigate();

    const [form] = Form.useForm();

    const handleLogin = () => {
        form.validateFields().then((values) => {
            axios.post('http://localhost:8000/api/login', values)
                .then((res) => {
                    console.log(res);
                    navigate('/listpost');
                })
                .catch((err) => {
                    console.log("Error", err);
                    setMessage(err?.response?.data?.message);
                    setShow(true);
                    setTimeout(() => {
                        setShow(false);
                    }, 2000);

                })
        })

    }



    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: '100vh' }}>
            <div>
                <h1>Login</h1>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        {show && <p>{message}</p>}

                        <Button style={{
                            marginRight: '10px'
                        }} type="primary" htmlType="submit" >
                            Login
                        </Button>

                        <Button type="danger" onClick={() => {
                            navigate('/register')
                        }} >
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>

    )
}

export default Home