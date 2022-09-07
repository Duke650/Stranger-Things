import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Posts({ posts, setPosts, token, handleDelete }) {
  let navigate = useNavigate();
  
  const [searchValue, setSearchValue] = useState("");

  const matches = post => {
    const textToCheck = post.title + post.description + post.location + post.author.username;
    return textToCheck.includes(searchValue.toLowerCase())
  }

  const filterPosts = posts.filter(post => matches(post))


  const fetchPosts = async (e) => {
    try {
      const result = await fetch(
        "https://strangers-things.herokuapp.com/api/2206-ftb-pt-web-pt/posts",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await result.json();
      setPosts(data.data.posts);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [token]);

  return (
    <div className="posts">
      <h1>Posts</h1>
      <input
        type="text"
        placeholder="search for post"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Link to="/addPost">Add Post</Link>
      {posts.map((post) => {
        return (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>{post.price}</p>
            <p>{post.author.username}</p>
            <p>{post.location}</p>
            <p>{post.willDeliver ? "Yes" : "No"}</p>
            {post.isAuthor && (
              <button onClick={() => handleDelete(post._id)}>DELETE</button>
            )}
            {post.isAuthor && <button>Edit</button>}
          </div>
        );
      })}
    </div>
  );
}
