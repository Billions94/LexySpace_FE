import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from './components/Navbar/NavBar'
import LogIn from './components/Login&Register/LogIn'
import Home from './components/Home/blog-home/Home'
import Register from './components/Login&Register/Register'
import BeforeLogin from './components/beforeLogin/BeforeLogin'
// import DM from "./components/Home/messages/DM"
import Messages from "./components/Home/messages/Messages"
import Blog from "./components/Home/views"
import UserProfile from "./components/Home/profile/UserProfile"
import Edit from "./components/Home/new/EditPost"


function App() {

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path={'/'} element={<BeforeLogin />}/>
        <Route path={'/register'} element={<Register />}/>
        <Route path={'/login'} element={<LogIn />}/>
        <Route path={'/home'} element={<Home />}/>
        <Route path={'/posts/:id'} element={<Blog />}/>
        <Route path={'/edit/:id'}  element={<Edit />}/>
        <Route path={'/messages'} element={<Messages />}/>
        <Route path={'/userProfile/:id'}  element={<UserProfile />} />
        {/* <Route path={'/settings'}  element={<Settings />} /> */}
        {/* <Route path={'/followers/:id'}  element={<Followers />} />
        <Route path={'/closeAccount'}  element={<CloseAccount />} /> */}
        {/* <Route path='/dm' element={<DM />}/> */}
      </Routes>
    </Router>
  )
}

export default App
