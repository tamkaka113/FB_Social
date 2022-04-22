import "./register.css";
import { useState, useEffect } from "react";
import { register } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../actions/userActions";
export default function Register({ history }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo, success, error } = useSelector(
    (state) => state.userRegister
  );

  useEffect(() => {
    if (success) {
      alert("You have successfully register your account !");
      history.push("/login");
    }
  }, [success]);
  const handleRegister = () => {
    dispatch(register(username, email, password));
  };
  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">FB Social</h3>
          <span className="registerDesc">
            Connect with friends and the world around you.
          </span>
        </div>
        <div className="registerRight">
          <div className="registerBox">
            <input
              placeholder="Username"
              className="registerInput"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Email"
              className="registerInput"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="registerInput"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <p
                style={{ color: "red", fontSize: "16px", textAlign: "center" }}
              >
                {error}
              </p>
            )}
            <button className="registerButton" onClick={() => handleRegister()}>
              Sign Up
            </button>
            <button
              onClick={() => history.push("/login")}
              className="loginButton"
            >
              Log into Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
