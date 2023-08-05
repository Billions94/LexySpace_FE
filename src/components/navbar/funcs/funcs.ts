import { Icon, NavbarProp } from '../interface/navbar';
import logo from '../../../assets/asset6.png';
import message from '../../../assets/message.png';
import userProfile from '../../../assets/user.png';
import settings from '../../../assets/settings.png';
import logOutIcon from '../../../assets/logOut.png';
import home from '../../../assets/home.png';
import { NavigateFunction } from 'react-router-dom';
import { getDynamicIdFromRedux } from '../../../redux/store';
import { User } from '../../../redux/interfaces';

const dropDownMenuStyles = {
  borderRadius: '20px',
  padding: '20px',
};
const dropDownStyle = { marginTop: '7px' };
const dropDownClassName = 'customDD';
const brandClassName = 'customCursor';
const brandImageClassName = 'blog-navbar-brand';
const linkClassName = 'customLinks';
const containerClassName = 'justify-content-between d-flex px-4';
const coverDivClassName = 'blog-navbar p-4 mb-4';

/**
 * Returns React.CSSProperties.
 * @param avatarImage A source that will be used in the returned attributes.
 * @param flag A check to return specific attributes if true.
 * @remarks This is a custom function.
 * @return
 */
export const sx = (avatarImage: string, flag?: boolean) => {
  if (flag) {
    return {
      src: String(avatarImage),
      width: 34,
      height: 34,
      top: '-6px',
      left: '-6px',
      position: 'absolute',
    };
  }

  return {
    src: String(avatarImage),
    width: 34,
    height: 34,
    top: '-9px',
    left: '-8px',
    position: 'absolute',
  };
};

/**
 * Returns an array of type Icon.
 * @param loggedInUser
 * @param navigate A navigation function to navigate through the app.
 * @param logOut A function to log out the current user.
 * @remarks This is a custom function.
 * @return Icon[]
 */
export function getNavbarIcons(
  loggedInUser: User | undefined,
  navigate: NavigateFunction | undefined,
  logOut: (() => Promise<void>) | undefined
): Icon[] {
  return [
    {
      name: 'home',
      src: home,
      url: '/home',
      navigate,
    },
    {
      name: 'messages',
      src: message,
      url: '/messages',
      navigate,
    },
    {
      name: 'profile',
      src: String(loggedInUser?.image),
      url: `/userProfile/${getDynamicIdFromRedux()}`,
      navigate,
    },
    {
      name: 'settings',
      src: settings,
      url: '/settings',
      navigate,
    },
    {
      name: 'logout',
      src: logOutIcon,
      url: '/',
      navigate,
      logOut,
    },
  ];
}

/**
 * Returns an array of type NavbarProp.
 * @param userId The logged-in user ID.
 * @param avatarImage The logged-in user avatar image.
 * @param navigate A navigation function to navigate through the app.
 * @param logOut A function to log out the current user.
 * @remarks This is a custom function.
 * @return NavbarProp[]
 */
export function getNavbarProps(
  userId: string,
  avatarImage: string,
  navigate: NavigateFunction,
  logOut: () => Promise<void>
): NavbarProp[] {
  return [
    {
      name: 'Welcome Page',
      path: '/',
      container: {
        divClassName: coverDivClassName,
        className: containerClassName,
      },
      brandName: 'LexySpace',
      brandClassName,
      brandLogo: {
        src: logo,
        className: brandImageClassName,
      },
      dropDownProps: {
        style: dropDownStyle,
        dropDownMenuStyle: dropDownMenuStyles,
        className: dropDownClassName,
        linkClassName: linkClassName,
        image: '',
        avatar: {
          sx: sx(String(avatarImage)),
        },
        navigate,
        logOut,
      },
    },
    {
      name: 'Register',
      path: '/register',
      container: {
        divClassName: coverDivClassName,
        className: containerClassName,
      },
      brandName: 'LexySpace',
      brandClassName,
      brandLogo: {
        src: logo,
        className: brandImageClassName,
      },
      dropDownProps: {
        style: dropDownStyle,
        dropDownMenuStyle: dropDownMenuStyles,
        className: dropDownClassName,
        linkClassName: linkClassName,
        image: '',
        avatar: {
          sx: sx(String(avatarImage)),
        },
        navigate,
        logOut,
      },
    },
    {
      name: 'Login',
      path: '/login',
      container: {
        divClassName: coverDivClassName,
        className: containerClassName,
      },
      brandName: 'LexySpace',
      brandClassName,
      brandLogo: {
        src: logo,
        className: brandImageClassName,
      },
      dropDownProps: {
        style: dropDownStyle,
        dropDownMenuStyle: dropDownMenuStyles,
        className: dropDownClassName,
        linkClassName: linkClassName,
        image: '',
        avatar: {
          sx: sx(String(avatarImage)),
        },
        navigate,
        logOut,
      },
    },
    {
      name: 'Home',
      path: '/home',
      container: {
        divClassName: coverDivClassName,
        className: containerClassName,
      },
      brandName: 'LexySpace',
      brandClassName,
      brandLogo: {
        src: logo,
        className: brandImageClassName,
      },
      userId: userId,
      dropDownProps: {
        style: dropDownStyle,
        dropDownMenuStyle: dropDownMenuStyles,
        className: dropDownClassName,
        linkClassName: linkClassName,
        image: '',
        avatar: {
          sx: sx(String(avatarImage)),
        },
        navigate,
        logOut,
      },
    },
    {
      name: 'Posts',
      path: `/posts/${getDynamicIdFromRedux()}`,
      container: {
        divClassName: coverDivClassName,
        className: containerClassName,
      },
      brandName: 'LexySpace',
      brandClassName,
      brandLogo: {
        src: logo,
        className: brandImageClassName,
      },
      userId: userId,
      dropDownProps: {
        style: dropDownStyle,
        dropDownMenuStyle: dropDownMenuStyles,
        className: dropDownClassName,
        linkClassName: linkClassName,
        image: '',
        avatar: {
          sx: sx(String(avatarImage)),
        },
        navigate,
        logOut,
      },
    },
    {
      name: 'Messages',
      path: '/messages',
      container: {
        divClassName: coverDivClassName,
        className: containerClassName,
      },
      brandName: 'LexySpace',
      brandClassName,
      brandLogo: {
        src: logo,
        className: brandImageClassName,
      },
      userId: userId,
      dropDownProps: {
        style: dropDownStyle,
        dropDownMenuStyle: dropDownMenuStyles,
        className: dropDownClassName,
        linkClassName: linkClassName,
        image: message,
        avatar: {
          sx: sx(String(avatarImage)),
        },
        navigate,
        logOut,
      },
    },
    {
      name: 'Message',
      path: `/messages/${getDynamicIdFromRedux()}`,
      container: {
        divClassName: coverDivClassName,
        className: containerClassName,
      },
      brandName: 'LexySpace',
      brandClassName,
      brandLogo: {
        src: logo,
        className: brandImageClassName,
      },
      userId: userId,
      dropDownProps: {
        style: dropDownStyle,
        dropDownMenuStyle: dropDownMenuStyles,
        className: dropDownClassName,
        linkClassName: linkClassName,
        image: message,
        avatar: {
          sx: sx(String(avatarImage)),
        },
        navigate,
        logOut,
      },
    },
    {
      name: 'Settings',
      path: '/settings',
      container: {
        divClassName: coverDivClassName,
        className: containerClassName,
      },
      brandName: 'LexySpace',
      brandClassName,
      brandLogo: {
        src: logo,
        className: brandImageClassName,
      },
      userId: userId,
      dropDownProps: {
        style: dropDownStyle,
        dropDownMenuStyle: dropDownMenuStyles,
        className: dropDownClassName,
        linkClassName: linkClassName,
        image: settings,
        avatar: {
          sx: sx(String(avatarImage)),
        },
        navigate,
        logOut,
      },
    },
    {
      name: 'Profile',
      path: `/userProfile/${getDynamicIdFromRedux()}`,
      container: {
        divClassName: coverDivClassName,
        className: containerClassName,
      },
      brandName: 'LexySpace',
      brandClassName,
      brandLogo: {
        src: logo,
        className: brandImageClassName,
      },
      dropDownProps: {
        style: dropDownStyle,
        dropDownMenuStyle: dropDownMenuStyles,
        className: dropDownClassName,
        linkClassName: linkClassName,
        image: userProfile,
        avatar: {
          sx: sx(String(avatarImage)),
        },
        navigate,
        logOut,
      },
    },
    {
      name: 'Edit New User',
      path: '/editNewUser',
      container: {
        divClassName: coverDivClassName,
        className: containerClassName,
      },
      brandName: 'LexySpace',
      brandClassName,
      brandLogo: {
        src: logo,
        className: brandImageClassName,
      },
      dropDownProps: {
        style: dropDownStyle,
        dropDownMenuStyle: dropDownMenuStyles,
        className: dropDownClassName,
        linkClassName: linkClassName,
        image: '',
        avatar: {
          sx: sx(String(avatarImage)),
        },
        navigate,
        logOut,
      },
    },
    {
      name: 'Close Account',
      path: '/closeAccount',
      container: {
        divClassName: coverDivClassName,
        className: containerClassName,
      },
      brandName: 'LexySpace',
      brandClassName,
      brandLogo: {
        src: logo,
        className: brandImageClassName,
      },
      userId: userId,
      dropDownProps: {
        style: dropDownStyle,
        dropDownMenuStyle: dropDownMenuStyles,
        className: dropDownClassName,
        linkClassName: linkClassName,
        image: '',
        avatar: {
          sx: sx(String(avatarImage)),
        },
        navigate,
        logOut,
      },
    },
  ];
}

export function isWelcomePage(path: string): boolean {
  return (
    path === '/' ||
    path === '/login' ||
    path === '/register' ||
    path === '/editNewUser'
  );
}

export function isDynamicUserRoute(loggedInUser: User): boolean {
  if (getDynamicIdFromRedux() === undefined && loggedInUser.id) return true;

  return (
    getDynamicIdFromRedux() !== undefined &&
    getDynamicIdFromRedux() !== loggedInUser.id
  );
}

/**
 * Appends an entity id to a url
 * Example: id = 1, url = 'http://example.com' => http://example.com/1
 * @remarks This is a custom function.
 * @param url A url path.
 * @param id The new value to be appended to the url.
 * @returns returns a string.
 */
export function appendIdToUrl(url: string, id: string): string {
  if (
    url.includes('messages') ||
    url.includes('home') ||
    url.includes('settings')
  )
    return url;

  const DELIMITER = '/';
  const parts = url.split(DELIMITER);
  parts[2] = id;

  return parts.join('/');
}

/**
 * Icon Mapper.
 * @remarks This is a custom function.
 * @param icon An icon entity that will be injected.
 * @returns returns an icon.
 */
export function transform(icon: Icon): Icon {
  return {
    name: icon.name,
    src: icon.src,
    url: icon.url,
    navigate: icon.navigate,
    logOut: icon.logOut,
  };
}

/**
 * Returns a function that returns an array of type Icon in specified order.
 * Ex. (name: string, array: Icon[]) => (name: string, array: Icon[]) => Icon[].
 * @remarks This is a custom function.
 * @param name This parameter is used as a search string against the icon array.
 * @param array An array that will be used to determine the specific icon order.
 * @param user
 * @returns returns an array of type Icon.
 */
export function getOrder(name: string, array: Icon[], user: User): Icon[] {
  const allNavs = ['home', 'messages', 'profile', 'settings', 'logout'];

  switch (name) {
    case 'Home':
      return array
        .filter(
          (ic) =>
            ic.name.toLowerCase() === allNavs[1] ||
            ic.name.toLowerCase() === allNavs[2] ||
            ic.name.toLowerCase() === allNavs[3] ||
            ic.name.toLowerCase() === allNavs[4]
        )
        .map(transform);
    case 'Posts':
      return array
        .filter(
          (ic) =>
            ic.name.toLowerCase() === allNavs[1] ||
            ic.name.toLowerCase() === allNavs[2] ||
            ic.name.toLowerCase() === allNavs[3] ||
            ic.name.toLowerCase() === allNavs[4]
        )
        .map(transform);
    case 'Messages':
      return array
        .filter(
          (ic) =>
            ic.name.toLowerCase() === allNavs[0] ||
            ic.name.toLowerCase() === allNavs[2] ||
            ic.name.toLowerCase() === allNavs[3] ||
            ic.name.toLowerCase() === allNavs[4]
        )
        .map(transform);
    case 'Message':
      return array
        .filter(
          (ic) =>
            ic.name.toLowerCase() === allNavs[0] ||
            ic.name.toLowerCase() === allNavs[2] ||
            ic.name.toLowerCase() === allNavs[3] ||
            ic.name.toLowerCase() === allNavs[4]
        )
        .map(transform);
    case 'Profile':
      if (isDynamicUserRoute(user)) {
        return array;
      } else
        return array
          .filter(
            (ic) =>
              ic.name.toLowerCase() === allNavs[0] ||
              ic.name.toLowerCase() === allNavs[1] ||
              ic.name.toLowerCase() === allNavs[3] ||
              ic.name.toLowerCase() === allNavs[4]
          )
          .map(transform);
    case 'Close Account':
      return array
        .filter(
          (ic) =>
            ic.name.toLowerCase() === allNavs[0] ||
            ic.name.toLowerCase() === allNavs[3] ||
            ic.name.toLowerCase() === allNavs[4]
        )
        .map(transform);
    case 'Settings':
      return array
        .filter(
          (ic) =>
            ic.name.toLowerCase() === allNavs[0] ||
            ic.name.toLowerCase() === allNavs[1] ||
            ic.name.toLowerCase() === allNavs[2] ||
            ic.name.toLowerCase() === allNavs[4]
        )
        .map(transform);
    default:
      return array;
  }
}
