import { Link, useNavigate } from "react-router-dom";
export default function Home({userName, setUserName, password, setPassword, setToken, token}) {
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://strangers-things.herokuapp.com/api/2206-ftb-pt-web-pt/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              username: userName,
              password: password,
            },
          }),
        }
      );
      const data = await response.json();

      if (!response.ok) { alert (data.error.message)} else { alert ("You have successfully logged in")}

      setToken(data.data.token);
      navigate("./Posts");
      
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="login-form">
      <h1 className="login">Log In</h1>
      <form className="login-form">
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingInput" placeholder="Username" onChange={(e) => setUserName(e.target.value)}/>
        <label htmlFor="floatingInput">UserName</label>
      </div>
      <div className="form-floating">
        <input type="password" className="form-control" id="floatingPassword" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
        <label htmlFor="floatingPassword">Password</label>
      </div>
        <input type="submit" value="Log in" onClick={handleLogIn} id="login-form-btn" className="btn btn-outline-primary" />
        
      </form>
      <Link to="/signup" className="signup">Dont have an account? Sign up here!</Link> 
    </div>
  );
}
