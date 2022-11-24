import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from './components/navbar/NavBar'
import LogIn from './components/auth/LogIn'
import Home from './components/home/Home'
import Register from './components/auth/Register'
import BeforeLogin from './components/welcomePage/WelcomePage'
// import DM from "./components/Home/messages/DM"
import Messages from "./components/messages/Messages"
import Blog from "./components/post/views"
import UserProfile from "./components/user/profile/UserProfile"
import Edit from "./components/post/crud/EditPost"
import Followers from "./components/user/followers/Followers"
import CloseAccount from "./components/user/account/CloseAccount"
import Settings from "./components/user/account/Settings"
import Footer from "./components/footer/Footer"
import EditNewUser from "./components/auth/EditNewUser"
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
        {/* <Route path={'/edit/:id'}  element={<Edit />}/> */}
        <Route path={'/messages'} element={<Messages />}/>
        <Route path={'/messages/:id'} element={<Messages />}/>
        <Route path={'/userProfile/:id'}  element={<UserProfile />} />
        <Route path={'/settings'}  element={<Settings />} />
        <Route path={'/followers/:id'}  element={<Followers />} />
        <Route path={'/closeAccount'}  element={<CloseAccount />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  )
}

export default App
