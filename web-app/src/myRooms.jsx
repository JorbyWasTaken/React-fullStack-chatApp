import React, {useState, useEffect} from 'react';
import styles from './styles/rooms.css'
import { useNavigate } from "react-router-dom";

const MyRooms = () => {
const [groups, setGroups] = useState([]);    
const navigate = useNavigate();

async function deleteGroup(id) {
    try {
      await fetch(`http://localhost:8080/group/mygroups/${id}`, {
        method: "DELETE",
        headers: { token: localStorage.getItem('token') }
      });
      setGroups(groups.filter(group => group.group_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

const fetchRooms = async() => {
    try {
        const res = await fetch('http://localhost:8080/group/mygroups',{
          headers: { token: localStorage.getItem('token') }
        });
        const myGroups = await res.json();
        setGroups(myGroups);
        let roomNum = 0;
        for(let i = 0; i < myGroups.length; i++){
            roomNum += i;
        }
      } catch (err) {
        console.error(err.message);
      }
};
  useEffect(() => {
 fetchRooms();
}, [])
  return(
        <div className='room-wrapper'>
        {/* <header className='created-rooms-header' >MY ROOMS <button className='add-room-btn'> add room </button> </header>  */}
<p className='created-rooms-container'>{
groups.length === 1 && groups[1] === undefined  && groups[0].group_id === null ? <p>no rooms made</p> :
    groups.map(group => (
    <button className='created-room-btns'>{group.group_name}<hr></hr> 
    {/* <p>{group.group_description}</p> */}
    <button className='inner-btn'>edit</button>
    <button onClick={() => deleteGroup(group.group_id)} className='inner-btn'>delete</button> <br></br>    
    <button className='my-rooms-join-btn'>
    <span onClick={() => navigate('/chat')} className='join-btn-span'>join</span>
    </button> 
    </button> 
))}</p>
</div>
    )
}
export default MyRooms;