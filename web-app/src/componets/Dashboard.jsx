import React from "react";
import { Link,  } from "react-router-dom";
import styles from '../styles/dashboard.css'
// import {FaBars, FaHome, FaEnvelope, FaMale, FaUser, FaPen, FaRegUser} from 'react-icons/fa'
import { BiMessage, BiPencil, BiHomeAlt, BiUser, BiMenu  } from "react-icons/bi";
import SideNav from "./SideNav";
import GetName from "../GetName";

const Dashboard = () => {
const { name } = GetName();

const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authenticated");
    window.location.reload();
};

  const auth = localStorage.getItem('authenticated');
  const token = localStorage.getItem('token');
if(auth === 'yes' && token){
  return (
    <div>
      <div className="nav-bar-container">
        <a><BiMenu /> </a>
        <Link to='/home'> <BiHomeAlt /></Link>
        {/* <Link to='/about'> about</Link> */}
        <Link to='/profile'> <BiUser /> </Link>
        {/* <Link to='/contact'> contactUs</Link> */}
        <Link to='/chat'> <BiMessage/> </Link>
        <Link to='/todos'> <BiPencil /> </Link>

        <button onClick={() => logout()} className="name">{name} </button>
      </div>
      <SideNav />
  </div>
  );
}else{
  return null;
}};
export default Dashboard;