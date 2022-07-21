// import React, {useState} from 'react';
// import { BiComment, BiX, BiDotsHorizontalRounded, BiHeart } from "react-icons/bi";
// import MyPosts from './MyPosts'

// const PostsMapped = () => {
//     const [comments, setComments] = useState([]);

//     // const [inComments, setInComments] = useState(false);
// const [yourProfile, setProfile] = useState(true);
// const [commentId, setCommentId] = useState();
// const {posts} = MyPosts();

// const fetchComments = async(id) => {
//     try {
//       const res = await fetch(`http://localhost:8080/profile/mycomments/${id}`,{
//         headers: { token: localStorage.getItem('token') }
//       });
//         const myComments = await res.json();
//         setComments(myComments);
// alert(id)
//     } catch (err) {
//       console.error(err.message);
// }};
// const PostsDisplayer = ({setInComments, setProfile }) => {
    
//     return(
//         <div className='post-container'>
//         {posts.map(post => (
//             <div key={post.post_id} className="inner-post-container">
//                 <h3>{post.post_title} </h3> 
//                     <p>{post.post_description}</p>
//         <button>
//               <BiHeart /> 
//               </button>
//                     <button onClick={() => {
//                     fetchComments(post.post_id)
//                     setInComments(true);
//                     setProfile(false);
//                     setCommentId(post.post_id)
//                   }}      
//                 > <BiComment/> </button> 
//                 <button className="dots-btn"> <BiDotsHorizontalRounded /></button>
//               <hr></hr>
//           </div>
//         ))} 
//     </div>
//   )
// }
// return{PostsDisplayer, fetchComments}
// };
// export default PostsMapped;
