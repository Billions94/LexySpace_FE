import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateRegister: any;
  DateTime: any;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type AuthUserInput = {
  confirmPassword?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
  userName?: InputMaybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  author?: Maybe<User>;
  content: Scalars['String'];
  createdAt?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  media?: Maybe<Scalars['String']>;
  postId: Scalars['String'];
  replies?: Maybe<Array<Maybe<Reply>>>;
};

export type CommentInput = {
  content: Scalars['String'];
  media?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment: Comment;
  addPost: Post;
  addPostLike: Scalars['Boolean'];
  addReply: Reply;
  deleteComment: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  deleteReply: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  login?: Maybe<AuthResponse>;
  register?: Maybe<AuthResponse>;
  updateComment: Comment;
  updatePost: Post;
  updateReply: Reply;
  updateUser: User;
};


export type MutationAddCommentArgs = {
  input?: InputMaybe<CommentInput>;
  postId?: InputMaybe<Scalars['String']>;
};


export type MutationAddPostArgs = {
  input?: InputMaybe<PostInput>;
};


export type MutationAddPostLikeArgs = {
  postId?: InputMaybe<Scalars['String']>;
};


export type MutationAddReplyArgs = {
  commentId?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<ReplyInput>;
};


export type MutationDeleteCommentArgs = {
  commentId?: InputMaybe<Scalars['String']>;
};


export type MutationDeletePostArgs = {
  postId?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteReplyArgs = {
  replyId?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteUserArgs = {
  userId?: InputMaybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  input?: InputMaybe<AuthUserInput>;
};


export type MutationRegisterArgs = {
  input?: InputMaybe<AuthUserInput>;
};


export type MutationUpdateCommentArgs = {
  commentId?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<CommentInput>;
};


export type MutationUpdatePostArgs = {
  input?: InputMaybe<PostInput>;
  postId?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateReplyArgs = {
  input?: InputMaybe<ReplyInput>;
  replyId?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateUserArgs = {
  input?: InputMaybe<UserInput>;
};

export type Post = {
  __typename?: 'Post';
  author: User;
  comments?: Maybe<Array<Maybe<Comment>>>;
  content: Scalars['String'];
  createdAt?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  likes?: Maybe<Array<Maybe<User>>>;
  media?: Maybe<Scalars['String']>;
  sharedPost?: Maybe<Post>;
};

export type PostInput = {
  content: Scalars['String'];
  media?: InputMaybe<Scalars['String']>;
  sharedPost?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  comments: Array<Comment>;
  getCommentById: Comment;
  getPostById: Post;
  getReplyById: Post;
  posts: Array<Post>;
  replies: Array<Reply>;
  user: User;
  userById: User;
  users: Array<User>;
};


export type QueryGetCommentByIdArgs = {
  commentId?: InputMaybe<Scalars['String']>;
};


export type QueryGetPostByIdArgs = {
  postId?: InputMaybe<Scalars['String']>;
};


export type QueryGetReplyByIdArgs = {
  replyId?: InputMaybe<Scalars['String']>;
};


export type QueryUserByIdArgs = {
  userId?: InputMaybe<Scalars['String']>;
};

export type Reply = {
  __typename?: 'Reply';
  author?: Maybe<User>;
  commentId: Scalars['String'];
  content: Scalars['String'];
  createdAt?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  media?: Maybe<Scalars['String']>;
};

export type ReplyInput = {
  content: Scalars['String'];
  media?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newPost?: Maybe<Post>;
};

export type User = {
  __typename?: 'User';
  activities?: Maybe<Array<Maybe<Post>>>;
  bio?: Maybe<Scalars['String']>;
  cover?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  followers?: Maybe<Array<Maybe<User>>>;
  following?: Maybe<Array<Maybe<User>>>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  isVerified?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  session?: Maybe<Scalars['String']>;
  userName: Scalars['String'];
};

export type UserInput = {
  bio?: InputMaybe<Scalars['String']>;
  cover?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  userName?: InputMaybe<Scalars['String']>;
};

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', content: string, createdAt?: any | null, id: string, media?: string | null, author: { __typename?: 'User', id: string, userName: string, bio?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, refreshToken?: string | null, location?: string | null, image?: string | null, cover?: string | null, session?: string | null, isVerified?: boolean | null, createdAt?: any | null, following?: Array<{ __typename?: 'User', id: string } | null> | null, followers?: Array<{ __typename?: 'User', id: string } | null> | null }, comments?: Array<{ __typename?: 'Comment', id: string, content: string } | null> | null, likes?: Array<{ __typename?: 'User', id: string, userName: string, firstName?: string | null, lastName?: string | null, image?: string | null } | null> | null, sharedPost?: { __typename?: 'Post', content: string, media?: string | null, createdAt?: any | null, author: { __typename?: 'User', firstName?: string | null } } | null }> };

export type GetPostByIdQueryVariables = Exact<{
  postId?: InputMaybe<Scalars['String']>;
}>;


export type GetPostByIdQuery = { __typename?: 'Query', getPostById: { __typename?: 'Post', id: string, content: string, media?: string | null, createdAt?: any | null, sharedPost?: { __typename?: 'Post', id: string } | null, author: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email?: string | null, refreshToken?: string | null, bio?: string | null, location?: string | null, image?: string | null, cover?: string | null, session?: string | null, isVerified?: boolean | null, userName: string }, comments?: Array<{ __typename?: 'Comment', id: string, content: string, media?: string | null, postId: string, replies?: Array<{ __typename?: 'Reply', id: string, content: string, media?: string | null, commentId: string } | null> | null } | null> | null, likes?: Array<{ __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email?: string | null, bio?: string | null, location?: string | null, image?: string | null, cover?: string | null, session?: string | null, isVerified?: boolean | null } | null> | null } };

export type AddPostMutationVariables = Exact<{
  input?: InputMaybe<PostInput>;
}>;


export type AddPostMutation = { __typename?: 'Mutation', addPost: { __typename?: 'Post', id: string, content: string, media?: string | null, createdAt?: any | null, sharedPost?: { __typename?: 'Post', id: string } | null, comments?: Array<{ __typename?: 'Comment', id: string, content: string, media?: string | null, postId: string, replies?: Array<{ __typename?: 'Reply', id: string, content: string, media?: string | null, commentId: string } | null> | null } | null> | null, likes?: Array<{ __typename?: 'User', id: string } | null> | null } };

export type UpdatePostMutationVariables = Exact<{
  postId?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<PostInput>;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Post', content: string, id: string, media?: string | null, author: { __typename?: 'User', id: string }, comments?: Array<{ __typename?: 'Comment', content: string, id: string, media?: string | null } | null> | null, likes?: Array<{ __typename?: 'User', id: string } | null> | null } };

export type DeletePostMutationVariables = Exact<{
  postId?: InputMaybe<Scalars['String']>;
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email?: string | null, bio?: string | null, location?: string | null, image?: string | null, cover?: string | null, session?: string | null, isVerified?: boolean | null, createdAt?: any | null, userName: string, followers?: Array<{ __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, userName: string, email?: string | null, refreshToken?: string | null, bio?: string | null, location?: string | null, image?: string | null, cover?: string | null, session?: string | null, isVerified?: boolean | null, createdAt?: any | null } | null> | null, following?: Array<{ __typename?: 'User', id: string } | null> | null }> };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, userName: string, email?: string | null, bio?: string | null, location?: string | null, image?: string | null, cover?: string | null, isVerified?: boolean | null, createdAt?: any | null, followers?: Array<{ __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, userName: string, email?: string | null, bio?: string | null, location?: string | null, image?: string | null, cover?: string | null, session?: string | null, isVerified?: boolean | null, createdAt?: any | null } | null> | null, following?: Array<{ __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, userName: string, email?: string | null, bio?: string | null, location?: string | null, image?: string | null, cover?: string | null, session?: string | null, isVerified?: boolean | null, createdAt?: any | null } | null> | null } };

export type UserByIdQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']>;
}>;


export type UserByIdQuery = { __typename?: 'Query', userById: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, userName: string, email?: string | null, refreshToken?: string | null, bio?: string | null, location?: string | null, image?: string | null, cover?: string | null, session?: string | null, isVerified?: boolean | null, createdAt?: any | null, followers?: Array<{ __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, userName: string, email?: string | null, refreshToken?: string | null, bio?: string | null, location?: string | null, image?: string | null, cover?: string | null, session?: string | null, isVerified?: boolean | null, createdAt?: any | null } | null> | null, following?: Array<{ __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, userName: string, email?: string | null, refreshToken?: string | null, bio?: string | null, location?: string | null, image?: string | null, cover?: string | null, session?: string | null, isVerified?: boolean | null, createdAt?: any | null } | null> | null } };

export type RegisterMutationVariables = Exact<{
  input?: InputMaybe<AuthUserInput>;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string } | null };

export type LoginMutationVariables = Exact<{
  input?: InputMaybe<AuthUserInput>;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string } | null };

export type UpdateUserMutationVariables = Exact<{
  input?: InputMaybe<UserInput>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', bio?: string | null, cover?: string | null, email?: string | null, userName: string, firstName?: string | null, lastName?: string | null, image?: string | null, isVerified?: boolean | null, location?: string | null } };

export type DeleteUserMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['String']>;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };


export const PostsDocument = gql`
    query Posts {
  posts {
    author {
      id
      userName
      bio
      firstName
      lastName
      email
      following {
        id
      }
      followers {
        id
      }
      refreshToken
      location
      image
      cover
      session
      isVerified
      createdAt
    }
    comments {
      id
      content
    }
    content
    createdAt
    id
    likes {
      id
      userName
      firstName
      lastName
      image
    }
    media
    sharedPost {
      author {
        firstName
      }
      content
      media
      createdAt
    }
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const GetPostByIdDocument = gql`
    query GetPostById($postId: String) {
  getPostById(postId: $postId) {
    id
    content
    media
    sharedPost {
      id
    }
    author {
      id
      firstName
      lastName
      email
      refreshToken
      bio
      location
      image
      cover
      session
      isVerified
      userName
    }
    comments {
      id
      content
      media
      postId
      replies {
        id
        content
        media
        commentId
      }
    }
    likes {
      id
      firstName
      lastName
      email
      bio
      location
      image
      cover
      session
      isVerified
    }
    createdAt
  }
}
    `;

/**
 * __useGetPostByIdQuery__
 *
 * To run a query within a React component, call `useGetPostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostByIdQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetPostByIdQuery(baseOptions?: Apollo.QueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, options);
      }
export function useGetPostByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, options);
        }
export type GetPostByIdQueryHookResult = ReturnType<typeof useGetPostByIdQuery>;
export type GetPostByIdLazyQueryHookResult = ReturnType<typeof useGetPostByIdLazyQuery>;
export type GetPostByIdQueryResult = Apollo.QueryResult<GetPostByIdQuery, GetPostByIdQueryVariables>;
export const AddPostDocument = gql`
    mutation AddPost($input: PostInput) {
  addPost(input: $input) {
    id
    content
    media
    sharedPost {
      id
    }
    comments {
      id
      content
      media
      postId
      replies {
        id
        content
        media
        commentId
      }
    }
    likes {
      id
    }
    createdAt
  }
}
    `;
export type AddPostMutationFn = Apollo.MutationFunction<AddPostMutation, AddPostMutationVariables>;

/**
 * __useAddPostMutation__
 *
 * To run a mutation, you first call `useAddPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPostMutation, { data, loading, error }] = useAddPostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddPostMutation(baseOptions?: Apollo.MutationHookOptions<AddPostMutation, AddPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPostMutation, AddPostMutationVariables>(AddPostDocument, options);
      }
export type AddPostMutationHookResult = ReturnType<typeof useAddPostMutation>;
export type AddPostMutationResult = Apollo.MutationResult<AddPostMutation>;
export type AddPostMutationOptions = Apollo.BaseMutationOptions<AddPostMutation, AddPostMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($postId: String, $input: PostInput) {
  updatePost(postId: $postId, input: $input) {
    author {
      id
    }
    comments {
      content
      id
      media
    }
    content
    id
    media
    likes {
      id
    }
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postId: String) {
  deletePost(postId: $postId)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    firstName
    lastName
    email
    bio
    location
    image
    cover
    session
    isVerified
    createdAt
    userName
    followers {
      id
      firstName
      lastName
      userName
      email
      refreshToken
      bio
      location
      image
      cover
      session
      isVerified
      createdAt
    }
    following {
      id
    }
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const UserDocument = gql`
    query User {
  user {
    id
    firstName
    lastName
    userName
    email
    bio
    location
    image
    cover
    isVerified
    createdAt
    followers {
      id
      firstName
      lastName
      userName
      email
      bio
      location
      image
      cover
      session
      isVerified
      createdAt
    }
    following {
      id
      firstName
      lastName
      userName
      email
      bio
      location
      image
      cover
      session
      isVerified
      createdAt
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UserByIdDocument = gql`
    query UserById($userId: String) {
  userById(userId: $userId) {
    id
    firstName
    lastName
    userName
    email
    refreshToken
    bio
    location
    image
    cover
    session
    isVerified
    createdAt
    followers {
      id
      firstName
      lastName
      userName
      email
      refreshToken
      bio
      location
      image
      cover
      session
      isVerified
      createdAt
    }
    following {
      id
      firstName
      lastName
      userName
      email
      refreshToken
      bio
      location
      image
      cover
      session
      isVerified
      createdAt
    }
  }
}
    `;

/**
 * __useUserByIdQuery__
 *
 * To run a query within a React component, call `useUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserByIdQuery(baseOptions?: Apollo.QueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, options);
      }
export function useUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, options);
        }
export type UserByIdQueryHookResult = ReturnType<typeof useUserByIdQuery>;
export type UserByIdLazyQueryHookResult = ReturnType<typeof useUserByIdLazyQuery>;
export type UserByIdQueryResult = Apollo.QueryResult<UserByIdQuery, UserByIdQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($input: AuthUserInput) {
  register(input: $input) {
    accessToken
    refreshToken
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: AuthUserInput) {
  login(input: $input) {
    accessToken
    refreshToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: UserInput) {
  updateUser(input: $input) {
    bio
    cover
    email
    userName
    firstName
    lastName
    image
    isVerified
    location
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($userId: String) {
  deleteUser(userId: $userId)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;