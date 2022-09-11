import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AddPost({ token, setPosts }) {
  const navigate = useNavigate();
  const [inputField, setInputField] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    willDeliver: false
  });

  const handleAddPost = async e => {
    e.preventDefault();
    try {
      const result = await fetch("https://strangers-things.herokuapp.com/api/2206-ftb-pt-web-pt/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            post: {
              title: inputField.title,
              description: inputField.description,
              price: inputField.price,
              location: inputField.location,
              willDeliver: inputField.willDeliver
            },
          }),
        }
      );
      const data = await result.json();
      setPosts(prev => [data.data.post, ...prev])
      navigate("/Posts")
    } catch (err) {
      console.error(err);
    }
  };



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputField((prev) => {
      return {
        ...prev,  
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  return (

    <form>
      <h1 id="createPost">Create Post</h1>
      <ul className="wrapper">
        <li className="form-row">
      <label htmlFor="title">For Sale:</label>
      <input
          id="title"
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
          value={inputField.title}
        />
    </li>
    <li className="form-row">
      <label htmlFor="about">About</label>
      <input
          id="about"
          type="text"
          placeholder="Description"
          name="description"
          onChange={handleChange}
          value={inputField.description}
        />
    </li>
    <li className="form-row">
      <label htmlFor="price">Price</label>
      <input
          id="price"
          type="text"
          placeholder="Price"
          name="price"
          onChange={handleChange}
          value={inputField.price}
        />
    </li>
    <li className="form-row">
      <label htmlFor="location">Location</label>
      <input
          id="location"
          type="text"
          placeholder="Location"
          name="location"
          onChange={handleChange}
          value={inputField.location}
        />
        </li>
        
        <label htmlFor="willDeliver" id="willDeliverLable">Will Deliver</label>
        <input
          type="checkbox"
          id="willDeliver"
          name="willDeliver"
          checked={inputField.willDeliver}
          onChange={handleChange}
        />
        
    
      <li className="form-row">
      <button type="submit" className="btn btn-outline-primary" onClick={handleAddPost}>Create</button>
    </li>
  </ul>
</form>
  );
}
