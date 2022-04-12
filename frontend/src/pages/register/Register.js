import "./register.css";
import { useState, useEffect } from "react";
import { register } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
export default function Register({ history }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo, error } = useSelector((state) => state.userRegister);

  useEffect(() => {
    if (userInfo?.username) {
      history.push("/");
    }
  }, [history, userInfo?.token]);
  const handleRegister = () => {
    dispatch(register(username, email, password));
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input
              placeholder="Username"
              className="loginInput"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Email"
              className="loginInput"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <p
                style={{ color: "red", fontSize: "16px", textAlign: "center" }}
              >
                {error}
              </p>
            )}
            <button className="loginButton" onClick={handleRegister}>
              Sign Up
            </button>
            <button className="loginRegisterButton">Log into Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}
