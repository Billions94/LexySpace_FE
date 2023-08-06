import React from 'react';
import { NavbarProp } from '../interface/navbar';
import { Dropdown } from 'react-bootstrap';
import { Avatar } from '@mui/material';
import {
  appendIdToUrl,
  getNavbarIcons,
  getOrder,
  isDynamicUserRoute,
  isWelcomePage,
  sx,
} from '../funcs/funcs';
import { useSelector } from 'react-redux';
import { ReduxState, User } from '../../../redux/interfaces';
import { NewUserAvatar } from '../../../dummy/NewUserAvatar';
import { Image } from 'react-bootstrap';
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

  const loggedInUser = useSelector((state: ReduxState) => state.data.user);

  const avatarStyle: { [key: string]: string } = {
    top: sx(String(avatar?.sx.src), flag).top,
    left: sx(String(avatar?.sx.src), flag).left,
    height: '' + sx(String(avatar?.sx.src), flag).height,
    width: '' + sx(String(avatar?.sx.src), flag).width,
    position: sx(String(avatar?.sx.src), flag).position,
  };

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
                  : key.navigate &&
                    key.navigate(
                      isDynamicUserRoute(user as User)
                        ? appendIdToUrl(key.url, loggedInUser.id)
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
