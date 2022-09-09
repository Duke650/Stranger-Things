import { useState } from "react";

const Post = ({ post, handleDelete, token }) => {
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [message, setMessage] = useState("")


  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://strangers-things.herokuapp.com/api/2206-ftb-pt-web-pt/posts/${post._id}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: {
              content: message
            },
          }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div key={post._id} className="user-posts">
      <h2 id="postTitle">{post.title}</h2>
      <p>
        <strong>About:</strong> {post.description}
      </p>
      <p>
        <strong>Price:</strong> ${post.price}
      </p>
      <p><strong>Seller:</strong> {post.author.username}</p>
      <p>
        <strong>Location:</strong> {post.location}
      </p>
      <p>
        <strong>Available for delivery: </strong>
        {post.willDeliver ? "Yes" : "No"}
      </p>
      {post.isAuthor && (
        <button
          onClick={() => handleDelete(post._id)}
          className="btn btn-outline-danger"
        >
          DELETE
        </button>
      )}
      {!post.isAuthor && token && (
        <button
          onClick={() => {
            setShowMessageForm(!showMessageForm);
          }}
          id="message-user"
          className="btn btn-outline-secondary"
        >Message User</button>
      )}
      {showMessageForm && (
        <form>
            <div className="form-floating mb-3">
                <input type="text" className="form-control messageInput" id="floatingInput" placeholder="Message" onChange={(e) => setMessage(e.target.value)}/>
                <label htmlFor="floatingInput">Message</label>
            </div>
          <input type="submit" className="btn btn-outline-primary" onClick={handleMessageSubmit} value="send" />
        </form>
      )}
    </div>
  );
};

export default Post;
