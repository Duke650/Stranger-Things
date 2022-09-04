import { useEffect } from "react";


export default function Posts({posts, setPosts}) {
    console.log(posts);
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

    return (
        <div className="posts">
            <h1>Posts</h1>
            <input type="text" placeholder="search for post"/>
            <button>Add Post</button>
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