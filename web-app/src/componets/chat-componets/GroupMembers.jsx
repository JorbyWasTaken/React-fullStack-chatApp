import React, {useState, createContext} from 'react';

const GroupMembers = () => {
const Context = createContext();

const [groupMembers, setGroupMembers] = useState([]);
   const fetchGroupMembers = async( id ) => {
        try{
            const res = await fetch(`http://localhost:8080/group/groupmembers/${id}`,{
            headers: { token: localStorage.token },
            });
            const parseRes = await res.json();   
            setGroupMembers(parseRes);
        }catch(err){
            console.log(err.message)
        };
}

const GroupMembersMapped = () => {
    return(
        <Context.Provider value={groupMembers}>
        <div>
        {groupMembers.map(member => (
            <div>
            <p>{member.user_name}</p>
            </div>
        ))}
        </div>
        </Context.Provider>
        )};

    return { fetchGroupMembers, GroupMembersMapped, groupMembers, Context }

};

export default GroupMembers;    