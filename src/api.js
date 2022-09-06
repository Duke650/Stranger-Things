



// let navigate = useNavigate();
export const fetchLogin = async (userName, password) => {
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
        return result.data.token;
    })
    .catch(console.error);
}

export const fetchSignup = async (userName, password) => {
    
    try {
    const result = await fetch('https://strangers-things.herokuapp.com/api/2206-ftb-pt-web-pt/users/register', {
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
    })
    
    const data = await result.json()
    
    return data.data.token;

    } catch(err) {
    console.error(err);
    }
}

export const fetchNewPost = async ({token, inputField.title, inputField.description } ) => {
    try {
    const data = await fetch('https://strangers-things.herokuapp.com/api/COHORT-NAME/posts', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            post: {
            title: inputField.title,
            description: inputField.description,
            price: inputField.price,
            location: inputField.location,
            willDeliver: inputField.willDeliver ? "Yes" : "No"
            }
        })
        })
            console.log(data);
        } catch(err) {
        console.error(err);
    }
}
