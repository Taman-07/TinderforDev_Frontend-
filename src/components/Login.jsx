import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);

  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // =========================================================
  // LOGIN
  // =========================================================

  const handleLogin = async () => {
    try {
      setError("");

      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res.data));

      navigate("/");
    } catch (err) {
      console.log(err);

      setError(
        err?.response?.data?.message ||
          err?.response?.data ||
          "Something went wrong!"
      );
    }
  };

  // =========================================================
  // SIGN UP
  // =========================================================

  const handleSignUp = async () => {
    // -----------------------------------------
    // FIRST NAME VALIDATION
    // -----------------------------------------

    if (firstName.trim().length < 5) {
      setError("First name should be at least 5 characters.");
      return;
    }

    // -----------------------------------------
    // LAST NAME VALIDATION
    // -----------------------------------------

    if (lastName.trim().length < 3) {
      setError("Last name should be at least 3 characters.");
      return;
    }

    // -----------------------------------------
    // EMAIL VALIDATION
    // -----------------------------------------

    if (!emailId.trim()) {
      setError("Email is required.");
      return;
    }

    // -----------------------------------------
    // PASSWORD
    // -----------------------------------------

    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    try {
      setError("");

      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          emailId: emailId.trim(),
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(res.data);

      dispatch(addUser(res.data.data));

      navigate("/profile");
    } catch (err) {
      console.log(err);

      setError(
        err?.response?.data?.message ||
          err?.response?.data ||
          "Something went wrong!"
      );
    }
  };

  // =========================================================
  // SWITCH LOGIN / SIGNUP
  // =========================================================

  const toggleForm = () => {
    setIsLoginForm((value) => !value);
    setError("");
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">

          {/* TITLE */}
          <h4 className="card-title text-2xl font-bold flex justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h4>

          <div>

            {/* FIRST NAME + LAST NAME */}
            {!isLoginForm && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    First Name
                  </legend>

                  <input
                    type="text"
                    value={firstName}
                    className="input"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setError("");
                    }}
                    placeholder="Type here"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    Last Name
                  </legend>

                  <input
                    type="text"
                    value={lastName}
                    className="input"
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setError("");
                    }}
                    placeholder="Type here"
                  />
                </fieldset>
              </>
            )}

            {/* EMAIL */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Email ID
              </legend>

              <input
                type="email"
                value={emailId}
                className="input"
                onChange={(e) => {
                  setEmailId(e.target.value);
                  setError("");
                }}
                placeholder="Type here"
              />
            </fieldset>

            {/* PASSWORD */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Password
              </legend>

              <input
                type="password"
                value={password}
                className="input"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Type here"
              />
            </fieldset>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {error}
            </p>
          )}

          {/* BUTTON */}
          <div className="card-actions justify-center mt-3">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>

          {/* SWITCH */}
          <div className="text-center mt-6">
            <button
              onClick={toggleForm}
              className="text-sm px-4 py-2 rounded-full border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black transition-all duration-300"
            >
              {isLoginForm
                ? "New User? Sign Up"
                : "Existing User? Login"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;