import { Link, useNavigate} from "react-router-dom"


export default function Home({userName, setUserName, password, setPassword}) { 
    // let navigate = useNavigate();
    const handleLogIn = () => {
    fetch('https://strangers-things.herokuapp.com/api/2206-ftb-pt-web-pt/users/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
            username: userName,
            password: password
            }
        })
        }).then(response => response.json())
        .then(result => {
            console.log(result);
            // navigate("/Posts")
        })
        .catch(console.error);
    }
    
    return (
        <div>
            <h1>Log In</h1>
            <form>
                <input type="text" placeholder="Username" onChange={e => setUserName(e.target.value)}/>
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                <input type="submit" value="Log in" onClick={handleLogIn}/>
            </form>
            <Link to="/signup">Sign Up</Link>
        </div>
    )
}