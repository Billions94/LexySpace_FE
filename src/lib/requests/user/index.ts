import React from 'react';
import { getFollowersAction } from '../../../redux/actions';
import { User } from '../../../redux/interfaces';
import API from '../../API';
import { FollowUser } from '../interfaces/user.interface';
import { getPosts } from '../post';

export async function follow(args: FollowUser) {
  const { userId, dispatch, following } = args;

  try {
    const { data } = await API.post(`/users/current-user/follow`, following);
    if (data) {
      await getPosts(dispatch);
      dispatch(getFollowersAction(userId));
    }
  } catch (error) {
    console.log(error);
  }
}

export const getUser = async (
  id?: string,
  setUser?: React.Dispatch<React.SetStateAction<User | null>>
) => {
  try {
    const { data } = await API.get(`/users/${id ? id : 'current-user'}`);
    if (data) setUser && setUser(data);

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
