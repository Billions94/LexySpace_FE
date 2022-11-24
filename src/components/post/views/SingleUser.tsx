import { FC } from "react";
import { Button } from "react-bootstrap";
import { User } from "../../../redux/interfaces";

interface Props {
  toggle: (userId: string | undefined) => void;
  following: boolean;
  user: User;
  me: string;
}

export const SingleUser: FC<Props> = (props: Props) => {
  const { toggle, following, user, me } = props;
  return (
    <div>
      {user?._id !== me ? (
        <div className="ml-auto">
          {following === false ? (
            <Button
              onClick={() => toggle(user?._id)}
              size="sm"
              variant="primary"
              className="followbtn ml-auto"
            >
              follow
            </Button>
          ) : (
            <Button
              onClick={() => toggle(user?._id)}
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
