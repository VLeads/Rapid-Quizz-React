import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { db } from "firebase-config";
import "./auth.css";

import { toast } from "react-toastify";
import { signupService } from "service/authService";
import { useAuth } from "context/auth-context";
import { Loader } from "components";
import { doc, setDoc } from "firebase/firestore";

export const Signup = () => {
  const navigate = useNavigate();
  const { user, setUser, authLoading, setAuthLoading } = useAuth();
  const location = useLocation();
  const from = location?.state?.from.pathname || "/";

  const [inputType, setInputType] = useState("password");
  const [signupFormData, setSignupFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const submitSignupHandler = async (e) => {
    const { firstName, lastName, email, password } = signupFormData;
    e.preventDefault();
    if (signupFormData.password.length < 6) {
      toast.error("Password should be atleast 6 characters long");
    } else {
      try {
        setAuthLoading(true);
        const response = await signupService(email, password);
        if (response) {
          setAuthLoading(false);
          const currentUser = {
            uid: response.user.uid,
            firstName,
            lastName,
            email,
            quizzesAttempted: [],
            totalScore: 0,
          };
          const userRef = doc(db, "users", response.user.uid);

          await setDoc(userRef, currentUser);

          localStorage.setItem("user", JSON.stringify(currentUser));
          setUser(currentUser);
          toast.success(` Welcome ${firstName} `);

          navigate(from, { replace: true });
        }
      } catch (error) {
        setAuthLoading(false);
        setError(error.message);
        toast.error(error.message);
      }
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
        className="card-vertical signup-form theme-color"
        onSubmit={(e) => submitSignupHandler(e)}
      >
        <h3>Signup</h3>

        <div className="input-group-parent">
          <div className="input-group">
            <label>First Name</label>
            <input
              className="input-box"
              maxLength="32"
              type="text"
              name="firstName"
              placeholder="Vishal"
              onChange={(e) =>
                setSignupFormData((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
              value={signupFormData.firstName}
              required
            />
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <input
              className="input-box"
              maxLength="32"
              type="text"
              name="lastName"
              placeholder="Kumar"
              onChange={(e) =>
                setSignupFormData((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
              value={signupFormData.lastName}
              required
            />
          </div>
          <div className="input-group">
            <label>Email address</label>
            <input
              className="input-box"
              maxLength="42"
              type="email"
              name="email"
              placeholder="vishal@mail.com"
              onChange={(e) =>
                setSignupFormData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              value={signupFormData.email}
              required
            />
          </div>

          <div className="input-group">
            <label> Password </label>
            <div className="password-input">
              <input
                className="input-box"
                maxLength="28"
                type={inputType}
                name="password"
                placeholder="******"
                onChange={(e) =>
                  setSignupFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                value={signupFormData.password}
                required
              />
              <div className="password-eye-btn" onClick={togglePassword}>
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
            By continuing, you agree to Rapid Store's Terms of Use and Privacy
            Policy.
          </div>

          <button className="btn btn-primary" type="submit">
            Create New Account
          </button>
          <Link to="/login" className="auth-alternative">
            Already using Rapid Quizz? Log In
          </Link>
        </div>
      </form>
    </main>
  );
};
