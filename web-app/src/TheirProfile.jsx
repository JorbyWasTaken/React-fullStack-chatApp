import React, {useState} from 'react';
import { BiComment, BiX, BiHeart, BiDotsHorizontalRounded } from "react-icons/bi";
import styles from './styles/profile.css'
import MyFollowing from './componets/profile-componets/MyFollowing'

const TheirProfile = ({inComments, setInComments, theirProfile, setProfile, comments, fetchOtherProfile,
addComment, setCommentMessage, theirName, follow, theirId, 
 setTheirFollowing, setTheirFollowers,
allTheirFollowers, allTheirFollowing, theirFollowers, ListTheirFollowers, theirFollowing, ListTheirFollowing, thierBio, fetchComments, setCommentId  }) => {

const {following, FollowBtn} = MyFollowing();
    return(
        <div className="fetched-profile-container ">
        <div className="their-profile-container">
    {/* CLASS NAME SWITCHED TO HIDE COMMENTS OR NOT */}
    <div className={inComments ? "comment-container" : 'comment-container-hide'}>
    
    {/*  BTN TO CLOSE PAGE/COMMENTS */}          
              <button className="close-page-btn" onClick={() => {
                setInComments(false);
               {theirProfile ? setProfile(true) : setProfile(false) }
            }}> <BiX /> </button>
            <h1>comments</h1> 
              <hr></hr>
    
    {/* MAP OF COMMENTS BASED ON PERSON ID */}
      <div className="comments-mapped">
          {comments.map(comment =>(
            <p>
              <span className="checkPint" onMouseDown={() => setProfile(false)} onClick={() => {
                  fetchOtherProfile(comment.user_id);
    
                    setInComments(false)
                  }}><header>{comment.user_name} </header>
              </span>{comment.comment_message}
            </p>
          ))}
      </div>  
    
    {/* COMMENT FORM SUBMITTER */}
          <form onSubmit={addComment}
              className="comment-inputs">
              <input required placeholder="comment" onChange={e => setCommentMessage(e.target.value)}></input>
          </form>
    </div>
    
    {/* CLASS SWITCH TO HIDE THEIR PAGE TO SHOW COMMENTS */}
    {/* IF IN COMMENTS = HIDE */}
        <div className={inComments ? 'inner-comment-container-hide' : 'inner-comment-container'}>
    
    {/* THEIR TOP PROFILE DATA */}
    <div className="profile-top-info">
        <h1>{theirName} </h1>
    </div>
    
    {/* LEAVE AND FOLLOW BTN */}
        <button className="close-their-profile" onClick={() => setProfile(true)}> <BiX /> </button>
          <br></br>
        
        <FollowBtn id={theirId}/>
        {/* <button onClick={() => follow(theirId)}>follow</button>
            {following.includes(theirId) ? 'follwing' : 'not follwoing'} */}
         
    <div className="follower-container">
      <p>posts {theirProfile.length}</p>
        <p onClick={() => {
          setTheirFollowing(false)
          setTheirFollowers(true)}}>followers {allTheirFollowers.length}</p>
    
      <p onClick={() => {
        setTheirFollowers(false)
        setTheirFollowing(true)}}>following {allTheirFollowing.length}</p>
    </div>
            <hr></hr>
            {theirFollowers ? <ListTheirFollowers /> : '' }
            {theirFollowing ? <ListTheirFollowing /> : '' }
    <div className={theirFollowing || theirFollowers ? 'their-lower-page-container-hide' : 'their-lower-page-container'}>
    {/* THEIR BIO */}
    <div className="bio-container">
        <div>
          <input readOnly className="bio" placeholder={thierBio === null ? 'bio' : thierBio}></input>
        </div>
    </div>
    <div className="posts-wall-container">
        <header>posts</header>
        <header> wall</header>
    </div>
    
            <div className="their-post-container">
    {/* MAPS THEIR DATA TO LAYOUT */}
          {theirProfile.map(profile => (
    <div> 
    {/* POSTS */}
        <h3>{profile.post_title}</h3>
            <p>{profile.post_description}</p>
    {/* BTNS TO COMMENT ON POST */}
    <button>
    <BiHeart /> 
    </button>
               <button onClick={() => {
                  fetchComments(profile.post_id)
                  setCommentId(profile.post_id)
                  setInComments(true)
            }}> <BiComment /> </button>  
                <button className="dots-btn"> <BiDotsHorizontalRounded /></button>
        <hr></hr>
    </div> 
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}
 

export default TheirProfile;
      
