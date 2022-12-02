import React from "react";
import EditNewUser from "./components/auth/EditNewUser";
import LogIn from "./components/auth/LogIn";
import Register from "./components/auth/Register";
import Home from "./components/home/Home";
import Messages from "./components/messages/Messages";
import CloseAccount from "./components/user/account/CloseAccount";
import Settings from "./components/user/account/Settings";
import Followers from "./components/user/followers/Followers";
import UserProfile from "./components/user/profile/UserProfile";
import BeforeLogin from "./components/welcomePage/WelcomePage";

export const routes: Array<[string, React.FC]> = [
  ["/", BeforeLogin],
  ["/register", Register],
  ["/login", LogIn],
  ["/editNewUser", EditNewUser],
  ["/home", Home],
  ["/posts/:id", Home],
  ["/messages", Messages],
  ["/messages/:id", Messages],
  ["/userProfile/:id", UserProfile],
  ["/settings", Settings],
  ["/followers/:id", Followers],
  ["/closeAccount", CloseAccount],
];
