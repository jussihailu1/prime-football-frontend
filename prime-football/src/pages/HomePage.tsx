import { useEffect, useState } from "react"
import PostList from "../components/PostList";
import { getLatestTimeline, getTimeline } from "../shared/api";
import { DB_USERS } from "../shared/db";
import { Timeline } from "../shared/models";

export default function HomePage() {
    const [timeline, setTimeline] = useState<Timeline>();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let userId = sessionStorage.getItem("userId") as string
        getTimeline(userId).then((response: Timeline) => {
            handleReceivingPosts(response)
        })
    }, [])

    function refreshPage() {
        let userId = sessionStorage.getItem("userId") as string
        getLatestTimeline(userId).then((response: Timeline) => {
            handleReceivingPosts(response)
        })
    }

    function handleReceivingPosts(timeline: Timeline) {
        console.log(timeline)
        timeline.posts.map(post => {
            post.user = DB_USERS.find(u => u.id == post.user!!.id)!!
        })

        setTimeline(timeline)
        setLoading(false)
    }

    return (
        <div className="home-page-container">
            <div className='home-page-container-title-container'>
                <h2>Home page</h2>
                <div className='new-post button' onClick={refreshPage}>Refresh</div>
            </div>
            {loading ?
                <div>loading...</div>
                :
                <PostList posts={timeline!!.posts} />
            }
        </div>
    )
}
