import { Post } from "../shared/models";

export default function PostList(props: { posts: Post[] }) {
    return (
        <>
            {
                props.posts.map((post, key) => {
                    return (
                        <div key={key} id={"post-id-" + post.id} className="home-page-container-post">
                            <div className="home-page-container-post-user">
                                <div className="username button" onClick={() => window.location.href = "/profile/" + post.user!!.id}>{post.user!!.username}</div>
                            </div>
                            <hr className="home-page-container-post-hr" />
                            <div className="home-page-container-post-body">
                                <div className="home-page-container-post-body-text">{post.text}</div>
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
    )
}
