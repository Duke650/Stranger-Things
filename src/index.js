import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Nav from "./components/Nav";

let App = () => {
  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useState(window.localStorage.getItem("userName") || "");
  const [password, setPassword] = useState(window.localStorage.getItem("password") || "");
  const [token, setToken] = useState(window.localStorage.getItem("token") || "");


  useEffect(() => {
    window.localStorage.setItem("password", password)
  }, [password])

  useEffect(() => {
    window.localStorage.setItem("userName", userName)
  }, [userName])

  useEffect(() => {
    window.localStorage.setItem("token", token)
  }, [token])

  const fetchPosts = async () => {
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

  const handleDelete = async postIdToDelete => {
    try {
        const response = await fetch(`https://strangers-things.herokuapp.com/api/2206-ftb-pt-web-pt/posts/${postIdToDelete}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
        
    })
    const data = await response.json();
    if (data) {
        const newPosts = posts.filter(post => post._id !== postIdToDelete)
        setPosts(newPosts)
    }
    } catch(err) {
        console.error(err);
    }
    
  }


  const handleLogout = () => {
    setPassword("");
    setUserName("");
    setToken("");
    alert("You have successfully logged out")
  }

  return (
    <div>
      <Nav
        handleLogout={handleLogout}
        posts={posts}
        setPosts={setPosts}
        userName={userName}
        setUserName={setUserName}
        password={password}
        setPassword={setPassword}
        token={token}
        setToken={setToken}
        handleDelete={handleDelete}
      />
    </div>
  );
};

let root = createRoot(document.querySelector("#root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
