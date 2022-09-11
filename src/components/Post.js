import { useState } from "react";

const Post = ({ post, handleDelete, token, setPosts }) => {
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [message, setMessage] = useState("");
  const [editTitle, setEditTitle] = useState(post.title);
  const [editDescription, setEditDescription] = useState(post.description);
  const [editPrice, setEditPrice] = useState(post.price);
  const [editLocation, setEditLocation] = useState(post.location);
  const [editWillDeliver, setEditWillDeliver] = useState(post.willDeliver);
  const [editError, setEditError] = useState("");
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
              content: message,
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

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(
        `http://strangers-things.herokuapp.com/api/2206-ftb-pt-web-pt/posts/${post._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            post: {
              title: editTitle,
              description: editDescription,
              price: editPrice,
              location: editLocation,
              willDeliver: editWillDeliver,
            },
          }),
        }
      );
      const data = await resp.json();

      if (data.error) {
        throw data.error.message;
      }
      setShowEditForm(false);
      const updatedPost = data.data.post;
      setPosts((prev) =>
        prev.map((p) => {
          if (post._id === p._id) {
            return updatedPost;
          }
          return p;
        })
      );
    } catch (err) {
      setEditError(err);
    }
  };

  const editPostForm = () => {
    return (
      <form>
        <h1 id="createPost">Edit Post</h1>
        <ul className="wrapper">
          <li className="form-row">
            <label htmlFor="title">For Sale:</label>
            <input
              id="title"
              type="text"
              placeholder="Title"
              name="title"
              onChange={(e) => setEditTitle(e.target.value)}
              value={editTitle}
            />
          </li>
          <li className="form-row">
            <label htmlFor="about">About</label>
            <input
              id="about"
              type="text"
              placeholder="Description"
              name="description"
              onChange={(e) => setEditDescription(e.target.value)}
              value={editDescription}
            />
          </li>
          <li className="form-row">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="text"
              placeholder="Price"
              name="price"
              onChange={(e) => setEditPrice(e.target.value)}
              value={editPrice}
            />
          </li>
          <li className="form-row">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              placeholder="Location"
              name="location"
              onChange={(e) => setEditLocation(e.target.value)}
              value={editLocation}
            />
          </li>

          <label htmlFor="willDeliver" id="willDeliverLable">
            Will Deliver
          </label>
          <input
            type="checkbox"
            id="willDeliver"
            name="willDeliver"
            onChange={(e) => setEditWillDeliver(!editWillDeliver)}
            checked={editWillDeliver}
          />

          <li className="form-row">
            {editError && <p>{editError}</p>}
            <button
              type="submit"
              className="btn btn-outline-primary"
              onClick={handleSubmitEdit}
            >
              update
            </button>
          </li>
        </ul>
      </form>
    );
  };

  return (
    <div key={post._id} className="user-posts">
      {showEditForm && editPostForm()}
      <h2 id="postTitle">{post.title}</h2>
      <p>
        <strong>About:</strong> {post.description}
      </p>
      <p>
        <strong>Price:</strong> ${post.price}
      </p>
      <p>
        <strong>Seller:</strong> {post.author.username}
      </p>
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
        >
          Message User
        </button>
      )}
      {showMessageForm && (
        <form>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control messageInput"
              id="floatingInput"
              placeholder="Message"
              onChange={(e) => setMessage(e.target.value)}
            />
            <label htmlFor="floatingInput">Message</label>
          </div>
          <input
            type="submit"
            className="btn btn-outline-primary"
            onClick={handleMessageSubmit}
            value="Edit"
          />
        </form>
      )}
      {post.isAuthor && token && (
        <button onClick={() => setShowEditForm(true)} className="btn btn-outline-primary">Edit Post</button>
      )}
    </div>
  );
};

export default Post;
