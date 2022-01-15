import { BrowserRouter as Router, Routes, Route, LinkProps } from "react-router-dom"
import NavBar from './components/Navbar/NavBar'
import LogIn from './components/login&register/LogIn'
import Home from './components/Home/Home'
import Register from './components/login&register/Register'
import BeforeLogin from './components/beforeLogin/BeforeLogin'


function App() {

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<BeforeLogin />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<LogIn />}/>
        <Route path='/home' element={<Home />}/>
      </Routes>
    </Router>
  )
}

export default App
