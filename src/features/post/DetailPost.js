import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Button, Modal } from 'antd';

const DetailPost = (props) => {
    const { id } = useParams();
    console.log("id", id);

    const [data, setData] = useState({});
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        handleDelete();
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const getOnePost = () => {
        axios.get(`http://localhost:8000/api/posts/detail/${id}`)
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getOnePost()
    }, [])

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/posts/delete/${id}`)
            .then(res => {
                console.log(res.data);
                navigate('/listpost', { state: { message: res?.data.message } });
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleEdit = () => {
        navigate(`/post`, { state: { data: data } });
    }



    return (
        <>
            <Modal closable={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Are you sure to delete this post?</p>
            </Modal>
            <div style={{ paddingLeft: "50px", paddingRight: "50px" }}>
                <h1>Detail Post</h1>
                <h3>title : {data?.title}</h3>
                <p>description : {data?.description}</p>
                <p>published : {data?.published ? "Published" : "Not Published"}</p>
                <Button type="primary" onClick={() => {
                    navigate('/listpost', { state: { message: null } });
                }}>
                    Back
                </Button>
                <Button onClick={handleEdit} style={{ background: "green", color: "white" }}>Edit</Button>
                <Button onClick={showModal} style={{ background: "red", color: "white" }}>Delete</Button>
            </div>
        </>

    )
}

export default DetailPost