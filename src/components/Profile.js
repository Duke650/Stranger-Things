import { useState, useEffect } from "react";

export default function Profile({posts, handleDelete, token, userName}) {
    const filterPosts = posts.filter(post => post.isAuthor)
    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        try {
            const resp = await fetch('https://strangers-things.herokuapp.com/api/2206-ftb-pt-web-pt/users/me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
        },
        })
            const data = await resp.json();
            setMessages(data.data.messages)
            } catch(err) {
            console.error(err);
            }
    }

    useEffect(() => {
       fetchMessages();
    }, [token])

    return (
            <div>
                <h1 className="messagePosts">Posts</h1>
            {filterPosts.map(post => {
                return (
                        <div key={post._id} className="user-posts">
                            <h2>{post.title}</h2>
                            <p><strong>About:</strong> {post.description}</p>
                            <p><strong>Price:</strong> {post.price}</p>
                            <p><strong>Seller:</strong> {post.author.username}</p>
                            <p><strong>Location:</strong>Location: {post.location}</p>
                            <p><strong>Available for delivery:</strong> {post.willDeliver ? "Yes" : "No"}</p>
                            {post.isAuthor &&  <button onClick={() => handleDelete(post._id)} className="btn btn-outline-danger">DELETE</button>}
                        </div>
                )
            }) }
            <h1 className="messagePosts">Messages</h1>
            {messages.map(message => {
                return (
                    <div key={message._id}>
                    {userName !== message.fromUser.username && 
                    <div key={message._id} className="user-posts">
                        <h3>From: {message.fromUser.username}</h3>
                        <p>Message: {message.content}</p>
                    </div> 
            }
                </div>
                )
            })}
            </div>
    )}