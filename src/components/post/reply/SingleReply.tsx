import React from 'react';
import { Dropdown, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { dateFormatter } from '../../../lib';
import { Comment, Post, ReduxState, Reply } from '../../../redux/interfaces';
import './styles.scss';

interface SingleReplyProps {
  commentID: string | undefined;
  comment: Comment;
  reply: Reply;
  post: Post | undefined;
  getReplies: () => Promise<void>;
}

const SingleReply = ({
  commentID,
  comment,
  reply,
  post,
  getReplies,
}: SingleReplyProps) => {
  const url = process.env.REACT_APP_GET_URL;
  const { user } = useSelector((state: ReduxState) => state.data);
  const me = user?.id;

  const deleteReply = async (id: string) => {
    try {
      const response = await fetch(`${url}/Reply/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) await getReplies();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="replyContainer">
      {comment.postId !== post?.id ? null : (
        <>
          {reply.commentId === commentID ? (
            <div className="d-flex">
              <div>
                <Link to={`userProfile/${reply.user.id}`}>
                  <Image
                    className="rounded-circle g-mt-3 g-mr-15"
                    width="37px"
                    height="37px"
                    src={reply.user.image}
                    alt="Image Description"
                  />
                </Link>
              </div>
              <div className="rply mb-2">
                <div
                  className="text-dark mb-1 timer postedReply"
                  style={{
                    fontSize: '14px',
                    borderBottom: '1px solid rgb(216, 215, 215)',
                  }}
                >
                  <div className="textColor">
                    {' '}
                    Posted: {dateFormatter(reply.createdAt)}{' '}
                  </div>
                  <div className="ml-auto">
                    {reply.user?.id !== me ? null : (
                      <Dropdown className="dropdowntext ml-auto" id={''}>
                        <Dropdown.Toggle className="btn btn-dark dropdownbtn">
                          <div className="text-muted dots">
                            <b>
                              <strong>•••</strong>
                            </b>
                          </div>
                          {/* <img alt=''
                                className="lrdimg"
                                width="15px"
                                src="https://img.icons8.com/android/50/000000/more.png" /> */}
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                          className="dropDownMenu"
                          style={{
                            padding: '18px',
                            borderRadius: '25px',
                            border: '1px solid rgb(216, 215, 215)',
                          }}
                        >
                          {/* <Edit /> */}
                          <div className="d-flex customLinks">
                            <div className="mr-3">
                              <img
                                alt=""
                                className="lrdimg"
                                width="17px"
                                src="https://img.icons8.com/fluency/50/000000/delete-sign.png"
                              />
                            </div>
                            <div onClick={() => deleteReply(reply.id)}>
                              delete
                            </div>
                          </div>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </div>
                </div>
                <div className="replyUserInfo  mb-1">
                  {reply.user.firstName} {reply.user.lastName}
                </div>
                <div className="replyText mb-1">{reply.text}</div>
                <div className="mt-2 media">
                  {!reply.media
                    ? null
                    : /heic|png|jpg|pdf|jpeg/.exec(
                        reply?.media.split('.').slice(-1).join()
                      ) && <img className="img" src={reply.media} alt="" />}
                  {!reply.media
                    ? null
                    : /mp4|MPEG-4|mkv/.exec(
                        reply.media.split('.').slice(-1).join()
                      ) && (
                        <video
                          src={reply.media}
                          className="post-video"
                          controls
                          autoPlay
                          muted
                        ></video>
                      )}
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default SingleReply;
