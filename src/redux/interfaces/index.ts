export interface ReduxState {
  data: {
    user: User;
    followers: User[];
    cover: string;
    following: boolean;
    hideMe: boolean;
    likes: User[];
    reroute: boolean;
    isLoading: boolean;
    tasks: string;
    hideTask: boolean;
  };
  posts: Post[];
}

export interface User {
  _id: string;
  firstName?: string;
  lastName: string;
  userName: string;
  email: string;
  followers: User[];
  following: User[];
  bio: string;
  location: string;
  image: string;
  cover: string;
  isVerified: boolean;
  activities: Post[];
  updatedAt: Date;
  createdAt?: Date;
}

export interface Post {
  _id: string;
  text: string;
  media: string;
  sharedPost: Post;
  user: User;
  comments: Comment[];
  likes: User[];
  createdAt: Date;
}

export interface Comment {
  _id: string;
  content: string;
  media: string;
  user: User;
  postId: string;
  replies: Replies[];
  createdAt: Date;
}

export interface Replies {
  _id: string;
  text: string;
  media?: string;
  user: User;
  commentId: string;
  createdAt: Date;
}

export interface Rooms {
  _id: string;
  members: User[];
}

export interface Message {
  roomId?: string;
  receiver?: string | undefined;
  text: string;
  image?: string;
  media?: string;
  sender: string;
  socketId?: string;
  createdAt: number;
}
export interface Cover {
  coverId: string;
}
