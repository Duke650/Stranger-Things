
import { Link, Route, Routes } from "react-router-dom"
import Profile from "./Profile"
import Logout from "./Logout"
import Home from "./Home"
import Posts from "./Posts"
import SignUp from "./SignUp";
import AddPost from "./AddPost"


export default function Nav({posts, setPosts, userName, setUserName, password, setPassword}) {

    return (
                <nav className="nav">
                    <h1 className="title">Stranger Things</h1>
                    <Link to="/">Home</Link>
                    <Link to="/posts">Posts</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/logout">Logout</Link>
                    <div>
                        <Routes>
                            <Route path="/" element={<Home userName={userName} setUserName={setUserName} password={password} setPassword={setPassword}/>}></Route>
                            <Route path="/posts" element={<Posts posts={posts} setPosts={setPosts}/>}></Route>
                            <Route path="/profile" element={<Profile />}></Route>
                            <Route path="/logout" element={<Logout />}></Route>
                            <Route path="/signup" element={<SignUp userName={userName} setUserName={setUserName} password={password} setPassword={setPassword}/>}></Route>
                            <Route path="/AddPost" element={<AddPost posts={posts} setPosts={setPosts}/>}></Route>
                        </Routes>
                    </div>
                </nav>
    )
}