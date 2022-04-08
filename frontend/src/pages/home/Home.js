import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"
import { useEffect,useRef,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import io from 'socket.io-client'
import {getConversations} from '../../actions/messageActions'
export default function Home() {
  const dispatch =useDispatch()
  const socket = useRef()
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { userInfo } = useSelector((state) => state.userLogin)


  useEffect(()=> {
    socket.current = io('ws://localhost:3000')
  },[])

 useEffect(()=> {
    socket?.current.emit('addUsers',userInfo._id)
    socket?.current.on('getUsers', users => {
      setOnlineUsers(users)
      console.log(users)
    })
  },[userInfo,socket?.current?.connected]) 
  console.log(onlineUsers)
  useEffect(()=> {
    dispatch(getConversations(userInfo?._id))
  },[])
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed/>
        <Rightbar/>
      </div>
    </>
  );
}
