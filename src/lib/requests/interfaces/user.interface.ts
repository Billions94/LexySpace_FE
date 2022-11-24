export interface FollowUser {
  userId: string;
  following: {
    followingUserID: string;
  };
  dispatch: any;
}
