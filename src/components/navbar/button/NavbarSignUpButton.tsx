import { Button } from 'react-bootstrap';
import React from 'react';
import { NavigateFunction } from 'react-router-dom';

interface Props {
  navigate: NavigateFunction;
}

export const NavbarSignUpButton: React.FC<Props> = function ({ navigate }) {
  return (
    <div className="d-flex signup">
      <Button
        onClick={() => navigate('/register')}
        className="blog-navbar-add-button  newBlogPost"
        size="lg"
      >
        <div className="">
          <img
            src="https://img.icons8.com/material-rounded/50/ffffff/add-user-male.png"
            width="20px"
            alt="skin"
          />
        </div>
        <div style={{ fontSize: '16px' }}> sign Up </div>
      </Button>

      <Button
        onClick={() => navigate('/login')}
        className="ml-2 blog-navbar-add-button  newBlogPost"
        size="lg"
      >
        <div className="">
          <img
            src="https://img.icons8.com/glyph-neue/50/ffffff/logout-rounded.png"
            width="20px"
            alt="skin"
          />
        </div>
        <div style={{ fontSize: '16px' }}> log In </div>
      </Button>
    </div>
  );
};
