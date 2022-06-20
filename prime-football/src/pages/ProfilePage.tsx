import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostList from '../components/PostList';
import { getPostsByUserId, deletePost, storePost } from '../shared/api';
import { DB_USERS } from '../shared/db';
import { Post } from '../shared/models';
import './pageStyling.css'

export default function ProfilePage() {
    const { id } = useParams();
    const [posts, setPosts] = useState<Post[]>()
    const [loading, setLoading] = useState(true)
    const [postToDeleteId, setPostToDeleteId] = useState<string>()
    const [isCurrentUser, setCurrentUser] = useState<boolean>()
    const [creatingPost, setCreatingPost] = useState(false)
    const [newPostText, setNewPostText] = useState("")

    useEffect(() => {
        setCurrentUser(id == undefined)

        getPostsByUserId(id ?? sessionStorage.getItem("userId")!! as string).then((response: Post[]) => {
            console.log(response)
            if (!isCurrentUser) {
                response.map(post => {
                    post.user = DB_USERS.find(u => u.id == post.posterId)!!
                })
            }
            setPosts(response)
            setLoading(false)
        })
    }, [])

    function handleDeletePost(postId: string) {
        deletePost(postId).then(() => {
            window.location.reload()
        })
    }

    function createNewPost() {
        let newPost: Post = {
            id: "",
            posterId: id ?? sessionStorage.getItem("userId")!!,
            text: newPostText,
            file: "some file",
            timestamp: new Date().toISOString(),
            user: null
        }
        storePost(newPost).then(() => {
            window.location.reload()
        })
    }

    return (
        <div className="home-page-container">
            <div className='home-page-container-title-container'>
                <h2>{DB_USERS.find(u => u.id == (id ?? sessionStorage.getItem("userId")!! as string))?.username}</h2>
                {isCurrentUser && !creatingPost && <div id='newPost-button' className='new-post button' onClick={() => setCreatingPost(true)}>New post</div>}
            </div>
            {loading ?
                <div>loading...</div>
                :
                isCurrentUser ?
                    <>
                        {creatingPost &&
                            <div className='new-post-container'>
                                <div className="new-post-field-container">
                                    <label>New post</label>
                                    <input id='newPost-input' value={newPostText} onChange={(e) => setNewPostText(e.target.value)} type="text" />
                                </div>
                                <div className='new-post-actions'>
                                    <div id='newPost-post-button' className="button color-blue" onClick={createNewPost}>Post</div>
                                    <div className='button color-red' onClick={() => setCreatingPost(false)}>Cancel</div>
                                </div>
                            </div>
                        }
                        {
                            posts!!.map((post, key) => {
                                return (
                                    <div key={key} id={"post-id-" + post.id} className="home-page-container-post">
                                        <div className="home-page-container-post-body">
                                            <div className="home-page-container-post-body-header">
                                                <div className="home-page-container-post-body-text">{post.text}</div>
                                                <div className='home-page-container-post-body-header-actions'>
                                                    {postToDeleteId == post.id ?
                                                        <>
                                                            <div className='color-red button confirm-delete-button' onClick={() => handleDeletePost(post.id)}>Confirm</div>
                                                            <div className='color-blue button' onClick={() => { setPostToDeleteId("") }}>Cancel</div>
                                                        </>
                                                        :
                                                        <div className='color-red button delete-button' onClick={() => setPostToDeleteId(post.id)}>Delete</div>
                                                    }
                                                </div>
                                            </div>
                                            {/* <div className="file">
                                                <img src="https://picsum.photos/400/200" alt="" />
                                            </div> */}
                                            <div className="timestamp">{post.timestamp}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>
                    :
                    <PostList posts={posts!!} />
            }
        </div>
    )
}
