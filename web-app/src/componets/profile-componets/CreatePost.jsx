import React, {useState} from 'react';

const CreatePost = () => {
    const [post_title, setPostTitle] = useState();
const [post_description, setPostDescription] = useState();
//CREATE POST FUNCTION 
const addPost = async() => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", localStorage.getItem("token"));

    const body = { post_title, post_description };
  
    await fetch("http://localhost:8080/profile/newpost", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(body)
    });

    window.location.reload();
  } catch (err) {
    console.error(err.message);
  }
};
    return(
    <div className="add-post-conatiner">
        <h3>create post?</h3>
        <form onSubmit={addPost}>
        <input onChange={e => setPostTitle(e.target.value)} required placeholder="add title"></input>
            <input onChange={e => setPostDescription(e.target.value)} required placeholder="message"></input>
        <button onClick={() => addPost()}>add</button>
        </form>
    </div>
    )
};
export default CreatePost;