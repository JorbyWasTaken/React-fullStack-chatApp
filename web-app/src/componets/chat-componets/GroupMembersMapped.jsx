import React, { useEffect, useContext } from "react";
import GroupMembers from "./GroupMembers";

const memberDisplayer = () => {
    const { Context} = GroupMembers();

    let members = useContext(Context);
    console.log(members)
        useEffect(() => {
            const GroupMembersMappedComp = () => {
                const {groupMembers} = GroupMembers();
                    return(
                        <div>
                            {members.map(member => (
                        <div>
                    <p>{member.user_name}</p>
                </div>
            ))}
        </div>
    )};
return { GroupMembersMappedComp }
   }, [members]);
};

export default memberDisplayer;

