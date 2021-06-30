import React, { useRef, useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  //const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match !!");
    }

    try {
      setError("");
      //setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/dashboard");
    } catch(e) {
      console.log(e.message)
      return setError(e.message);
    }
    //setLoading(false);
  }

  return (
    <div className="container">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          <div className="text-center ">
            <h1 className="display-1">Register</h1>
          </div>
          <div className="row">
            <div className="col-lg">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Welcome! create your account.</h1>
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                </div>
                <form className="user" onSubmit={handleSubmit}>
                  <div className="row justify-content-center">
                    <div className="col-sm-4 mt-3">
                    Email
                      <input
                        type="email"
                        className="form-control form-control-user"
                        id="Email"
                        placeholder="Email Address"
                        ref={emailRef}
                      />
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-sm-4 mt-3">
                    Password
                      <input
                        type="password"
                        className="form-control form-control-user"
                        id="password"
                        placeholder="Password"
                        ref={passwordRef}
                      />
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-sm-4 mt-3 mb-3">
                    Repeat Password
                      <input
                        type="password"
                        className="form-control form-control-user"
                        id="passwordConfirm"
                        placeholder="Repeat Password"
                        ref={passwordConfirmRef}
                      />
                    </div>
                  </div>
                  <div className="row justify-content-center">
                  <div className="col-sm-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Create Account
                      </button>
                      </div>
                  </div>
                </form>
                <hr />
                <div className="text-center">
                  <a className="small" href="/forgot-password">
                    Forgot Password?
                  </a>
                </div>
                <div className="text-center">
                  <Link className="small" to="/login">
                    Already have an account? Login!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
