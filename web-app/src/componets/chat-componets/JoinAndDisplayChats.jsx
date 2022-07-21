import { useState } from "react";

const joinAndDisplayChats = () => {
const [chats, setChats] = useState([]);
const fetchChats = async(id) => {
    const res = await fetch(`http://localhost:8080/group/allgroupdata/${id}`,{
    headers: { token: localStorage.token }
});
    const roomData = await res.json();
    setChats(roomData);
};
return{chats, fetchChats, setChats};
};
export default joinAndDisplayChats;