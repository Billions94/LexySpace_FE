import { getFollowersAction } from "../../../redux/actions";
import API from "../../API";
import { FollowUser } from "../interfaces/user.interface";
import { getPosts } from "../post";

export async function follow(args: FollowUser) {
  const { userId, dispatch, following } = args;

  try {
    const { data } = await API.post(`/users/me/follow`, following);
    if (data) {
      getPosts(dispatch);
      dispatch(getFollowersAction(userId));
    } else {
      throw new Error("Something went wrong :(");
    }
  } catch (error) {
    console.log(error);
  }
}
