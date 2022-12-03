import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { reRouteAction } from "../../redux/actions";
import { ReduxState } from "../../redux/interfaces";
import Loader from "../loader/Loader";
import "./styles.scss";

const HotPosts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [seeMore, setSeeMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { posts } = useSelector((state: ReduxState) => state);
  const newPost = posts
    .map((p) => p)
    .sort((a, b) => b.likes!.length - a.likes!.length);

  const toggle = () => {
    seeMore === false ? setSeeMore(true) : setSeeMore(false);
  };

  const doSomething = (id: string | undefined) => {
    navigate(`/posts/${id}`);
    dispatch(reRouteAction(true));
  };

  return !posts ? (
    <Loader />
  ) : (
    <div id="hotposts" className="mb-4">
      {isLoading === true ? (
        <div className="loader">
          <Spinner className="spinner" animation="border" />{" "}
        </div>
      ) : (
        <>
          <div className="p-3 d-flex">
            <img
              src="https://img.icons8.com/ios-filled/50/ffffff/anonymous-mask.png"
              width="27px"
              height="27px"
              alt=""
            />
            <h4 className="textColor ml-2"> Top Posts</h4>
          </div>
          <div className="mb-0">
            {newPost &&
              newPost.slice(0, 5).map((p, i) => (
                <div
                  key={i}
                  onClick={() => doSomething(p.id)}
                  className="hotpostList"
                >
                  <div className="d-flex index">
                    <span className="text-muted">{i + 1} .</span>
                    <span className="text-muted">Top Posts</span>
                  </div>
                  <div className="text">
                    <p className="strong">{p.content}</p>
                  </div>
                  <div className="likes">
                    {p.likes!.length > 1 ? (
                      <span className="text-muted">
                        {p.likes!.length} likes
                      </span>
                    ) : (
                      <span className="text-muted">{p.likes!.length} like</span>
                    )}
                  </div>
                </div>
              ))}
            {seeMore === true
              ? newPost.slice(5, 10).map((p, i) => (
                  <div
                    key={i}
                    onClick={() => doSomething(p.id)}
                    className="hotpostList"
                  >
                    <div className="d-flex index">
                      <span className="text-muted">{i + 6} .</span>
                      <span className="text-muted">Top Posts</span>
                    </div>
                    <div className="text">
                      <p className="strong">{p.content}</p>
                    </div>
                    <div className="likes">
                      {p.likes!.length > 1 ? (
                        <span className="text-muted">
                          {p.likes!.length} likes
                        </span>
                      ) : (
                        <span className="text-muted">
                          {p.likes!.length} like
                        </span>
                      )}
                    </div>
                  </div>
                ))
              : null}
          </div>
          <div className="seeMoreDiv">
            {newPost!.length > 5 ? (
              <div>
                {seeMore === false ? (
                  <p
                    className="text-left text-muted p-0"
                    onClick={() => toggle()}
                  >
                    <b className="seeMore">Show More</b>
                  </p>
                ) : (
                  <p
                    className="text-left text-muted p-0"
                    onClick={() => toggle()}
                  >
                    <b className="seeMore">Show Less</b>
                  </p>
                )}
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default HotPosts;
