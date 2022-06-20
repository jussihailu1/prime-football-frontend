export interface User {
    id: string
    username: string
    profileImage: string
}

export interface Post {
    id: string
    user: User | null;
    posterId: string
    text: string
    file: string
    timestamp: string | null;
}

export interface Timeline {
    posts: Post[]
}