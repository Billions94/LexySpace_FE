import { getFollowersAction } from '../../../redux/actions';
import API from '../../API';
import { FollowUser } from '../interfaces/user.interface';
import { getPosts } from '../post';
import React from 'react';
import { User } from '../../../redux/interfaces';

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
    const { data } = await API.get(`/users/${id}`, {
      params: { filter: 'verified' },
    });
    if (data) {
      setUser && setUser(data);
    }
    console.log({ data });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
