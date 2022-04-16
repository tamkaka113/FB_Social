import "./login.css";
import { useState, useEffect } from "react";
import { login, getUserDetails } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
export default function Login({ history }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userInfo, error } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo?.username) {
      dispatch(getUserDetails(userInfo?._id));
      history.push("/");
    }
  }, [history, userInfo?.username]);
  const handleLogin = () => {
    dispatch(login(email, password));
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">FB Social</h3>
          <span className="loginDesc">
            Connect with friends and all over the world.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
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
            <button className="loginBtn" onClick={handleLogin}>
              Log In
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button
              onClick={() => !userInfo && history.push("/register")}
              className="loginRegisterButton"
            >
              Create a New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
