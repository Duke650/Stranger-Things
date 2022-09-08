
import { Link, Route, Routes } from "react-router-dom"
import Profile from "./Profile"
import Home from "./Home"
import Posts from "./Posts"
import SignUp from "./SignUp";
import AddPost from "./AddPost"



export default function Nav({posts, setPosts, userName, setUserName, password, setPassword, fetchLogin, fetchSignup, token, setToken, handleDelete, setMessage, handleLogout, handleMessageClick, canMessage}) {

    return (
                <header>
                    <h1 className="stranger">Stranger Things</h1>
                    <nav className="nav">
                        <ul>
                            <li><Link to="/" className="nav-link">Home</Link></li>  
                            <li><Link to="/posts" className="nav-link">Posts</Link></li>
                            <li><Link to="/profile" className="nav-link">Profile</Link></li>
                            <button onClick={handleLogout} className="nav-link">Logout</button>
                        </ul>
                    </nav>
                    <div>
                        <Routes>
                            <Route path="/" element={<Home userName={userName} setUserName={setUserName} password={password} setPassword={setPassword} fetchLogin={fetchLogin} setToken={setToken} token={token}/>}></Route>
                            <Route path="/posts" element={<Posts posts={posts} setPosts={setPosts} token={token} handleDelete={handleDelete} setMessage={setMessage} handleMessageClick={handleMessageClick} canMessage={canMessage}/>}></Route>
                            <Route path="/profile" element={<Profile posts={posts} handleDelete={handleDelete}/>}></Route>
                            <Route path="/signup" element={<SignUp userName={userName} setUserName={setUserName} password={password} setPassword={setPassword} fetchSignup={fetchSignup} setToken={setToken}/>}></Route>
                            <Route path="/addpost" element={<AddPost posts={posts} setPosts={setPosts} token={token}/>}></Route>
                        </Routes>
                    </div>
                
                </header>
    )
}