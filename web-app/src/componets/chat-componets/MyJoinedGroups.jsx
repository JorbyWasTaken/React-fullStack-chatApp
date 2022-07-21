import React, {useState, useEffect} from 'react';
import styles from '../../styles/joined-room.css'
import GroupMembers from './GroupMembers';

const MyJoinedRooms = () => {
const { fetchGroupMembers, groupMembers } = GroupMembers();
const [JoinedRooms, setMyJoinedRooms] = useState([]);
useEffect(() => {
(async() => {
    try{
        const res = await fetch(`http://localhost:8080/group/myjoinedrooms`,{
        headers: { token: localStorage.token }
        });
        const parseRes = await res.json();            
        setMyJoinedRooms(parseRes);
    }catch(err){
        console.log(err.message)
    }
})();
}, [])
const leaveJoinedRoom = async(id) => {
    try {
        await fetch(`http://localhost:8080/group/myjoinedrooms/${id}`, {
            method: 'DELETE',
            headers: { token: localStorage.token }
        });
        setMyJoinedRooms(JoinedRooms);
        window.location.reload();
    }
    catch(err) {
        console.log(err.message);
}};
const MyRoomMapComp = ({setOpenSearch,
    setInRoom,
    setRoom,
    joinRoom,
    userConnected,
    fetchChats,
    setRoomName,
    fetchGroupMembers,
    }) => {
    return( 
    <div className='joinedroom-container'>
    {JoinedRooms.map(room => (
        <div key={room.group_id} onClick={() => {
            setOpenSearch(false);
            setInRoom(true);
            setRoom(room.group_id);
            joinRoom(room.group_id);
            userConnected(room.group_id);
            fetchChats(room.group_id);
            setRoomName(room.group_name);
            fetchGroupMembers(room.group_id);
        }}>
       <h4> leader {room.user_name} </h4>
        <p> group:{room.group_name}  
        {/* <button onClick={() => leaveJoinedRoom(room.group_id)}>leave</button> */}
        </p>
        </div>
    ))}
    </div>
)};
    return { MyRoomMapComp, JoinedRooms, leaveJoinedRoom, setMyJoinedRooms }
};

export default MyJoinedRooms;