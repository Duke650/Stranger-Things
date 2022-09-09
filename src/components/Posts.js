import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Post from "./Post";

export default function Posts({ posts, setPosts, token, handleDelete, handleMessageClick, canMessage, setMessage, message }) {
  
  const [searchValue, setSearchValue] = useState("");
  
     const matches = post => {
        const textToCheck = (post.title + post.description + post.location + post.author.username + post.price).toLowerCase()
        return textToCheck.includes(searchValue.toLowerCase());
  }

    const filteredPosts = posts.filter(post => matches(post))


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
      <h1 id="listings">Listings</h1>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingInput" placeholder="Search Posts" value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
        <label htmlFor="floatingInput">Search Posts</label>
      </div>
      <Link to="/addPost" className="btn btn-outline-primary addpost-btn">Add Post</Link>
      {filteredPosts.map((post) => {
        return (
          <Post key={post._id} handleDelete={handleDelete} post={post} token={token} handleMessageClick={handleMessageClick} />
        );
      })}
    </div>
  );
}

