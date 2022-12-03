import { FC, useState } from "react";
import { Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { postTimer } from "../../../lib/index";
import UserInfo from "./UserInfo";
import { defaultAvatar } from "../../../assets/icons";
import "./styles.scss";
import { User } from "../../../dto";

const PostAuthor: FC<User> = (user: User) => {
  const { firstName, isVerified, image, createdAt, userName, id } = user;

  const [timer, setTimer] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  const handleShow = () =>
    setTimeout(() => {
      setShow(true);
    }, 500);
  const handleClose = () => {
    {
      setTimeout(() => {
        if (timer === true) {
          setShow(false);
        }
      }, 500);
    }
  };
  

  return (
    <Row
      id="blogAuthorContainer"
      onMouseEnter={handleShow}
      onMouseLeave={() => {
        handleClose();
        setTimer(true);
      }}
    >
      <div className="d-flex align-items-center">
        <UserInfo
          show={show}
          handleShow={handleShow}
          handleClose={handleClose}
          setTimer={setTimer}
          author={user}
        />

        <Link className="text-decoration-none" to={`/userProfile/${id}`}>
          <div id="authorDetails" className="d-flex">
            <Image
              style={{ width: "50px", height: "50px" }}
              className="blog-author authorDetails"
              src={image ? image : defaultAvatar}
              roundedCircle
            />
            <div style={{ marginLeft: "10px" }}>
              <h6 className="text-dark authorFirstName mb-0">
                {firstName}
                {isVerified === true && (
                  <span className=" mt-1 ml-1  d-flex-row align-items-center">
                    <img
                      alt=""
                      className="mr-2"
                      width="15"
                      src="https://img.icons8.com/ios-filled/50/4a90e2/verified-account.png"
                    />
                  </span>
                )}
              </h6>
              <h6 className="text-muted authorUserName mb-1">@{userName}</h6>
              <h6 className="text-muted postTime">
                ● {postTimer(createdAt)} ago
              </h6>
            </div>
          </div>
        </Link>
      </div>
    </Row>
  );
};

export default PostAuthor;
