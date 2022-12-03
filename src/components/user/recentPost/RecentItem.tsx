import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reRouteAction } from "../../../redux/actions";
import { Post } from "../../../dto";

interface Props {
  post: Post;
}

const RecentItem: React.FC<Props> = ({ post }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function route(postId: string | undefined) {
    navigate(`/posts/${postId}`);
    dispatch(reRouteAction(true));
  }

  return (
    <div className="recentItem mb-3" onClick={() => route(post.id)}>
      <div className="">
        <div className="circleBorders">
          {!post.media ? (
            <h6>{post.content}</h6>
          ) : (
            <div>
              {post.media &&
                post.media
                  .split(".")
                  .slice(-1)
                  .join()
                  .match(`heic|png|jpg|gif|pdf|jpeg`) && (
                  <img src={post.media} className="media" alt="" />
                )}
              {post.media &&
                post.media
                  .split(".")
                  .slice(-1)
                  .join()
                  .match(`mp4|MPEG-4|mkv`) && (
                  <video
                    src={post.media}
                    className="media"
                    controls
                    autoPlay
                    muted
                  ></video>
                )}
            </div>
          )}
          {/* <BlogItem {...post} getData={getData} /> */}
        </div>
      </div>
    </div>
  );
};

export default RecentItem;
