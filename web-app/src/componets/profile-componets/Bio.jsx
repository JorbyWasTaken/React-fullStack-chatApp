import React, {useState}from 'react';
import MyPosts from './MyPosts'

const Bio = () => {
const [user_bio, setBio] = useState();
const editBio = async (e) => {
    e.preventDefault();
        try {
        const body = { user_bio };
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append('token', localStorage.token);
      
        await fetch('http://localhost:8080/profile/bio', {
            method: "PUT",
            headers: myHeaders ,
            body: JSON.stringify(body),
        });
        } catch (err) {
            console.error(err.message);
        }
            window.location.reload();
        };
const {myBio} = MyPosts();
return(
    <>
    <div className='bio-container'>
        <form onSubmit={editBio}>
            <input
            required 
            className="bio" 
            onChange={e => setBio(e.target.value)} 
            value={user_bio} 
            placeholder={myBio.length === 1 ? 'bio' : myBio} 
            type='text'/>
        </form>
    </div>
    </>
    )
};

export default Bio;