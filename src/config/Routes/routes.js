import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Register, Post, ListPost, DetailPost } from '../../features'
import Blog from '../../features/blog/Blog'

const routes = () => {
    return (
        <Router>
            <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/post" element={<Post />} />
                    <Route path="/listpost" element={<ListPost />} />
                    <Route path="/detail/:id" element={<DetailPost />} />
            </Routes>
        </Router>
    )
}

export default routes