import { Dispatch, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";

export interface CreateNewPost {
  userName: string;
  post: {
    text: string;
  };
  media?: string;
  setMedia: Dispatch<SetStateAction<string>>;
  setPost: Dispatch<
    SetStateAction<{
      text: string;
    }>
  >;
  setFetchLoading?: Dispatch<SetStateAction<boolean>>;
  dispatch: any;
  setShow?: Dispatch<SetStateAction<boolean>>;
}

export interface UpdatePost {
  post: {
    text: string;
  };
  media: string;
  setMedia: Dispatch<SetStateAction<string>>;
  postId: string;
  setShow: Dispatch<SetStateAction<boolean>>;
  dispatch: any;
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}

export interface SharePost extends Omit<CreateNewPost, 'setPost'> {
  navigate: NavigateFunction;
}
