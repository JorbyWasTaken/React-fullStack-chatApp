import { useState, useEffect } from "react";

const FetchRooms = () => {
const [myGroups, setMyGroups] = useState([]);    
useEffect(() => {
(async() => {
    try {
        const res = await fetch('http://localhost:8080/group/mygroups',{
        headers: { token: localStorage.getItem('token') }
      });
        const myGroups = await res.json();
        setMyGroups(myGroups);
      } catch (err) {
        console.error(err.message);
      }
  })();
}, [])
  return { myGroups }
};

export default FetchRooms;