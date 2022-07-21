import React, {useState, useEffect} from 'react';

const MyFollowing = () => {
const [following, setFollowing] = useState([]);  
const unFollow = async(id) => {
try {
  await fetch(`http://localhost:8080/profile/unfollow/${id}`, {
    method: 'DELETE',
    headers: { token: localStorage.token}
  });
  setFollowing(following);
}catch(err){
console.log(err.message)
  }
};
const [isFollowing, setIsFollowing] = useState(false); 
const FollowBtn = ({id}) => {
  const followThem = async() => {
    try {
      await fetch(`http://localhost:8080/profile/follow/${id}`,{
        method: 'POST',
        headers: { token: localStorage.token}
      });
    } catch (err){
      console.error(err.message)
    }};
    for (let i in following){
      if (following[i].user_id === id){
        setIsFollowing(true)
    }};
    if (isFollowing){
return(
  <button onClick={() => unFollow(id)}>unfollow</button>
)}else{
      return(
        <div>
          <button onClick={() => followThem(id)}>follow</button>
        </div>
    )};
};
useEffect(() => {
(async() => {
    try {
        const res = await fetch("http://localhost:8080/profile/following", {
          headers: { token: localStorage.token}
        });
        const parseData = await res.json();
        setFollowing(parseData);

      } catch (err) {
        console.error(err.message);
      }
    })();  
}, []);
return{ following, setFollowing, FollowBtn }
};
export default MyFollowing;