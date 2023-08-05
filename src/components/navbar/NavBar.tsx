import React, { FC, useEffect, useState } from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reRouteAction } from '../../redux/actions';
import { ReduxState } from '../../redux/interfaces';
import API from '../../lib/API';
import { getNavbarProps } from './funcs/funcs';
import { NavBarDropdown } from './dropDown/NavBarDropdown';
import PostModal from '../post/crud/PostModal';
import { NavbarSignUpButton } from './button/NavbarSignUpButton';
import './styles.scss';

const NavBar: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const { user } = useSelector((state: ReduxState) => state.data);
  const loggedInUserId = user?.id;

  /**
   * Logs out current user.
   * @remarks This is a custom function.
   */
  async function logOut(): Promise<void> {
    await API.delete('/sessions');

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('cover');

    navigate('/');
  }

  function route() {
    dispatch(reRouteAction(false));
    navigate('/home');
  }

  useEffect(() => {
    if (
      location.pathname === '/register' ||
      location.pathname === '/login' ||
      location.pathname === '/'
    ) {
      return;
    }
  }, [show, loggedInUserId]);

  return (
    <>
      {getNavbarProps(loggedInUserId, user?.image, navigate, logOut)
        .filter((item) => item.path === location.pathname)
        .map(
          (item) =>
            location.pathname === item.path && (
              <Navbar
                key={item.name}
                expand="lg"
                className={item.container.divClassName}
                fixed="top"
              >
                <Container className={item.container.className}>
                  <Navbar.Brand className={item.brandClassName} onClick={route}>
                    <img
                      className={item.brandLogo.className}
                      alt="logo"
                      src={item.brandLogo.src}
                    />
                    <span className="navspan ml-2">{item.brandName}</span>
                  </Navbar.Brand>

                  {item.path === '/home' && (
                    <div className="d-flex justity-content-between ml-auto">
                      <div className="d-flex">
                        <Button
                          onClick={handleShow}
                          className="newBlogPost"
                          size="lg"
                        >
                          <div>
                            <img
                              alt=""
                              src="https://img.icons8.com/ios-filled/50/ffffff/new.png"
                              width="23px"
                            />
                          </div>
                          <div style={{ fontSize: '16px' }}> newPost</div>
                        </Button>

                        <PostModal show={show} setShow={setShow} />

                        <NavBarDropdown
                          dropDownProps={item.dropDownProps}
                          path={item.path}
                          name={item.name}
                          flag={true}
                          userId={loggedInUserId}
                          user={user}
                        />
                      </div>
                    </div>
                  )}

                  {item.path !== '/home' && (
                    <div className="d-flex justity-content-between ml-auto">
                      <NavBarDropdown
                        dropDownProps={item.dropDownProps}
                        path={item.path}
                        name={item.name}
                        userId={loggedInUserId}
                        user={user}
                      />
                    </div>
                  )}

                  {item.path === '/' && (
                    <NavbarSignUpButton navigate={navigate} />
                  )}
                </Container>
              </Navbar>
            )
        )}
    </>
  );
};

export default NavBar;
