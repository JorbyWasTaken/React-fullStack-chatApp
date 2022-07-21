import React, {useState, useEffect} from "react";
import Dashboard from "../componets/Dashboard";
import styles from '../styles/profile.css'

const ProfileTemplate = () => {
    const [name, setName] = useState();
    const getProfile = async () => {
      try {
        const res = await fetch("http://localhost:8080/dashboard/name", {
          method: "GET",
          headers: { token: localStorage.getItem("token") }
        });
  
        const parseData = await res.json();
        setName(parseData.user_name);
      } catch (err) {
        console.error(err.message);
      }
    };
  
    useEffect(() => {
      getProfile();
    }, []) 

const [posts, setPosts] = useState([]);
    const fetchMyPosts = async() => {
      try {
          const res = await fetch('http://localhost:8080/profile/myposts',{
            headers: { token: localStorage.getItem('token') }
          });
          const myPosts = await res.json();
          setPosts(myPosts);
  
          
        //   setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
          console.error(err.message);
        }
  }
  useEffect(() => {
fetchMyPosts();
  }, [posts])


  const [comments, setComments] = useState([]);
  const fetchComments = async(id) => {
    try {
        const res = await fetch(`http://localhost:8080/profile/mycomments/${id}`,{
          headers: { token: localStorage.getItem('token') }
        });
        const myComments = await res.json();
        setComments(myComments);

      //   setTodos(todos.filter(todo => todo.todo_id !== id));
      } catch (err) {
        console.error(err.message);
      }
}


//CREATE POST
const [post_title, setPostTitle] = useState();
const [post_description, setPostDescription] = useState();

const addPost = async() => {
  try {
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", localStorage.getItem("token"));

    const body = { post_title, post_description };
  
    const response = await fetch("http://localhost:8080/profile/newpost", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(body)
    });

    const parseResponse = await response.json();

    window.location.reload();
    // window.location = "/";
  } catch (err) {
    console.error(err.message);
  }
};

const [comment_message, setCommentMessage] = useState();
const addComment = async(post_id) => {
  try {
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", localStorage.getItem("token"));

    const body = { post_id, comment_message };
  
    const response = await fetch("http://localhost:8080/profile/newComment", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(body)
    });

    const parseResponse = await response.json();

    window.location.reload();
    // window.location = "/";
  } catch (err) {
    console.error(err.message);
  }
};
const fetchOtherPosts = async(id) => {

}

return(
      <div className="profile-container">
        <div className="profile-top-info">
            <h1>{name}</h1>
        </div>
        <div className="follower-container">
<p>posts {posts.length}</p>
<p>followers</p>
<p>following</p>
        </div>
        <hr></hr>
        <div className="bio-container">
      <div>
      <input className="bio" placeholder='bio'></input>
      </div>
        </div>
        <div className="posts-wall-container">
          <header >posts</header>
          <header> wall</header>
        </div>
        <div className="add-post-conatiner">
        <input onChange={e => setPostTitle(e.target.value)} required placeholder="add title"></input>
        <input onChange={e => setPostDescription(e.target.value)} required placeholder="message"></input>
        <button onClick={() => addPost()}>add</button>
        </div>
        {posts.map(post => (
            <div>
            <p>{post.post_title}</p>
            <p>{post.post_description}</p>
            <input placeholder="comment" onChange={e => setCommentMessage(e.target.value)}></input>
            <button onClick={() => addComment(post.post_id)}> add comment</button>
          <button onClick={() => fetchComments(post.post_id)}>view comments</button>  
            </div>
          ))}
             {comments.map(comment =>(
            <p><span className="checkPint" onClick={() => fetchOtherPosts(comment.user_id)}>{comment.user_name}</span>:{comment.comment_message}</p>
          ))}
        </div>
    )
}
export default ProfileTemplate;