import './App.css';
import Navbar from './components/Navbar'
import { Route,Routes } from 'react-router-dom';
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Registration from "./components/Registration"
import BlogDetails from './components/BlogDetails';
import NewPost from './NewPost';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/"element={<Login />}/>
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/about"element={<About />}/>
        <Route path="/blogs"element={<Home />}/>
        <Route path="/registration"element={<Registration />}/>
        <Route path='/newblog' element={<NewPost />} />
      </Routes>
    </>
  )
}

export default App;
