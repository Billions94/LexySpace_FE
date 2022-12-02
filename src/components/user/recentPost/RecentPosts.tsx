import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../redux/interfaces";
import RecentItem from "./RecentItem";

interface Props {
  userId: string | undefined;
}

const Recentposts: FC<Props> = ({ userId }: Props) => {
  const [showRecent, setShowRecent] = useState(true);
  const posts = useSelector((state: ReduxState) => state.posts);

  function toggle() {
    showRecent === false ? setShowRecent(true) : setShowRecent(false);
  }

  return (
    <div id="recentPost">
      <h5 onClick={() => toggle()} className="text-center">
        #recent activities
      </h5>
      <div className="recentDiv">
        {showRecent === false ? null : (
          <>
            {posts.map((post) => (
              <>
                {userId === post.author.id ? (
                  <RecentItem key={post.id} post={post} />
                ) : null}
              </>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Recentposts;
