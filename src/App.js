import './App.css';
import Navbar from './components/Navbar'
import { Route,Routes } from 'react-router-dom';
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Registration from "./components/Registration"
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/"element={<Home />}/>
        <Route path="/about"element={<About />}/>
        <Route path="/login"element={<Login />}/>
        <Route path="/registration"element={<Registration />}/>
      </Routes>
    </>
  )
}

export default App;
