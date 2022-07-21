import React, {useState, useEffect, useContext} from "react";
// import { useNavigate } from "react-router-dom";
import styles from '../styles/profile.css'
import followerStyles from '../styles/followers.css'
import { BiComment, BiX, BiDotsHorizontalRounded, BiHeart } from "react-icons/bi";
import MyRooms from "../myRooms";
import GetName from "../GetName";
import TheirProfile from "../TheirProfile";
import MyFollowing from "../componets/profile-componets/MyFollowing";
import MyFollowers from "../componets/profile-componets/MyFollowers";
import MyPosts from "../componets/profile-componets/MyPosts"
import Create from "../componets/profile-componets/Create";
import { ColorProvider } from "../App";
import TestCompo from "../compoTest";
import MyJoinedRooms from "../componets/chat-componets/MyJoinedGroups";
import Bio from "../componets/profile-componets/Bio";
import PostsMapped from "../componets/profile-componets/PostsMapped";

// MAIN FUNCTION COMPONENT
const Profile = () => {
const [theirName, setTheirName] = useState('');
const [theirProfile, setTheirProfie] = useState([]);
const [thierBio, setTheirBio] = useState();
const [commentId, setCommentId] = useState();

const { name } = GetName();
const { following, setFollowing } = MyFollowing();
const { followers, setFollowers } = MyFollowers();
const { posts, setPosts } = MyPosts();
// const {fetchComments, PostsDisplayer} = PostsMapped();

const color = useContext(ColorProvider);
//FUNCTION TO FOLLOW SOMEONE
const follow = async (id) => {
  try {
  await fetch(`http://localhost:8080/profile/follow/${id}`, {
    method: 'POST',
    headers: { token: localStorage.token}
  });
} catch (err) {
  console.error(err.message);
}};

let datee = new Date();
let newDate = 
`${datee.getMonth()}/${datee.getDate()}/${datee.getFullYear()} 
 ${datee.getHours() - 12}:${datee.getMinutes()}`

//FETCH COMMENTS OF POST BY ID
  const [comments, setComments] = useState([]);
  const fetchComments = async(id) => {
    try {
      const res = await fetch(`http://localhost:8080/profile/mycomments/${id}`,{
        headers: { token: localStorage.getItem('token') }
      });
        const myComments = await res.json();
        setComments(myComments);

    } catch (err) {
      console.error(err.message);
}};
//COMMENT ON PEOPLES POST 
const [comment_message, setCommentMessage] = useState();
const addComment = async(e) => {
    e.preventDefault();
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", localStorage.getItem("token"));

    const body = { comment_message };
  
    await fetch(`http://localhost:8080/profile/newcomment/${commentId}`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(body)
    });
fetchComments(commentId);
};

// SET WHAT COMMENT YOUR IN 
const [theirId, setTheirId] = useState([]);
const fetchOtherProfile = async(id) => {
    try {
        const res = await fetch(`http://localhost:8080/profile/showprofile/${id}`,{
          headers: { token: localStorage.token }
        });
        const profile = await res.json();   
        setTheirProfie(profile);
        setTheirId(profile[0].user_id)
        setTheirName(profile[0].user_name)  
        setTheirBio(profile[0].user_bio)

      } catch (err) {
        console.error(err.message);
      }
}
useEffect(() => {
  fetchOtherProfile();
}, [])

//FUNCTIONS TO CONTROL SHOWING FOLLOWERS
const[showFollowers, setShowFollowers] = useState(false);
const ListFollowers = () => {
  return(
   <div className="show-following">
    <button onClick={() => {
      setShowFollowers(false)
      setShowFollowing(false)
    }} >close</button>
    <div>{followers.map(followers => (
      <span key={followers.user_id}>
      <p onClick={() => {
        setProfile(false)
        fetchOtherProfile(followers.user_id)}}>{followers.user_name}
      </p>
      </span>
    ))}</div>
    </div>
  )
}

const[showFollowing, setShowFollowing] = useState(false);
const ListFollowing = () => {
  return(
   <div className="show-following">
    <button onClick={() => {
      setShowFollowers(false)
      setShowFollowing(false)
    }} >close</button>
    <div>{following.map(following => (
      <span key={following.user_id}>
      <p onClick={() => {
        setShowFollowers(false)
        setProfile(false)
        fetchOtherProfile(following.user_id)}}>{following.user_name}
      </p>
      </span>
    ))}</div>
    </div>
  )
};

//STATE TO DETERMINE WHERE YOU ARE

// TRUE = YOURS AND CLOSES THIER PROFILE
// FALSE HIDES YOUR PROFILE AND DISPLAYS FETCHED PROFILE
const [yourProfile, setProfile] = useState(true);

// TO DETERMINE IF LOOKING AT COMMENT
// TRUE = LOOKING| FLASE = NOT 
const [inComments, setInComments] = useState(false);

  const [allTheirFollowing, setAllTheirFollowing] = useState([])
  const TheirFollowingFunc = async () => {
    try {
    const res = await fetch(`http://localhost:8080/profile/theirfollowing/${theirId}`, {
      headers: { token: localStorage.token},
    });
  
    const parseData = await res.json();
    setAllTheirFollowing(parseData);
  } catch (err) {
    console.error(err.message);
  }};

  useEffect(() => {
   TheirFollowingFunc();
  },[theirId])


  // GET THEIR FOLLOWERS
  const [allTheirFollowers, setAllTheirFollowers] = useState([])
  const TheirFollowersFunc = async () => {
    try {
    const res = await fetch(`http://localhost:8080/profile/theirfollowers/${theirId}`, {
      headers: { token: localStorage.token}
    });
  
    const parseData = await res.json();
    setAllTheirFollowers(parseData);
  } catch (err) {
    console.error(err.message);
  }
  };
  useEffect(() => {
    TheirFollowersFunc();
  }, [theirId]);
  
  // onst[showFollowers, setShowFollowers] = useState(false);
  const [theirFollowers, setTheirFollowers] = useState(false);

  const ListTheirFollowers = () => {
  
    return(
      <div className="show-following">
      <button onClick={() => {
        setTheirFollowers(false)
        setTheirFollowing(false)
      }} >close</button>
      <div>{allTheirFollowers.map(followers => (
        <span key={followers.user_id}>
        <p onClick={() => {
          setTheirFollowing(false)
          fetchOtherProfile(followers.user_id)}}>{followers.user_name}
        </p>
        </span>
      ))}</div>
      </div>
    )
  }

  // const[showFollowing, setShowFollowing] = useState(false);
  const [theirFollowing, setTheirFollowing] = useState(false);
  const ListTheirFollowing = () => {
  
    return(
      <div className="show-following">
    <button onClick={() => {
      setTheirFollowers(false)
      setTheirFollowing(false)
    }} >close</button>
    <div>{allTheirFollowing.map(following => (
      <span key={following.user_id}>
      <p onClick={() => {
        setTheirFollowers(false)
        fetchOtherProfile(following.user_id)}}>{following.user_name}
      </p>
      </span>
    ))}</div>
    </div>
    )
  };

//            JSX           //

return(
      <div className="profile-container">
          <TestCompo name={'joish'} color={'green'} />

{/* WILL CHANGE CLASS TO HIDE TO SHOW PROFILE */}
{/* PROFIE DATA */}
       <div className={yourProfile ? 'your-profile-container' : 'your-profile-container-hide'}>
<div className="profile-top-info">
<h1>{name} {color}</h1>

</div> 
{/* YOUR TOP DATA */}
<div className="follower-container">
<p>posts {posts.length}</p>

{/* TOGGLE TO SHOW FOLLOWERS */}
  <p onClick={() => {
    setShowFollowing(false)
    setShowFollowers(true)}}>followers {followers.length}
  </p>

{/* TOGGLE TO SHOW FOLLOWING */}
  <p onClick={() => {
    setShowFollowers(false)
    setShowFollowing(true)}}>following {following.length}
  </p>
</div>

{/* TOGGLES TO SHOW SHOW FOLLOWERS AND HIDE LOWER DATA */}
      <hr></hr> 
        {showFollowers ? <ListFollowers /> : ''}
        {showFollowing ? 
      <ListFollowing /> : ''}
<div className={showFollowing || showFollowers ? 'lower-info-container-hide' : 'lower-info-container'}>

<Bio />

<div className="posts-wall-container">
    <header>posts</header>
    <header> wall</header>
</div>

{/* <Create /> */}
{/* <PostsDisplayer setInComments={setInComments} setProfile={setProfile}  /> */}
{/* <PostsMapped inComments={inComments} setInComments={setInComments}/> */}
{/* DISPLAYS YOUR POSTS */}
<div className='post-container'>
    {posts.map(post => (
        <div key={post.post_id} className="inner-post-container">
            <h3>{post.post_title} </h3> 
                <p>{post.post_description}</p>

{/* TO DISPLAY COMMENT PAGE WITH COMMENTS  */} 
    <button>
          <BiHeart /> 
          </button>
                <button onClick={() => {
                fetchComments(post.post_id)
                setInComments(true);
                setProfile(false);
                setCommentId(post.post_id)
              }}      
            > <BiComment/> </button> 
            <button className="dots-btn"> <BiDotsHorizontalRounded /></button>
           
          <hr></hr>
      </div>
    ))} 
</div>
      </div>
</div> 

{yourProfile? '' : 
<TheirProfile inComments={inComments} setInComments={setInComments} theirProfile={theirProfile} setProfile={setProfile} comments={comments} fetchOtherProfile={fetchOtherProfile}
addComment={addComment} setCommentMessage={setCommentMessage} theirName={theirName} follow={follow} theirId={theirId} following={following} setTheirFollowing={setTheirFollowing} setTheirFollowers={setTheirFollowers}
 allTheirFollowers={allTheirFollowers} allTheirFollowing={allTheirFollowing} theirFollowers={theirFollowers} ListTheirFollowers={ListTheirFollowers} theirFollowing={theirFollowing} ListTheirFollowing={ListTheirFollowing} thierBio={thierBio} fetchComments={fetchComments} setCommentId={setCommentId} /> 
}
</div> 
  )
};
export default Profile;