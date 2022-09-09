import { useNavigate } from "react-router-dom";

export default function SignUp({userName, setUserName, password, setPassword,}) {
  let navigate = useNavigate();
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(
        "https://strangers-things.herokuapp.com/api/2206-ftb-pt-web-pt/users/register",
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
      const data = await result.json();
      navigate("/Posts");
      alert("Your account has been successfully made");
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="signUp">
      <h1 className="newAccount">Create New Account</h1>
      <form className="login-form">
        <div className="form-floating mb-3">
          <input type="text" className="form-control signUpInput" id="floatingInput" placeholder="New Username" onChange={(e) => setUserName(e.target.value)}/>
          <label htmlFor="floatingInput">New Username</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" className="form-control signUpInput" id="floatingInput" placeholder="New Password" onChange={(e) => setPassword(e.target.value)}/>
          <label htmlFor="floatingInput">New Password</label>
        </div>
        <input type="submit" value="Sign Up" className="btn btn-outline-primary" onClick={handleSignUp} />
      </form>
    </div>
  );
}
