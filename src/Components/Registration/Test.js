// SignWithGoogle.js
import React from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
} from "@react-oauth/google";
import axios from "axios";

const clientId =
  "1080949125109-us11dj496acp1pgm9poqdmvmsi8p0aq6.apps.googleusercontent.com";

function SignWithGoogle() {
  const onLoginSuccess = async (response) => {
    console.log("Login Success:", response);
    try {
      const result = await axios.post(
        "https://medicalapi.runasp.net/Api/Auth",
        {
          token: response.credential,
        }
      );
      console.log("Server response:", result.data);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const onLoginFailure = (response) => {
    console.error("Login Failed:", response);
  };

  const handleLogout = () => {
    googleLogout();
    console.log("Logout Successful");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <header className="App-header">
          <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginFailure} />
          <button onClick={handleLogout}>Logout</button>
        </header>
      </div>
    </GoogleOAuthProvider>
  );
}

export default SignWithGoogle;
