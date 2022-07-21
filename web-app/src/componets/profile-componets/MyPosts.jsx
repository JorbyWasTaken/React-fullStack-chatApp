import {useState, useEffect} from 'react';

const FetchMyPosts = () => {
const [posts, setPosts] = useState([]);
const [myBio, setMyBio] = useState('');
useEffect(() => {
(async() => {
      try {
        const res = await fetch('http://localhost:8080/profile/myposts',{
          headers: { token: localStorage.getItem('token') }
        });
         const myPosts = await res.json();
         setPosts(myPosts);    
         setMyBio(myPosts[0].user_bio)

    } catch (err) {
      console.error(err.message);
  }
})(); 
}, [])
return {posts, setPosts, myBio, setMyBio};
}
export default FetchMyPosts;