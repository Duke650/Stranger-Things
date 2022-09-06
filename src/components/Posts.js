import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Posts({posts, setPosts}) {
    let navigate = useNavigate();
    const fetchPosts = async () => {
        try {
        const result = await fetch("https://strangers-things.herokuapp.com/api/2206-ftb-pt-web-pt/posts")
        const data = await result.json();
        setPosts(data.data.posts)
        } catch(err) {
            console.error(err);
        }
        
    }

    useEffect(() => {
        fetchPosts()
    }, []);
    
    const newPost = () => {
        navigate("/AddPost")
    }

    return (
        <div className="posts">
            <h1>Posts</h1>
            <input type="text" placeholder="search for post"/>
            <button onClick={newPost}>Add Post</button>
            {posts.map(post => {
                return (
                    <div key={post._id}>
                        <h2>{post.title}</h2>
                        <p>{post.description}</p>
                        <p>{post.price}</p>
                        <p>{post.author.username}</p>
                        <p>{post.location}</p>
                    </div>
                )
            })}
        </div>
    )

}