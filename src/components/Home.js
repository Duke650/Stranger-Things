import { Link, useNavigate } from "react-router-dom";
import Posts from "./Posts";
export default function Home({userName, setUserName, password, setPassword, setToken, token,}) {
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

      console.log(data);
      setToken(data.data.token);
      navigate("./Posts");
      alert("You have successfully logged in!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Log In</h1>
      <form>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Log in" onClick={handleLogIn} />
      </form>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}
