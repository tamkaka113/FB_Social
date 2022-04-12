import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home({ history }) {
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo?.username) {
      history.push("/login");
    }
  }, []);

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
