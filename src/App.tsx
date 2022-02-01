import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from './components/Navbar/NavBar'
import LogIn from './components/login&register/LogIn'
import Home from './components/Home/blog-home/Home'
import Register from './components/login&register/Register'
import BeforeLogin from './components/beforeLogin/BeforeLogin'
// import DM from "./components/Home/messages/DM"
import Messages from "./components/Home/messages/Messages"
import Blog from "./components/Home/views"
import UserProfile from "./components/Home/profile/UserProfile"
import Edit from "./components/Home/blog-home/new/EditPost"
import Followers from "./components/Home/profile/followers/Followers"
import CloseAccount from "./components/Home/account/CloseAccount"
import Settings from "./components/Home/account/Settings"
import Footer from "./components/footer/Footer"
import EditNewUser from "./components/login&register/EditNewUser"
import { useState } from "react"


function App() {

  const [refresh, setRefresh] = useState(false)

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path={'/'} element={<BeforeLogin />}/>
        <Route path={'/register'} element={<Register />}/>
        <Route path={'/login'} element={<LogIn />}/>
        <Route path={'/editNewUser'} element={<EditNewUser />}/>
        <Route path={'/home'} element={<Home />}/>
        <Route path={'/posts/:id'} element={<Home />}/>
        {/* <Route path={'/posts/:id'} element={<Blog />}/> */}
        <Route path={'/edit/:id'}  element={<Edit />}/>
        <Route path={'/messages'} element={<Messages />}/>
        <Route path={'/messages/:id'} element={<Messages />}/>
        <Route path={'/userProfile/:id'}  element={<UserProfile />} />
        <Route path={'/settings'}  element={<Settings />} />
        <Route path={'/followers/:id'}  element={<Followers />} />
        <Route path={'/closeAccount'}  element={<CloseAccount />} />
        {/* <Route path='/dm' element={<DM />}/> */}
      </Routes>
      {/* <Footer /> */}
    </Router>
  )
}

export default App
