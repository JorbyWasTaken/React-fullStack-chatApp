import React, {useState} from 'react';
const [theirFollowing, setTheirFollowing] = useState(false);
const ListTheirFollowing = () => {

  return(
    <div className="show-following">
  <button onClick={() => {
    setTheirFollowers(false)
    setTheirFollowing(false)
  }} >close </button>
  <div>{allTheirFollowing.map(following => (
    <p key={following.follow_id} onClick={() => {
      setTheirFollowers(false)
      fetchOtherProfile(following.user_id)}}>{following.user_name}
    </p>
  ))}</div>
  </div>
  )
};
export default ListTheirFollowing;