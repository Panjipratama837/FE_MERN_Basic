import { useEffect } from 'react'
import { Button, Form, Input, Radio } from 'antd';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 8,
    },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};




const Post = (props) => {
    console.log("props", props);
    const navigate = useNavigate();
    const location = useLocation();

    console.log("location", location.state);

    const dataPost = location.state?.data;


    // create state
    const [form] = Form.useForm();

    useEffect(() => {
        if (dataPost) {
            form.setFieldsValue({
                title: dataPost?.title,
                description: dataPost?.description,
                published: dataPost?.published,
            })
        }
    }, []);


    const onFinish = (values) => {
        console.log("values", values);
        if (dataPost) {
            axios.put(`http://localhost:8000/api/posts/update/${dataPost?.id}`, values)
                .then(res => {
                    console.log(res.data);
                    navigate('/listpost', { state: { message: res?.data.message } });
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            axios.post('http://localhost:8000/api/posts/create', values)
                .then(res => {
                    console.log(res.data);
                    navigate('/listpost', { state: { message: res?.data.message } });
                })
                .catch(err => {
                    console.log(err);
                })
        }
    };
    return (
        <>
            <Form style={{ marginTop: "20px" }} {...layout} form={form} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item
                    name="title"
                    id="title"
                    label="Title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="description" id="description" label="Description">
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    name="firstName"
                    id="firstName"
                    label="First Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="lastName"
                    id="lastName"
                    label="Last Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="published" id="published" label="Published">
                    <Radio.Group>
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 4,
                    }}
                >
                    <Button style={{ marginRight: "10px", background: "green", color: "white" }} onClick={() => {
                        navigate('/listpost', { state: { message: null } });
                    }}>
                        Back
                    </Button>

                    <Button type="primary" htmlType="submit">
                        {dataPost ? "Update" : "Submit"}
                    </Button>

                </Form.Item>
            </Form>


        </>
    );
}

export default Post;