import React, { useState, useEffect } from 'react'
import { Carousel, Col, Row, Tabs, Pagination } from 'antd';
import styled from 'styled-components';

import "./blog.css"

import Photo1 from '../../assets/images/a.jpg'
import Photo2 from '../../assets/images/b.jpg'
import Photo3 from '../../assets/images/c.jpg'
import CardBlog from '../../component/CardBlog';
import axios from 'axios';
import moment from 'moment';

const Container = styled.div`
    padding: 0 50px;
    `


const Blog = () => {
    const [keyTab, setKeyTab] = useState('latest');


    const onChange = (key) => {
        setKeyTab(key);
        console.log(key);
    };


    const Latest = () => {
        const [data, setData] = useState([]);
        const [totalRecorded, setTotalRecorded] = useState(0);

        const [queryParams, setQueryParams] = useState({
            searchType: "1",
            searchValue: "",
            page: 0,
            size: 8,
            sortBy: null,
        });

        const handlePagination = (page, pageSize) => {
            setQueryParams({
                ...queryParams,
                page: page - 1,
                size: pageSize,
            });
        };


        const getAllArticle = () => {
            axios.get(`http://localhost:8000/api/posts?page=${queryParams.page + 1}&size=${queryParams.size}`)
                .then(res => {
                    console.log("Data : ", res.data);
                    setTotalRecorded(res.data.totalData);
                    setData(res.data);
                })
                .catch(err => {
                    console.log(err);
                })

        }

        useEffect(() => {
            getAllArticle();

        }, [queryParams]);


        return (
            <div>
                <Row gutter={[8, 8]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <div>
                            {/* <img className='photo1' src={Photo1} alt="photo1" /> */}
                            <CardBlog src={Photo1} alt={"Photo1"} classNameImg='photo1' />
                        </div>
                    </Col>

                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <CardBlog classNameImg='photo2' classNameCat='inspiration' src={Photo2} alt={"Photo2"} category='Inspiration' text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae culpa temporibus maiores eaque laborum dolor dolores autem nihil! Laudantium modi non aut vel aspernatur aperiam voluptatem nulla dolorum iusto fugiat!" date='01 November 2022' />
                    </Col>

                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <CardBlog classNameImg='photo3' classNameCat='news' src={Photo3} alt={"Photo3"} category='News' text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae culpa temporibus maiores eaque laborum dolor dolores autem nihil! Laudantium modi non aut vel aspernatur aperiam voluptatem nulla dolorum iusto fugiat!" date='01 November 2022' /></Col>
                </Row>
                <div>
                    <div>
                        <h1 style={{
                            borderBottom: '3px solid green',
                            display: 'inline-block',
                        }}>Trending</h1>
                    </div>

                    <Row gutter={[8, 8]}>
                        {data.article && data.article.map((item, index) => {
                            return (
                                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                    <CardBlog classNameCat='news' src={Photo2} alt={"Photo2"} category='News' text={item?.title} date={moment(item?.createdAt).format('DD MMMM YYYY')} author={`${item.name?.firstName} ${item.name?.lastName}`} />
                                </Col>
                            )
                        })}

                    </Row>

                    {totalRecorded > 0 && (
                        <Pagination style={{
                            display: 'flex',
                            justifyContent: 'end',
                            marginTop: '20px'
                        }} defaultCurrent={queryParams.page + 1} total={totalRecorded} defaultPageSize={queryParams.size} onChange={handlePagination} />
                    )}

                </div>
            </div>
        )
    }
    const News = () => {
        const contentStyle1 = {
            height: '460px',
            color: '#fff',
            lineHeight: '460px',
            textAlign: 'center',
            background: '#364d79',
        };

        const contentStyle2 = {
            height: '460px',
            color: '#fff',
            lineHeight: '460px',
            textAlign: 'center',
            // background: 'yellow',
            backgroundImage: `url(${Photo1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        };

        const contentStyle3 = {
            height: '460px',
            color: '#fff',
            lineHeight: '460px',
            textAlign: 'center',
            background: 'green',
        };

        return (
            <Carousel autoplay autoplaySpeed={5000} effect="fade">
                <div>
                    <h3 style={contentStyle1}>1</h3>
                </div>
                <div>
                    <h3 style={contentStyle2}>2</h3>
                </div>
                <div>
                    <h3 style={contentStyle3}>3</h3>
                </div>
                <div>
                    <h3 style={contentStyle1}>4</h3>
                </div>
            </Carousel>
        )
    }
    const Inspiration = () => {
        return (
            <div>
                <h1>Inspiration</h1>
            </div>
        )
    }


    return (
        <>
            <Container>
                <header>
                    <div className='title'>
                        <h1>Panji Pratama</h1>
                    </div>
                    <hr />
                    <div>
                        <Tabs
                            defaultActiveKey="latest"
                            onChange={onChange}
                            style={{ fontStyle: 'bold' }}
                            items={[
                                {
                                    label: `LATEST`,
                                    key: 'latest',
                                },
                                {
                                    label: `NEWS`,
                                    key: 'news',
                                },
                                {
                                    label: `INSPIRATION`,
                                    key: 'inspiration',
                                },
                            ]}
                        />
                    </div>
                </header>


                <main>
                    <div>
                        {keyTab === 'latest' && <Latest />}
                        {keyTab === 'news' && <News />}
                        {keyTab === 'inspiration' && <Inspiration />}

                    </div>
                </main>

                <footer>
                    <p>Footer</p>
                </footer>


            </Container>

        </>

    )
}

export default Blog