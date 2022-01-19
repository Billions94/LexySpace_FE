export interface ReduxState {
    data: {
        user: User 
        followers: User[]
    },
    posts: Posts[] 
}


export interface User {
    _id: string;
    createdAt?: Date
    firstName?: string;
    lastName: string;
    userName: string;
    email: string;
    followers: User[]
    bio: string;
    location: string;
    image: string;
    isVerified: boolean
    updatedAt: Date  
}

export interface Posts {
    _id: string
    cover: string;
    text: string;
    sharedPost: Posts
    user: User;
    comments: Comments[];
    likes: User[]
    createdAt: Date  
}

export interface Comments {
    _id: string;
    text: string;
    user: User;
    postId: string;
    replies: Replies[];
    createdAt: Date
}

export interface Replies {
    _id: string;
    text: string;
    user: User;
    commentId: string
}