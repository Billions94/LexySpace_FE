import React from 'react';
import LogIn from './components/auth/LogIn';
import Home from './components/home/Home';
import Register from './components/auth/Register';
import BeforeLogin from './components/welcomePage/WelcomePage';
import Messages from './components/messages/Messages';
import Blog from './components/home/views';
import UserProfile from './components/user/profile/UserProfile';
import Edit from './components/post/crud/EditPost';
import Followers from './components/user/followers/Followers';
import CloseAccount from './components/user/account/CloseAccount';
import Settings from './components/user/account/Settings';
import EditNewUser from './components/auth/EditNewUser';
import { VerifyAccount } from './components/auth/VerifyAccount';
// import DM from "./components/Home/messages/DM"

export const AppRoutes: Array<[string, React.FC]> = [
  ['login', LogIn],
  ['home', Home],
  ['posts/:id', Home],
  ['register', Register],
  ['/', BeforeLogin],
  ['messages', Messages],
  ['messages/:id', Messages],
  ['blog', Blog],
  ['userProfile/:id', UserProfile],
  ['edit', Edit],
  ['followers/:id', Followers],
  ['closeAccount', CloseAccount],
  ['settings', Settings],
  ['editNewUser', EditNewUser],
  ['verifyAccount', VerifyAccount],
  ['verifyAccount/:token', VerifyAccount],
];
