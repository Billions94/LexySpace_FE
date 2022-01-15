import { BrowserRouter as Router, Routes, Route, LinkProps } from "react-router-dom"
import NavBar from './components/Navbar/NavBar'
import LogIn from './components/Login&Register/LogIn'
import Home from './components/Home/blog-home/Home'
import Register from './components/Login&Register/Register'
import BeforeLogin from './components/beforeLogin/BeforeLogin'
// import DM from "./components/Home/messages/DM"
import Messages from "./components/Home/messages/Messages"


function App() {

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<BeforeLogin />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<LogIn />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/messages' element={<Messages />}/>
        {/* <Route path='/dm' element={<DM />}/> */}
      </Routes>
    </Router>
  )
}

export default App
