import { Link, Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Home from "./Home";
import Posts from "./Posts";
import SignUp from "./SignUp";
import AddPost from "./AddPost";

export default function Nav({
  posts,
  setPosts,
  userName,
  setUserName,
  password,
  setPassword,
  fetchLogin,
  fetchSignup,
  token,
  setToken,
  handleDelete,
  setMessage,
  handleLogout,
  handleMessageClick,
  error,
  setError,
}) {
  return (
    <header>
      <nav
        className="navbar navbar-expand-xl navbar-light navbar sticky-top"
        id="nav"
      >
        <h1 className="stranger">Stranger Things</h1>

        <div className="container-fluid" id="nav-div">
          <Link to="/" className="navbar-brand nav-links">
            Home
          </Link>
          <Link to="/posts" className="navbar-brand nav-links">
            Posts
          </Link>
          <Link to="/profile" className="navbar-brand nav-links">
            Profile
          </Link>
          {token && (
            <Link
              to="/"
              onClick={handleLogout}
              className="btn btn-outline-danger logoutBtn"
              id="nav-logout"
            >
              Logout
            </Link>
          )}
        </div>
      </nav>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                userName={userName}
                setUserName={setUserName}
                password={password}
                setPassword={setPassword}
                fetchLogin={fetchLogin}
                setToken={setToken}
                token={token}
                error={error}
                setError={setError}
              />
            }
          ></Route>
          <Route
            path="/posts"
            element={
              <Posts
                posts={posts}
                setPosts={setPosts}
                token={token}
                handleDelete={handleDelete}
                setMessage={setMessage}
                handleMessageClick={handleMessageClick}
              />
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <Profile
                posts={posts}
                handleDelete={handleDelete}
                token={token}
                userName={userName}
              />
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <SignUp
                userName={userName}
                setUserName={setUserName}
                password={password}
                setPassword={setPassword}
                fetchSignup={fetchSignup}
                setToken={setToken}
                error={error}
                setError={setError}
              />
            }
          ></Route>
          <Route
            path="/addpost"
            element={
              <AddPost posts={posts} setPosts={setPosts} token={token} />
            }
          ></Route>
        </Routes>
      </div>
    </header>
  );
}
