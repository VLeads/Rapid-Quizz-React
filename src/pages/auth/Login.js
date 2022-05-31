import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./auth.css";
import { toast } from "react-toastify";
import { useAuth } from "context/auth-context";
import { loginService } from "service/authService";
import { Loader } from "components";
import { db } from "firebase-config";
import { doc, getDoc } from "firebase/firestore";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from.pathname || "/";

  const { authLoading, setAuthLoading, user, setUser } = useAuth();

  const [error, setError] = useState("");
  const [inputType, setInputType] = useState("password");
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const testLogin = { email: "vishal@mail.com", password: "123456" };

  const inputChange = (e) => {
    const value = e.target.value;
    setLoginFormData((loginFormData) => ({
      ...loginFormData,
      [e.target.name]: value,
    }));
  };

  const submitLoginHandler = (e) => {
    e.preventDefault();
    handleLogin(loginFormData.email, loginFormData.password);
  };

  const handleLogin = async (email, password) => {
    try {
      setAuthLoading(true);
      const response = await loginService(email, password);
      if (response) {
        const userRef = doc(db, "users", response.user.uid);

        const getUserData = await getDoc(userRef); //to read data
        console.log("getData", getUserData.data());
        localStorage.setItem("user", JSON.stringify(getUserData.data()));

        setUser(getUserData.data());
        setAuthLoading(false);

        toast.success(` Welcome back ${getUserData.data()?.firstName}`);
        navigate(from, { replace: true });
      }
    } catch (error) {
      setAuthLoading(false);
      setError(error.message);
      toast.error(error.message);
    }
  };

  const togglePassword = () => {
    setInputType((inputType) =>
      inputType === "password" ? "text" : "password"
    );
  };

  return authLoading ? (
    <Loader />
  ) : (
    <main className="auth-container">
      <form
        className="card-vertical signup-form"
        onSubmit={(e) => submitLoginHandler(e)}
      >
        <h3>Login</h3>

        <div className="input-group-parent">
          <div className="input-group">
            <label>Email address</label>
            <input
              className="input-box"
              type="email"
              placeholder="vishal@mail.com"
              maxLength="42"
              name="email"
              onChange={inputChange}
              value={loginFormData.email}
              required
            />
          </div>

          <div className="input-group ">
            <label> Password </label>
            <div className="password-input">
              <input
                className="input-box"
                type={inputType}
                placeholder="******"
                name="password"
                maxLength="28"
                onChange={inputChange}
                value={loginFormData.password}
                required
              />
              <div
                type=""
                className="password-eye-btn"
                onClick={() => {
                  togglePassword();
                }}
              >
                <i
                  className={`fa fa-eye${
                    inputType === "password" ? "-slash" : ""
                  }`}
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </div>

          <div className="select-box">
            <label htmlFor="accept">
              <input type="checkbox" name="accept" />
              Remember me
            </label>
            <Link className="forgot-pass" to="#">
              Forgot your Password?
            </Link>
          </div>

          <button className="btn btn-primary" type="submit">
            Login
          </button>
          <button
            className="btn btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              setLoginFormData(testLogin);
            }}
          >
            Use test Credentials
          </button>
          <Link to="/signup" className="auth-alternative">
            New on Rapid Quizz? Sign Up
          </Link>
        </div>
      </form>
    </main>
  );
};
