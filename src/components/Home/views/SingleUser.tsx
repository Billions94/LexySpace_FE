import React from 'react';
import { FC } from 'react';
import { Button } from 'react-bootstrap';
import { User } from '../../../redux/interfaces';

interface Props {
  toggle: (userId: string | undefined) => void;
  following: boolean;
  user: User;
  me: string;
}

export const SingleUser: FC<Props> = ({ toggle, following, user, me }) => {
  return (
    <div>
      {user?.id !== me ? (
        <div className="ml-auto">
          {!following ? (
            <Button
              onClick={() => toggle(user?.id)}
              size="sm"
              variant="primary"
              className="followbtn ml-auto"
            >
              follow
            </Button>
          ) : (
            <Button
              onClick={() => toggle(user?.id)}
              size="sm"
              variant="primary"
              className="nowfollowing ml-auto"
            >
              following
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
};
