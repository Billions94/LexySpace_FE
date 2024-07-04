import React from 'react';
import { useEffect, useState } from 'react';
import { Comment, Post, Replies } from '../../redux/interfaces';
import SingleReply from './SingleReply';

interface ReplyProps {
  post: Post | undefined;
  comment: Comment;
  commentID?: string;
}

const Reply = ({ post, comment, commentID }: ReplyProps) => {
  const url = process.env.REACT_APP_GET_URL;
  const [replies, setReplies] = useState<Replies[]>();

  const getReplies = async () => {
    try {
      const response = await fetch(`${url}/replies`);
      if (response.ok) {
        const data: Replies[] = await response.json();
        console.log('reply info', data);
        setReplies(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => getReplies())();
  }, [comment]);

  return (
    <>
      {
        <div
          id="replyContainer"
          className="d-flex"
          style={{ fontSize: '10px', marginTop: '5px' }}
        >
          {replies &&
            replies.map((reply, i) => (
              <SingleReply
                key={i}
                commentID={commentID}
                reply={reply}
                comment={comment}
                post={post}
                getReplies={getReplies}
              />
            ))}
        </div>
      }
    </>
  );
};

export default Reply;
