
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import apiRequest from "../../lib/apiRequest";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Google Login Success Handler
  const handleGoogleLoginSuccess = async (response) => {
    try {
      const token = response.credential;
      // Send the token to your server to validate and create/register the user
      await apiRequest.post("/auth/google-login", { token });
      navigate("/");
    } catch (err) {
      setError("Google login failed.");
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="registerPage">
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <h1>Create an Account</h1>
            <input name="username" type="text" placeholder="Username" />
            <input name="email" type="text" placeholder="Email" />
            <input name="password" type="password" placeholder="Password" />
            <button disabled={isLoading}>Register</button>
            {error && <span>{error}</span>}
            <Link to="/login">Do you have an account?</Link>
          </form>
          <div className="or">OR</div>
          {/* Google Login Button */}
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => setError("Google login failed.")}
          />
        </div>
        <div className="imgContainer">
          <img src="/bg (2).png" alt="" />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Register;
