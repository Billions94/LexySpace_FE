import { Avatar } from '@mui/material';
import React, { useEffect } from 'react';
import { Dropdown, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from 'src/lib/requests/user';
import { setUserAction } from 'src/redux/actions';
import { useReroute } from '../../../components/hooks/useReroute';
import { NewUserAvatar } from '../../../dummy/NewUserAvatar';
import { User } from '../../../redux/interfaces';
import { GET_STORE } from '../../../redux/store';
import {
  appendIdToUrl,
  getNavbarIcons,
  getOrder,
  isDynamicUserRoute,
  isWelcomePage,
  sx,
} from '../funcs/funcs';
import { NavbarProp } from '../interface/navbar';
import '../styles.scss';

interface NavBarDropdownProps {
  flag: boolean;
  userId: string;
  user?: User;
}

export const NavBarDropdown: React.FC<
  Partial<NavbarProp & NavBarDropdownProps>
> = function (props) {
  const {
    path,
    name,
    dropDownProps: {
      dropDownMenuStyle,
      className,
      navigate,
      avatar,
      logOut,
      style,
      linkClassName,
    },
    flag,
    user,
  } = { ...props } as NavbarProp & NavBarDropdownProps;

  const dispatch = useDispatch();
  const { route } = useReroute();
  const loggedInUser = useSelector(GET_STORE).data.user;

  const avatarStyle: { [key: string]: string } = {
    top: sx(String(avatar?.sx.src), flag).top,
    left: sx(String(avatar?.sx.src), flag).left,
    height: '' + sx(String(avatar?.sx.src), flag).height,
    width: '' + sx(String(avatar?.sx.src), flag).width,
    position: sx(String(avatar?.sx.src), flag).position,
  };

  useEffect(() => {
    getUser().then((user) => {
      dispatch(setUserAction(user));
    });
  }, []);

  return isWelcomePage(path) ? null : (
    <div className={className}>
      <Dropdown style={style} id={'n'}>
        {flag ? (
          <Dropdown.Toggle className="btn btn-dark navToggle">
            {user?.image === null ? (
              <Avatar
                className="d-block"
                alt="photo not found"
                children={
                  <NewUserAvatar
                    firstName={String(user?.firstName)}
                    lastName={String(user?.lastName)}
                  />
                }
                style={avatarStyle}
              />
            ) : (
              <Avatar
                className="d-block"
                alt="photo not found"
                src={avatar?.sx.src}
                style={avatarStyle}
              />
            )}
          </Dropdown.Toggle>
        ) : (
          <>
            {' '}
            <Dropdown.Toggle
              style={{ position: 'relative' }}
              className="btn btn-dark navToggle"
            >
              {user?.image === null ? (
                <Avatar
                  className="d-block"
                  alt="photo not found"
                  children={
                    <NewUserAvatar
                      firstName={String(user?.firstName)}
                      lastName={String(user?.lastName)}
                    />
                  }
                  style={avatarStyle}
                />
              ) : (
                <Avatar
                  className="d-block"
                  alt="photo not found"
                  src={avatar?.sx.src}
                  style={avatarStyle}
                />
              )}
            </Dropdown.Toggle>
          </>
        )}
        <Dropdown.Menu style={dropDownMenuStyle}>
          {getOrder(
            String(name),
            getNavbarIcons(user, navigate, logOut),
            user as User
          ).map((key) => (
            <div
              key={key.name}
              className={linkClassName}
              onClick={() =>
                key.name === 'logout'
                  ? key.logOut && key.logOut()
                  : key.name === 'home'
                  ? route()
                  : key.navigate &&
                    key.navigate(
                      isDynamicUserRoute(user as User)
                        ? appendIdToUrl(key.url, loggedInUser.userName)
                        : String(key.url)
                    )
              }
            >
              <div className="d-flex">
                <div className="mr-3">
                  <Image
                    alt=""
                    className="lrdimg"
                    width="20px"
                    height="20px"
                    src={key.src}
                    rounded={user && true}
                  />
                </div>
                <div>{key.name}</div>
              </div>
            </div>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
