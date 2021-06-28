import React, { useRef, useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import logo from "./img/footer.png";
import { Link, useHistory } from "react-router-dom";
import { GoogleLoginButton, FacebookLoginButton } from "react-social-login-buttons";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login,signupGoogle, signupFacebook } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/dashboard");
    } catch {
      return setError("Failed to login !!");
    }
    setLoading(false);
  }
  async function googleLogin() {
    try {
      setError("");
      setLoading(true);
      await signupGoogle();
      history.push("/dashboard");
    } catch {
      return setError("Failed to login !!");
    }
    setLoading(false);
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-flex justify-content-center">
                  <img
                    src={logo}
                    alt="Logo"
                    style={{
                      width: "700px",
                      height: "400px",
                      marginLeft: "150px",
                      marginTop: "10px",
                    }}
                  />
                </div>
                <div className="col-lg-6">
                  <h1 className="text-center text-success mt-5">Login</h1>
                  <hr />
                  <div className="m-4">
                    <div className="text-center">
                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      )}
                    </div>
                    <form className="user" onSubmit={handleSubmit}>
                      <div className="form-group mb-2">
                        Email
                        <input
                          type="email"
                          className="form-control form-control-user"
                          id="email"
                          placeholder="Enter Email Address..."
                          ref={emailRef}
                        />
                      </div>
                      <div className="form-group mb-2">
                        Password
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="password"
                          placeholder="Password"
                          ref={passwordRef}
                        />
                      </div>

                      <button
                        disabled={loading}
                        href="/dashboard"
                        type="submit"
                        className="btn btn-outline-success btn-block"
                      >
                        Login
                      </button>
                      <GoogleLoginButton style={{marginTop:20, background: "#DB4437", color: "white", textAlign: "center"}}  onClick={() => googleLogin()}/>
                      <FacebookLoginButton style={{marginTop:20, color: "white", textAlign: "center"}} onClick={() => signupFacebook()}/>
                    </form>
                    <hr />
                    <div className="text-center">
                      <Link
                        className="small text-warning"
                        to="/forgot-password"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="text-center">
                      <Link className="small" to="/register">
                        Are you new? Register!
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="text-center mt-5 text-primary">Made by Ali Çelik</p>
      </div>
    </div>
  );
};

export default Login;
