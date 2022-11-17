import { Button, Table, Alert, Modal } from 'antd';
import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";





const ListPost = () => {
    const [data, setData] = useState([]);
    const [question, setQuestion] = useState('Are you sure to delete all this post?');
    const [page, setPage] = useState(1);
    const location = useLocation();
    const [stateLocation, setStateLocation] = useState(location?.state?.message);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [show, setShow] = useState(false);


    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => (
                <Link style={{ cursor: "pointer" }} to={`/detail/${record.id}`} params={{ id: record?.id }}>
                    {(page - 1) * 10 + index + 1}
                </Link>
            ),

        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: "title",
            render: (text, record) => (record && record?.title ? record?.title : null),

        },
        {
            title: 'Description',
            dataIndex: 'description',
            render: (text, record) => (record && record?.description ? record?.description : null),
        },
        {
            title: 'Published',
            dataIndex: 'published',
            render: (text, record) => (record && record?.published ? "Published" : "Not Published")
            ,
        },

    ];

    const showModal = () => {
        setIsModalOpen(true);
        if (data.length === 0) {
            setQuestion("No data to delete");
        }

    };
    const handleOk = () => {
        setIsModalOpen(false);
        if (data.length !== 0) {
            handleDeleteAll();
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleDeleteAll = () => {
        axios.delete(`http://localhost:8000/api/posts/deleteAll`)
            .then(res => {
                console.log(res.data);
                // navigate('/listpost', { state: { message: res?.data.message } });
                setStateLocation(res?.data.message);
                setData([]);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getPosts = () => {
        axios.get('http://localhost:8000/api/posts')
            .then(res => {
                console.log(res.data);
                setData(res?.data?.article);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getPosts();
        console.log("location", stateLocation);

        window.onload = () => {
            setShow(false);
        }

        if (stateLocation) {
            setShow(true)
        }
        setTimeout(() => {
            setShow(false)
        }, 2000);

    }, [])


    const displayAlert = () => {
        return (
            <Alert style={{ width: "30%", margin: "20px auto" }} message={stateLocation} type="success" showIcon />
        )
    }

    return (
        <>
            {show ? displayAlert() : null}
            <Modal closable={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>{question}</p>
            </Modal>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>

                <div style={{ width: "80%", }}>
                    <div style={{}}>
                        {/* add func display alert */}
                        <Button onClick={showModal} style={{ float: "right", marginBottom: "20px" }} type="danger">
                            Delete
                        </Button>

                        <Button style={{ marginBottom: "20px" }} type="primary">
                            <Link to="/post">Create Post</Link>
                        </Button>


                    </div>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            pageSize: 10,
                            onChange(current) {
                                setPage(current);
                            }
                        }}
                        scroll={{
                            y: 240,
                        }}
                    />
                </div>

            </div>


        </>

    )
}


export default ListPost;