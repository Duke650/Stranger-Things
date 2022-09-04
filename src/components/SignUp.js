import { useState } from "react";
import Posts from "./Posts";
import { useNavigate } from "react-router-dom";

export default function SignUp({userName, setUserName, password, setPassword}) {

    let isSuccessful
    const handleSignUp = async e => {
        e.preventDefault()
        try {
        const result = await fetch('https://strangers-things.herokuapp.com/api/2206-ftb-pt-web-pt/users/register', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
            username: `${userName}`,
            password: `${password}`
            }
        })
        })
        const data = await result.json()
        console.log(data);
        } catch(err) {
        console.error(err);
        }
        // isSuccessful = result.success
    }

    return (
<div>
    <h1>Sign Up</h1>
    <form>
        <input type="text" placeholder="New Username Here" onChange={e => setUserName(e.target.value)}/>
        <input type="password" placeholder="New Password Here" onChange={e => setPassword(e.target.value)}/>
        <input type="submit" value="Sign Up" onClick={handleSignUp}/>
        {/* {isSuccessful && <Posts />} */}
    </form>
</div>    
    )
}