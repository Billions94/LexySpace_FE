export interface ReduxState {
    data: {
        user: User | null,
        followers: User[]
    },
    posts: Posts[] 
}


export interface User {
    _id?: string;
    createdAt?: Date
    firstName?: string;
    lastName?: string;
    userName?: string;
    email?: string;
    followers?: User[]
    bio?: string;
    location?: string;
    image?: string;
    isVerified?: boolean
    updatedAt?: Date  
}

export interface Posts {
    _id: string
    cover: string;
    text: string;
    user: User;
    comments: Comments[];
    likes: User[]
}

interface Comments {
    _id?: string;
    text: string;
    user: User;
    postId: Posts | string;
    replies: Replies[];
}

interface Replies {
    _id?: string;
    text: string;
    user: User;
    commentId: Comments | string
}