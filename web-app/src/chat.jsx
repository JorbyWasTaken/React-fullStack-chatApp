import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import styles from './styles/chat.css'
import { FaSearch, FaTimes} from 'react-icons/fa' 
import { BiArrowBack, BiBrush, BiCrown } from "react-icons/bi";
import { IoSend }from 'react-icons/io5';
import GetName from './GetName';
import joinAndDisplayChats from './componets/chat-componets/JoinAndDisplayChats';
import FetchRooms from './componets/chat-componets/FetchMyRooms';
import MyJoinedRooms from './componets/chat-componets/MyJoinedGroups';
import GroupMembers from './componets/chat-componets/GroupMembers';
import memberDisplayer from './componets/chat-componets/GroupMembersMapped';
import RoomInfoComp from './componets/chat-componets/RoomInfo';
import Join from './componets/chat-componets/Join';

// import SearchedGroup from './componets/group-componets/SearchedGroups';
const socket = io.connect('http://localhost:8000')
socket.on('connect', () => console.log('coomected'))

//MAIN FUNCTION AND STATE
const Sock = () =>{

const [roomName, setRoomName] = useState('');
const [room, setRoom] = useState('');
const [group_messages, setMessage] = useState([]);
const [messageReceived, setMessageReceived] = useState([]);
// const [currentUserAmount, setUserAmount] = useState([]);
const [inRoom, setInRoom] = useState(false);

const { chats, fetchChats, setChats } = joinAndDisplayChats();
const { name, myId } = GetName();
const { myGroups } = FetchRooms();
const { MyRoomMapComp, JoinedRooms } = MyJoinedRooms();
const { fetchGroupMembers, groupMembers } = GroupMembers();
const { GetInfo, InfoBtn, leader } = RoomInfoComp();
const { join } = Join();
// const  { searchedGroups, subSearch } = SearchedGroup();

//ROOM AND SOCKET FUNCTIONS
const joinRoom = (room) => {
    if (room !== ''){
       setMessageReceived([]);
       socket.emit('join_room', room);
    }
};

//USER CONNECTED BROADCAST
const userConnected = (room) => {
    socket.emit('user_connected', {name, room});
}
//SEND MESSAGES TO SERVER AND SOCKET SERVER\
const dateObj = new Date;

let datetime = 
`${dateObj.getMonth()}/${dateObj.getDate()}/${dateObj.getFullYear()} 
 ${dateObj.getHours() - 12}:${dateObj.getMinutes()}`;
const sendMessage = async(e) =>{
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", localStorage.getItem("token"));

  const messageData = {
    room: room,
    name: name,
    message: group_messages,
    id: myId,
    time: datetime,
};

socket.emit('send_message',  messageData);
setMessage('');
    //const body = {group_messages, datetime};
    // await fetch(`http://localhost:8080/group/groupmessages/${room}`,{
    //     method: "POST",
    //     headers: myHeaders,
    //     body: JSON.stringify(body)
    // })
};    
useEffect(() => {
    socket.off('receive_message').on("receive_message", (data) => {
    setMessageReceived((list) => [...list, data]);
    });
    
},[]);


//SEARCH FOR GLOBAL GROUPS FUNCTION
const [groupSearch, setGroupSearch] = useState();
const [searchedGroups, setSearchedGroups] = useState([]);
const subSearch = async (e) => {
e.preventDefault();
try{
    const res = await fetch(`http://localhost:8080/group/search/?groupname=${groupSearch}`)
    const parseData = await res.json();
    setSearchedGroups(parseData);
}catch(err){
    console.log(err)
    }
}

const [openSearch, setOpenSearch] = useState(false);

//LEAVE
const leave = () => {
    setOpenSearch(false)
    setInRoom(null);
    setRoom(null);
    socket.emit('leave', {room, name})
    fetchChats(null)
    setRoomName(null)
    setChats([])
}
return(
    <div>  
{openSearch ? 
<div className='search-page'>
<form className='search-form' onSubmit={subSearch}>
    <input required placeholder='search gloabl groups' onChange={e => setGroupSearch(e.target.value)} className='group-search' type='text'></input>
</form>
<button onClick={() =>setOpenSearch(false)} className='close-btn'> <FaTimes /> </button>

<div className='outer-outer-container'>{
    searchedGroups.map(group => (
       <div className='outer-container'> 
        <div className='searched-container'> 
            <header>{group.group_name} </header>
            <hr className='searched-hr'></hr>
            <p>{group.group_description}</p>
            <button onClick={() => {
                join(group.group_id);
                // setOpenSearch(false)
                // setInRoom(true);
                // setRoom(group.group_id);
                // joinRoom(group.group_id);
                // userConnected(group.group_id);
                // fetchChats(group.group_id)
                // setRoomName(group.group_name)
            }}>join</button>
            <br></br>
        </div>
    </div>))}
</div> 
</div> : ''}

<div className='search-item-container'>
{inRoom ? '' : <>
 <div className='room-wrapper'>
         {/* <header className='created-rooms-header' >MY ROOMS <button className='add-room-btn'> add room </button> </header>  */}
<p className='created-rooms-container'>{
    myGroups.map(group => (
        <span key={group.group_id}>
    <button className='created-room-btns'>{group.group_name}<hr></hr>  
    {/* <br></br> */}
    <button onClick={() => {
                setOpenSearch(false)
                 setInRoom(true);
                 setRoom(group.group_id);
                 joinRoom(group.group_id);
                 userConnected(group.group_id);
                 fetchChats(group.group_id)
                 setRoomName(group.group_name)
                 fetchGroupMembers(group.group_id)
            }} className='my-rooms-join-btn'><span className='join-btn-span'>quick join</span></button> 
    </button> 
    </span>
))}</p>

</div> 

    <div className='search-btn-container'>
        <button className='search-btn' onClick={() => setOpenSearch(true)}><FaSearch /></button> 
        <button className='other-btn'> <BiArrowBack /> </button>
    </div> 
    </>}

</div>
<br></br>
    <br></br>
<br></br>

{/* <GroupMembersMapped/> */}
{inRoom ? '' :
<div>
<h2 className='joined-room-h2'>{JoinedRooms.length === 0 ? 'no joined groups': 'joined groups'} <BiBrush /> </h2>
<MyRoomMapComp  setOpenSearch={setOpenSearch}
                 setInRoom={setInRoom}
                 setRoom={setRoom}
                 joinRoom={joinRoom}
                 userConnected={userConnected}
                 fetchChats={fetchChats}
                 setRoomName={setRoomName}
                 fetchGroupMembers={fetchGroupMembers}
                  />             
</div>}

<GetInfo groupName={roomName} id={room} />
{inRoom ? <>

<div className='room-header-info'>
<h2> {roomName} ({groupMembers.length}) </h2>
<InfoBtn id={room} />

<button onClick={() => leave()}> <BiArrowBack /> </button> 

<hr></hr>
</div> 

{/* FETCHES CHATS FOR EACH ROOM */}
<div className='chat-container'>
<div>{
    chats.map(chat => {
        return(
            <div className='inner-chat-container'> 
            <div className={name == chat.user_name ? 'your-container' : 'their-container'}>
                <div key={chat.message_id}>
                  <div className={myId == chat.user_id ? 'your-name' : 'their-name'}> {myId === chat.user_id ? 'me' : chat.user_name }  {leader === chat.user_id ? <button className='leader-btn'> leader</button> : <button className='member-btn'>member</button>} </div>
                  <div className={myId == chat.user_id ? 'you' : 'other'}>{chat.group_messages}</div>
                  <br></br>
                  <br></br>
                  <span>{chat.datetime}</span>
                  {/* {leader === chat.user_id ? <button className='leader-btn'>leader</button> : 'member'} */}
                </div>
            </div> 
        </div>
    )}      
)}</div> 

{/* APPENDS CHATS TO ROOM */}
        <div>
           {messageReceived.map((messageContent) => {
               return(
                //    <div>
                //        <div key={messageContent.id}>
                //        <div className={myId == messageContent.id ? 'your-name' : 'their-name'}>
                       
                //         <div>{myId === messageContent.id ? 'me' : messageContent.name}{leader === messageContent.id ? <button className='leader-btn'> leader</button> : <button className='member-btn'>member</button>} </div>
                //         </div>
                //             <div className={myId == messageContent.id ? 'you' : 'other'}>
                //                 {messageContent.message}</div> 
                //             <span>({messageContent.time})</span>
                //         </div>
                //     <br></br>
                // </div>
                <div className='inner-chat-container'> 
            <div className={name == messageContent.name ? 'your-container' : 'their-container'}>
                <div key={messageContent.id}>
                  <div className={myId == messageContent.id ? 'your-name' : 'their-name'}> {myId === messageContent.id ? 'me' : messageContent.name }  {leader === messageContent.id ? <button className='leader-btn'> leader</button> : <button className='member-btn'>member</button>} </div>
                  <div className={myId == messageContent.id ? 'you' : 'other'}>{messageContent.message}</div>
                  <br></br>
                  <br></br>
                  <span>{messageContent.time}</span>
                  {/* {leader === chat.user_id ? <button className='leader-btn'>leader</button> : 'member'} */}
                </div>
            </div> 
        </div>
               )
           })}
        </div> 
    <br></br>
<br></br>
        </div>  
  
<div className='send-container'> 
    <form onSubmit={sendMessage}>
         <input required className='send-input' onChange={e => setMessage(e.target.value)} value={group_messages} placeholder='message' type='text'/>
         <button className='send-btn'> <IoSend /> </button>
    </form>
</div> </> : ''}
    </div>
   )
};
export default Sock;