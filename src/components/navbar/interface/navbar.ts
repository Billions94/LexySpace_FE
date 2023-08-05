import { NavigateFunction } from 'react-router-dom';
import React from 'react';

export interface NavbarDropDown {
  style: { [key: string]: string };
  dropDownMenuStyle: { [key: string]: string };
  linkClassName: string;
  className: string;
  image?: string;
  avatar?: Avatar;
  navigate?: NavigateFunction;
  logOut?: () => Promise<void>;
}

export interface SX {
  src: string;
  width: string | number;
  height: string | number;
  marginTop?: string | number;
  marginLeft?: string | number;
  marginRight?: string | number;
  marginBottom?: string | number;
}

export interface Avatar {
  sx: SX;
}

export interface NavbarImage {
  src: string;
  className: string;
}

export interface Container {
  divClassName: string;
  className: string;
}

export interface NavbarProp {
  container: Container;
  brandName: string;
  brandClassName: string;
  brandLogo: NavbarImage;
  name: string;
  path: string;
  userId?: string;
  dropDownProps: NavbarDropDown;
}

export interface Icon {
  name: string;
  src: string;
  url: string;
  navigate?: NavigateFunction;
  logOut?: () => Promise<void>;
}
