export default function Profile({posts, handleDelete}) {
    const filterPosts = posts.filter(post => post.isAuthor)

    return (
            filterPosts.map(post => {
                return (
                <div key={post._id}>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <p>{post.price}</p>
                    <p>{post.author.username}</p>
                    <p>{post.location}</p>
                    <p>{post.willDeliver ? "Yes" : "No"}</p>
                    {post.isAuthor && <button onClick={handleDelete}>DELETE</button>}
                    {/* {post.isAuthor && <button>Edit</button>} */}
                </div>  
                )
            }) 
    )
}