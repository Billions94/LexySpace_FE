import React from 'react';
import style from './UserAvatarStyle.module.scss';

interface Props {
  firstName: string;
  lastName: string;
  className?: AvatarStyle;
}

export enum AvatarStyle {
  NAVBAR = 'navBarAvatar',
  PROFILE = 'profileAvatar',
  MODAL = 'modalAvatar',
}

export const NewUserAvatar: React.FC<Props> = function ({
  firstName,
  lastName,
  className = AvatarStyle.NAVBAR,
}) {
  return (
    <div>
      <div id={style[className]}>
        {firstName?.slice(0, 1)}
        {lastName?.slice(0, 1)}
      </div>
    </div>
  );
};
