import './App.css';
import Navbar from './components/Navbar'
import { Route,Routes } from 'react-router-dom';
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Registration from "./components/Registration"
import BlogDetails from './components/BlogDetails';
import NewPost from './components/NewPost';
import EditBlogPost from './components/EditBlog';

import { useState, useEffect } from "react";
function App() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [totalPosts, setTotalPosts] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch(`/blogs?page=${page}&per_page=${perPage}`)
      .then((response) => response.json())
      .then((data) => setBlogPosts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [page, perPage]);

  useEffect(() => {
    fetch(`http://localhost:5555/total_posts`)
      .then((response) => response.json())
      .then((data) => setTotalPosts(data.total))
      .catch((error) => console.error("Error fetching total posts:", error));
  }, []);
  function handlePageChange(newPage) {
    setPage(newPage);
  }
  function handlePerPageChange(newPerPage) {
    setPerPage(newPerPage);
  }
  const totalPages = Math.ceil(totalPosts / perPage);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredPosts = searchQuery ? blogPosts.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase())) : blogPosts;

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <Routes>
        <Route path='/blogs/:id/edit' element={<EditBlogPost />} />
        <Route exact path="/"element={<Login />}/>
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/about"element={<About />}/>
        <Route path="/blogs"element={<Home page={page} blogPosts={filteredPosts} handlePageChange={handlePageChange} handlePerPageChange={handlePerPageChange} totalPages={totalPages} />}/>
        <Route path="/registration"element={<Registration />}/>
        <Route path='/newblog' element={<NewPost />} />
      </Routes>
    </>
  )
}

export default App;
