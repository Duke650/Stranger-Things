import { useState } from "react"
import {createRoot} from "react-dom/client"
import { BrowserRouter} from "react-router-dom"
import Nav from "./components/Nav"
import Posts from "./components/Posts"
import Profile from "./components/Profile"
import Logout from "./components/Logout"
import Home from "./components/Home"


let App = () => {

    const [posts, setPosts] = useState([]);
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div>
            <Nav 
            posts={posts} 
            setPosts={setPosts} 
            userName={userName} 
            setUserName={setUserName} 
            password={password} 
            setPassword={setPassword}
            />
        </div>
    )
}

let root = createRoot(document.querySelector("#root"))
root.render(<BrowserRouter><App /></BrowserRouter>   )