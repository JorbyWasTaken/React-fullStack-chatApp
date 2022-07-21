import React, {useState} from 'react';
import { FiInfo } from 'react-icons/fi';
import { BiX } from 'react-icons/bi';
import GroupMembers from './GroupMembers';
import MyJoinedRooms from './MyJoinedGroups';
// import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import { TbCrown } from "react-icons/tb";

import GetName from '../../GetName';

const RoomInfoComp = () => {
const { myId } = GetName();
const { leaveJoinedRoom } = MyJoinedRooms();
const { groupMembers, fetchGroupMembers } = GroupMembers();
const [show, setShow] = useState(false);
const InfoBtn = ({ id }) => {
    return(
        <div className='room-info-comp-btn'>
        <button onClick={() => {
            fetchGroupMembers(id)
            setShow(true)
            fetchRoomData(id)
        }}>
        <FiInfo/>
        </button>
        </div>       
    )
};
const [leader, setLeader] = useState();
const [roomData, setRoomData] = useState([]);
const fetchRoomData = async( id ) => {
try{
const res = await fetch(`http://localhost:8080/group/groupdata/${id}`, {
    headers: { token: localStorage.getItem('token') }
});
const parseData = await res.json();
setRoomData(parseData);
setLeader(parseData[0].user_id)
}catch {
}};
const GetInfo = ({ groupName, id }) => {

    return(show ?
         <div className='get-info-outer'>
           <div className='get-info-popup'>
           <button className='close-room-info' onClick={() => {
                setShow(false);
                setRoomData([])
                
               }}> <BiX /> </button>
               <h2>{groupName}</h2>
               {roomData.map(data => (
                   <span key={data.room_id}>
                    <h3> <TbCrown /> <br></br> {myId === data.user_id ? 'you': data.user_name} <br></br> <span>created {data.date} </span> </h3>
                   <span>created {data.date} </span>
                   <div className='blep'>

                   <h4>description</h4>
                   "{data.group_description}"
                   </div>
                   </span>
               ))}
               {/* <hr></hr> */}
               <h4>members({groupMembers.length})</h4>
               <hr></hr>
               <p>
               {groupMembers.length === 0 ? 'no members:(' :''}
           {groupMembers.map(member => (
               <div key={member.user_id}>
                 <p>
                     {member.user_name}
                 </p>
                 </div>
             ))}
         </p>

            <button className='leave-convo' onDoubleClick={() => leaveJoinedRoom(id)}>leave conversation</button> 
           </div>
        </div> 
    : '' );
} 
   
    return{ GetInfo, InfoBtn, leader }

}
export default RoomInfoComp;