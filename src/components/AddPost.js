import { useState } from "react";

export default function AddPost({posts, setPosts}) {
    
    const [inputField, setInputField] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        willDeliver: false
    })

    const handleAddPost = e => {
        fetch('https://strangers-things.herokuapp.com/api/COHORT-NAME/posts', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer TOKEN_STRING_HERE'
            },
            body: JSON.stringify({
                post: {
                title: inputField.title,
                description: inputField.description,
                price: inputField.price,
                willDeliver:inputField.willDeliver
                }
            })
            }).then(response => response.json())
            .then(result => {
                console.log(result);
            })
            .catch(console.error);
    }

    const handleChange = e => {
        const {name, value, type, checked} = event.target
        setInputField(prev => {
            return {
                ...prev,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    return (
        <div>
            <h1>Add New Post</h1>
            <form action="">
                <input type="text" placeholder="Title" name="title" onChange={handleChange} value={inputField.title}/>
                <input type="text" placeholder="Description" name="description" onChange={handleChange} value={inputField.description}/>
                <input type="text" placeholder="Price" name="price" onChange={handleChange} value={inputField.price}/>
                <input type="text" placeholder="Location"name="location" onChange={handleChange} value={inputField.location}/>
                <label htmlFor="deliver">Willing to deliver</label>
                <input type="checkbox" id="deliver" name="willDeliver" checked={inputField.willDeliver} onChange={handleChange}/>
                <input type="submit" value="Create Post" onClick={handleAddPost}/>
            </form>
        </div>
    )
}