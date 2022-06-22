import { Post, Timeline } from "./models";

// const baseURL = "http://85.10.139.127:9080"
const baseURL = "https://clean-tigers-nail-85-10-139-127.loca.lt"
// const baseURL = "http://localhost:8080"


const URLs = {
    posts: {
        user: baseURL + "/posts/user/",
        create: baseURL + "/posts/",
        delete: baseURL + "/posts/"
    },
    timeline: (userId: string, latest: boolean = false) => baseURL + "/timeline/" + userId + (latest ? '/latest' : ''),
    authentication: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8DQtbaO6OsjS9_d47f2S2-LV-cnL6XA0'
}

const headers = {
    "Authorization": localStorage.getItem('token')!!,
    "Content-Type": "application/json"
}

export function getTimeline(userId: string): Promise<Timeline> {
    return new Promise(async (resolve, reject) => {
        fetch(URLs.timeline(userId), {
            method: "GET",
            headers: headers
        }).then((value) => { value.json().then((response) => resolve(response)) });
    })
}

export function getLatestTimeline(userId: string): Promise<Timeline> {
    return new Promise(async (resolve, reject) => {
        fetch(URLs.timeline(userId, true), {
            method: "GET",
            headers: headers
        }).then((value) => { value.json().then((response) => resolve(response)) });
    })
}

export function getPostsByUserId(userId: string): Promise<Post[]> {
    return new Promise(async (resolve, reject) => {
        fetch(URLs.posts.user + userId, {
            method: "GET",
            headers: headers
        }).then((value) => { value.json().then((response) => resolve(response)) });
    })
}

export function storePost(post: Post): Promise<any> {
    return new Promise(async (resolve, reject) => {
        fetch(URLs.posts.create, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(post)
        }).then((value) => { value.json().then((response) => resolve(response)) });
    })
}

export function deletePost(postId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
        fetch(URLs.posts.delete + postId, {
            method: "DELETE",
            headers: headers
        }).then((value) => { value.json().then((response) => resolve(response)) });
    })
}

export function authenticate(): Promise<any> {
    const body = {
        "email": "test123@gmail.com",
        "password": "test123",
        "returnSecureToken": true
    }

    return new Promise(async (resolve, reject) => {
        fetch(URLs.authentication, {
            method: 'POST',
            body: JSON.stringify(body)
        }).then((value) => { value.json().then((response) => resolve(response)) });
    })
}