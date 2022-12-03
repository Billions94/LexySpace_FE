import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Post } from "../../../dto";
import { reRouteAction } from "../../../redux/actions";


interface Props {
  post: Post;
}

export const PostDetails = ({ post }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const doSomething = (id: string | undefined) => {
    navigate(`/posts/${id}`);
    dispatch(reRouteAction(true));
  };

  return (
    <div onClick={() => doSomething(post.id)} className="blog-link">
      <div className="d-flex postBody">
        <div>
          <h6>{post.content}</h6>
          <div>
            {!post.media
              ? null
              : post.media &&
                post.media
                  .split(".")
                  .slice(-1)
                  .join()
                  .match(`heic|png|jpg|gif|pdf|jpeg`) && (
                  <h6>
                    {" "}
                    <img src={post.media} className="blog-cover" alt="" />
                  </h6>
                )}
            {!post.media
              ? null
              : post.media &&
                post.media
                  .split(".")
                  .slice(-1)
                  .join()
                  .match(`mp4|MPEG-4|mkv`) && (
                  <video
                    src={post.media}
                    className="blog-video"
                    controls
                    autoPlay
                    muted
                  ></video>
                )}
          </div>
        </div>
      </div>
    </div>
  );
};
