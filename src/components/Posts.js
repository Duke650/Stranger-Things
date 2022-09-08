import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Posts({ posts, setPosts, token, handleDelete, handleMessageClick, canMessage }) {
  let navigate = useNavigate();
  
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
      <h1>Listings</h1>
      <input
        type="text"
        placeholder="search for post"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
      <Link to="/addPost">Add Post</Link>
      {filteredPosts.map((post) => {
        console.log(post);
        return (
          <div key={post._id}>
            <h2>For Sale: {post.title}</h2>
            <p>About: {post.description}</p>
            <p>Price: {post.price}</p>
            <p>Seller: {post.author.username}</p>
            <p>Location: {post.location}</p>
            <p>Available for delivery: {post.willDeliver ? "Yes" : "No"}</p>
            {post.isAuthor &&  <button onClick={() => handleDelete(post._id)}>DELETE</button>}
            {!post.isAuthor && token && <button onClick={handleMessageClick}>Message User</button>}
            {canMessage && <form>
              <input type="text" />
              <input type="submit" />
              </form>}
          </div>
        );
      })}
    </div>
  );
}

