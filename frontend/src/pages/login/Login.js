import "./login.css";
import  {useState,useEffect} from 'react'
import {login} from '../../actions/userActions'
import {useDispatch,useSelector} from 'react-redux'
export default function Login({history}) {
  const dispatch =useDispatch()
  const [email, setEmail] =useState('')
  const [password, setPassword] =useState('')

  const {userInfo} = useSelector(state => state.userLogin)



 useEffect(()=> {

  if(userInfo?.token) {
    history.push('/')
  }
   
 },[history,userInfo?.token])
const handleLogin =() => {
dispatch(login(email,password))
}
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">FB Social</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="Email" className="loginInput" onChange ={(e) => setEmail(e.target.value)}/>
            <input type='password' placeholder="Password" className="loginInput" onChange ={(e) => setPassword(e.target.value)}/>
            <button className="loginButton" onClick={handleLogin}>Log In</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
