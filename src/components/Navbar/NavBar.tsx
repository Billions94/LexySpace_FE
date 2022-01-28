import { useEffect, useState } from "react"
import { Avatar } from "@mui/material"
import { Container, Navbar, Button, Dropdown } from "react-bootstrap"
import logo from "../../assets/asset6.png"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getUsersAction, reRouteAction } from "../../redux/actions"
import { ReduxState } from "../../redux/interfaces"
import PostModal from "../Home/blog-home/new/PostModal"
import "./styles.scss"

const NavBar = () => {

  const feUrl = process.env.REACT_APP_FE_URL

  const [show, setShow] = useState(false)

  const { user } = useSelector((state: ReduxState) => state.data)

  const id = user!._id

  const handleShow = () => setShow(true)
  
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const customFunc = async () => {
    localStorage.clear()
    navigate('/')
  }
  
  function route() {
    dispatch(reRouteAction(false))
    navigate('/home')
  }

  useEffect(()=> {
    dispatch(getUsersAction())
  }, [])

  return (
    <> 
      { location.pathname === '/' && ( 
        <Navbar  expand="lg" className="blog-navbar1 p-1" fixed="top">
          <Container className="justify-content-between d-flex px-4">
            <Navbar.Brand as={Link} to="/">
              <img className="blog-navbar-brand" alt="logo" src={logo} />
              <span className="navspan ml-2">lexySpace</span>
            </Navbar.Brand>
            <div className='d-flex signup'>
              <Button onClick={()=> navigate('/register')} className="blog-navbar-add-button  newBlogPost" size="lg">
                <div className=''>
                  <img alt='' src="https://img.icons8.com/wired/50/000000/edit-user-male.png" width='25px'/>
                </div>
                <div style={{fontSize: "16px"}}> sign Up </div>
              </Button>

              <Button onClick={()=> navigate('/login')} className="ml-2 blog-navbar-add-button  newBlogPost" size="lg">
                <div className=''>
                  <img alt='' src="https://img.icons8.com/carbon-copy/50/000000/login-rounded-right.png" width='25px'/>
                </div>
                <div style={{fontSize: "16px"}}> log In </div>
              </Button>
          </div>
          </Container>
        </Navbar>
      )}

      { location.pathname === '/home' && (
        <div  className="blog-navbar p-1 sticky-top" >
          <Container className="justify-content-between d-flex px-4">
            <Navbar.Brand className="customCursor" onClick={() => navigate("/home")}>
              <img className="blog-navbar-brand" alt="logo" src={logo} width='50px'/>
              <span className="navspan ml-2">lexySpace</span>
            </Navbar.Brand>
    
          <div className="d-flex justity-content-between">
            <div>
              <Button onClick={handleShow} className="blog-navbar-add-button  newBlogPost" size="lg">
                  <div>
                    <img alt='' src="https://img.icons8.com/ios-filled/50/000000/new.png" width="23px"/>
                  </div>
                <div style={{fontSize: "16px"}}> newPost </div>
              </Button>
              <PostModal show={show} setShow={setShow} />
            </div>
            <div className="customDD">
              <Dropdown style={{ marginTop: "7px" }}>
                <Dropdown.Toggle className="btn btn-dark navToggle">
                  <Avatar className="d-block avatar" alt="" src={user!.image}
                        sx={{ width: 34, height: 34, marginLeft: "-14px", marginTop: "-8px"}} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ borderRadius: "20px", padding: "18px"}}>
                <br />
                  <Link to={`/userProfile/${id}`} className="deleteBlog">
                    <div style={{marginTop: "-20px"}} className="d-flex">
                      <div className="mr-3">
                        <img alt='' className="lrdimg" width="17px"
                          src={"https://img.icons8.com/wired/50/000000/user.png"}/>
                      </div>
                      <div>goTo Profile</div>
                    </div>
                  </Link>
                              
                  <Link to={"/messages"} className="deleteBlog">
                    <div className="d-flex">
                      <div className="mr-3">
                        <img alt='' className='lrdimg' width='18px'  
                          src="https://img.icons8.com/carbon-copy/50/000000/chat-message.png"/>
                      </div>
                      <div>messages</div>
                    </div>
                  </Link>

                  <Link to={"/settings"} className="deleteBlog">
                    <div className="d-flex">
                      <div className="mr-3">
                        <img alt='' className='lrdimg' width='18px'  
                          src="https://img.icons8.com/wired/50/000000/settings.png"/>
                      </div>
                      <div>settings</div>
                    </div>
                  </Link>

                  <div onClick={() => customFunc()} className="customLinks">
                    <div className="d-flex">
                      <div className="mr-3">
                        <img alt='' className='lrdimg' width='18px'
                          src="https://img.icons8.com/dotty/50/000000/logout-rounded.png"/>
                      </div>
                      <div>signOut</div>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          </Container>
        </div>
       )}


      { location.pathname === '/userProfile' && 
        <div  className="blog-navbar p-1 sticky-top" >
          <Container className="justify-content-between d-flex px-4">
            <Navbar.Brand className="customCursor" onClick={() => navigate("/home")}>
                <img className="blog-navbar-brand" alt="logo" src={logo} />
                <span className="navspan ml-2">lexySpace</span>
            </Navbar.Brand>

            <div className="customDD">
              <Dropdown style={{ marginTop: "7px"}}>
                <Dropdown.Toggle className="btn btn-dark navToggle">
                  <Avatar className="d-block avatar" alt="" src={user!.image}
                        sx={{ width: 34, height: 34, marginLeft: "-14px", marginTop: "-8px"}} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ borderRadius: "20px", padding: "18px"}}>
                <br />
                  <Link to={"/home"} className="deleteBlog">
                    <div style={{marginTop: "-20px"}} className="d-flex">
                      <div className="mr-3">
                        <img alt='' className="lrdimg" width="17px"
                          src="https://img.icons8.com/dotty/50/000000/home.png"/>
                      </div>
                      <div>home</div>
                    </div>
                  </Link>

                  <Link to={"/settings"} className="deleteBlog">
                    <div className="d-flex">
                      <div className="mr-3">
                        <img alt='' className='lrdimg' width='18px'  
                          src="https://img.icons8.com/wired/50/000000/settings.png"/>
                      </div>
                      <div>settings</div>
                    </div>
                  </Link>

                  <div onClick={() => customFunc()} className="customLinks">
                    <div className="d-flex">
                      <div className="mr-3">
                        <img alt='' className='lrdimg' width='18px'
                          src="https://img.icons8.com/dotty/50/000000/logout-rounded.png"/>
                      </div>
                      <div>signOut</div>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Container>
        </div>
      }

      { location.pathname === '/messages' &&  
        <div  className="blog-navbar p-1 sticky-top" >
          <Container className="justify-content-between d-flex px-4">
            <Navbar.Brand className="customCursor" onClick={() => navigate("/home")}>
                <img className="blog-navbar-brand" alt="logo" src={logo} />
                <span className="navspan ml-2">lexySpace</span>
            </Navbar.Brand>

            <div className="customDD">
              <Dropdown style={{ marginTop: "7px"}}>
                <Dropdown.Toggle className="btn btn-dark navToggle">
                  <Avatar className="d-block avatar" alt="" src={user!.image}
                        sx={{ width: 34, height: 34, marginLeft: "-14px", marginTop: "-8px"}} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ borderRadius: "20px", padding: "18px"}}>
                <br />
                  <Link to={"/home"} className="deleteBlog">
                    <div style={{marginTop: "-20px"}} className="d-flex">
                      <div className="mr-3">
                        <img alt='' className="lrdimg" width="17px"
                          src="https://img.icons8.com/dotty/50/000000/home.png"/>
                      </div>
                      <div>home</div>
                    </div>
                  </Link>
                              
                  <Link to={"/settings"} className="deleteBlog">
                    <div className="d-flex">
                      <div className="mr-3">
                        <img alt='' className='lrdimg' width='18px'  
                          src="https://img.icons8.com/wired/50/000000/settings.png"/>
                      </div>
                      <div>settings</div>
                    </div>
                  </Link>

                  <div onClick={() => customFunc()} className="customLinks">
                    <div className="d-flex">
                      <div className="mr-3">
                        <img alt='' className='lrdimg' width='18px'
                          src="https://img.icons8.com/dotty/50/000000/logout-rounded.png"/>
                      </div>
                      <div>signOut</div>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Container>
        </div>
      }

      { location.pathname === '/settings' &&  
        <div  className="blog-navbar p-1 sticky-top" >
          <Container className="justify-content-between d-flex px-4">
            <Navbar.Brand className="customCursor" onClick={() => navigate("/home")}>
                <img className="blog-navbar-brand" alt="logo" src={logo} />
                <span className="navspan ml-2">lexySpace</span>
            </Navbar.Brand>

            <div className="customDD">
              <Dropdown style={{ marginTop: "7px"}}>
                <Dropdown.Toggle className="btn btn-dark navToggle">
                  <Avatar className="d-block avatar" alt="" src={user!.image}
                        sx={{ width: 34, height: 34, marginLeft: "-14px", marginTop: "-8px"}} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ borderRadius: "20px", padding: "18px"}}>
                <br />
                  <Link to={"/home"} className="deleteBlog">
                    <div style={{marginTop: "-20px"}} className="d-flex">
                      <div className="mr-3">
                        <img alt='' className="lrdimg" width="17px"
                          src="https://img.icons8.com/dotty/50/000000/home.png"/>
                      </div>
                      <div>home</div>
                    </div>
                  </Link>
                              
                  <div onClick={() => customFunc()} className="customLinks">
                    <div className="d-flex">
                      <div className="mr-3">
                        <img alt='' className='lrdimg' width='18px'
                          src="https://img.icons8.com/dotty/50/000000/logout-rounded.png"/>
                      </div>
                      <div>signOut</div>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Container>
        </div>
      }

      { location.pathname === '/closeAccount' &&  
        <div  className="blog-navbar p-1 sticky-top" >
          <Container className="justify-content-between d-flex px-4">
            <Navbar.Brand className="customCursor" onClick={() => navigate("/home")}>
                <img className="blog-navbar-brand" alt="logo" src={logo} />
                <span className="navspan ml-2">lexySpace</span>
            </Navbar.Brand>

            <div className="customDD">
              <Dropdown style={{ marginTop: "7px"}}>
                <Dropdown.Toggle className="btn btn-dark navToggle">
                  <Avatar className="d-block avatar" alt="" src={user!.image}
                        sx={{ width: 34, height: 34, marginLeft: "-14px", marginTop: "-8px"}} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ borderRadius: "20px", padding: "18px"}}>
                <br />
                  <Link to={"/home"} className="deleteBlog">
                    <div style={{marginTop: "-20px"}} className="d-flex">
                      <div className="mr-3">
                        <img alt='' className="lrdimg" width="17px"
                          src="https://img.icons8.com/dotty/50/000000/home.png"/>
                      </div>
                      <div>home</div>
                    </div>
                  </Link>
                              
                  <div onClick={() => customFunc()} className="customLinks">
                    <div className="d-flex">
                      <div className="mr-3">
                        <img alt='' className='lrdimg' width='18px'
                          src="https://img.icons8.com/dotty/50/000000/logout-rounded.png"/>
                      </div>
                      <div>signOut</div>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Container>
        </div>
      }


      { location.pathname === '/register' && 
        <div  className="blog-navbar p-1 sticky-top" >
          <Container className="justify-content-between d-flex px-4">
            <Navbar.Brand className="customCursor" onClick={() => navigate("/")}>
                <img className="blog-navbar-brand" alt="logo" src={logo} />
                <span className="navspan ml-2">lexySpace</span>
            </Navbar.Brand>
          </Container>
        </div>
      }

      { location.pathname === '/login' && 
        <div  className="blog-navbar p-1 sticky-top" >
          <Container className="justify-content-between d-flex px-4">
            <Navbar.Brand className="customCursor" onClick={() => navigate("/")}>
                <img className="blog-navbar-brand" alt="logo" src={logo} />
                <span className="navspan ml-2">lexySpace</span>
            </Navbar.Brand>
          </Container>
        </div>
      }

      { location.pathname === '/editNewUser' && 
        <div  className="blog-navbar p-1 sticky-top" >
          <Container className="justify-content-between d-flex px-4">
            <Navbar.Brand className="customCursor" onClick={() => navigate("/")}>
                <img className="blog-navbar-brand" alt="logo" src={logo} />
                <span className="navspan ml-2">lexySpace</span>
            </Navbar.Brand>
          </Container>
        </div>
      }
      
      { location.pathname !== '/messages' &&  location.pathname !== '/home' && location.pathname !== '/userProfile' &&
        location.pathname !== '/settings' && location.pathname !== '/closeAccount' && location.pathname !== '/' &&
        location.pathname !== '/register' && location.pathname !== '/login' && location.pathname !== '/editNewUser' &&
        <div  className="blog-navbar p-1 sticky-top" >
          <Container className="justify-content-between d-flex px-4">
            <Navbar.Brand className="customCursor" onClick={() => route()}>
                <img className="blog-navbar-brand" alt="logo" src={logo} />
                <span className="navspan ml-2">lexySpace</span>
            </Navbar.Brand>

            <div className="customDD">
              <Dropdown style={{ marginTop: "7px"}}>
                <Dropdown.Toggle className="btn btn-dark navToggle">
                  <Avatar className="d-block avatar" alt="" src={user!.image}
                        sx={{ width: 34, height: 34, marginLeft: "-14px", marginTop: "-8px"}} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ borderRadius: "20px", padding: "18px"}}>
                <br />
                  <Link to={"/home"} className="deleteBlog">
                    <div style={{marginTop: "-20px"}} className="d-flex">
                      <div className="mr-3">
                        <img alt='' className="lrdimg" width="17px"
                          src="https://img.icons8.com/dotty/50/000000/home.png"/>
                      </div>
                      <div>home</div>
                    </div>
                  </Link>
                              
                  <Link to={"/settings"} className="deleteBlog">
                    <div className="d-flex">
                      <div className="mr-3">
                        <img alt='' className='lrdimg' width='18px'  
                          src="https://img.icons8.com/wired/50/000000/settings.png"/>
                      </div>
                      <div>settings</div>
                    </div>
                  </Link>

                  <div onClick={() => customFunc()} className="customLinks">
                    <div className="d-flex">
                      <div className="mr-3">
                        <img alt='' className='lrdimg' width='18px'
                          src="https://img.icons8.com/dotty/50/000000/logout-rounded.png"/>
                      </div>
                      <div>signOut</div>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Container>
        </div>
      }
    </>
  ) 
}

export default NavBar
