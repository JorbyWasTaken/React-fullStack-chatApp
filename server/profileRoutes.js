const router = require("express").Router();
const pool = require('./db');
const auth = require('./auth')
const cors = require("cors");
const express = require("express");
// const { route } = require("./jwtAuth");
router.use(cors());
router.use(express.json());


router.get("/theirfollowers/:id", auth, async(req, res) => {
    try{
        const { id } = req.params;
    const posts = await pool.query(
    "select users.user_id, users.user_name from users left join friends on users.user_id = friends.user_id1 where user_id2 = $1",
 [id]
     );
    res.json(posts.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
        }
    });
//
router.get("/theirfollowing/:id", auth, async(req, res) => {
    try{
        const { id } = req.params;
    const posts = await pool.query(
    "select users.user_id, users.user_name from users left join friends on users.user_id = friends.user_id2 where user_id1 = $1",
 [id]
     );
    //was [0]
    res.json(posts.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
        }
    });

//
router.get("/followers", auth, async(req, res) => {
    try{
    const posts = await pool.query(
    "select users.user_id, users.user_name from users left join friends on users.user_id = friends.user_id1 where user_id2 = $1",
    [req.user]
     );
    res.json(posts.rows);
    }catch(err){
      console.error(err.message);
      res.status(500).send("Server error");
    }
});
//
router.get("/following", auth, async(req, res) => {
    try{
        // const { id } = req.params;
    const posts = await pool.query(
    "select users.user_id, users.user_name from users left join friends on users.user_id = friends.user_id2 where user_id1 = $1",
 [req.user]
     );
    //was [0]
    res.json(posts.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// TO FOLLOW SOMEONE
    router.post("/follow/:id", auth, async(req, res) => {
        try{
            const { id } = req.params;
        const posts = await pool.query(
        "insert into friends (user_id1, user_id2) values($1, $2)",
     [req.user, id]
         );
        //was [0]
        if (posts.rows.length === 0) {
            return res.json("This group is not yours");
          }
        res.json(posts.rows);
        }catch(err){
            console.error(err.message);
            res.status(500).send("Server error");
            }
        });

//TO UNFOLLOW
router.delete("/unfollow/:id", auth, async (req, res) => {
    try {
      const { id } = req.params;
      const unfollow = await pool.query(
        "DELETE FROM friends WHERE user_id2 = $1 AND user_id1 = $2 RETURNING *",
        [id, req.user]
      );
  
      if (unfollow.rows.length === 0) {
        return res.json("This group is not yours");
      }
  
      res.json("unfollowed");
    } catch (err) {
      console.error(err.message);
    }
  });

//ADD POST
router.post("/newpost", auth, async (req, res) => {
    try {
        // const { description } = req.body;
        const {post_title} = req.body;
        const {post_description} = req.body;
    //   console.log(req.body);
      const newPost = await pool.query(
        "INSERT INTO posts(user_id, post_title, post_description) VALUES ($1, $2, $3) RETURNING *",
        [req.user, post_title, post_description]
      );

  
      res.json(newPost.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
});

//INSERT COMMENT INTO POST
router.post("/newcomment/:id", auth, async (req, res) => {
    try {
        // const { description } = req.body;
        const { id } = req.params;
        const { comment_message } = req.body;
        console.log(id)
      const newComment = await pool.query(
        "INSERT INTO comments(user_id, comment_message, post_id) VALUES ($1, $2, $3) RETURNING *",
        [req.user, comment_message, id]
      );

  
      res.json('comment added');
    } catch (err) {
      console.error(err.message);
    }
});
//NEW COMMENT
// router.post("/newcomment", auth, async (req, res) => {
//     try {
//         // const { description } = req.body;
//         const {post_id} = req.body;
//         const {comment_message} = req.body;
//     //   console.log(req.body);
//       const newComment = await pool.query(
//         "INSERT INTO comments(user_id, comment_message, post_id) VALUES ($1, $2, $3) RETURNING *",
//         [req.user, comment_message, post_id]
//       );

  
//       res.json(newComment.rows[0]);
//     } catch (err) {
//       console.error(err.message);
//     }
// });

//GET MY POSTS
router.get("/myposts", auth, async(req, res) => {
    try{
        // const { id } = req.params;
    const posts = await pool.query(
    "select users.user_bio, users.user_name, posts.post_id, posts.post_title, post_description from users left join posts on users.user_id = posts.user_id where users.user_id = $1",
 [req.user]
     );
    //was [0]
    if (posts.rows.length === 0) {
        return res.json("This group is not yours");
      }
    res.json(posts.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
        }
    });


//FETCH COMMENTS OF POST
    router.get("/mycomments/:id", auth, async(req, res) => {
        try{
            const { id } = req.params;
        const comments = await pool.query(
        "select comments.comment_message, comments.user_id, users.user_name, comments.post_id from posts left join comments on posts.post_id = comments.post_id left join users on comments.user_id = users.user_id  where posts.post_id = $1",
     [id]
         );
        //was [0
        res.json(comments.rows);
        }catch(err){
            console.error(err.message);
            res.status(500).send("Server error");
            }
        });

//FETCH USER PROFILE
router.get("/showprofile/:id", auth, async(req, res) => {
    try{
        const { id } = req.params;
    const profile = await pool.query(
    "select users.user_id, users.user_bio, users.user_name, posts.post_id, posts.post_title, post_description from users left join posts on users.user_id = posts.user_id  where users.user_id = $1",
 [id]
     );
    //was [0
    res.json(profile.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
        }
    });

//EDIT YOUR BIO
router.put("/bio", auth, async (req, res) => {
    try {
      const { user_bio } = req.body;
      const updateBio = await pool.query(
        "UPDATE users SET user_bio = $1 WHERE user_id = $2",
        [user_bio, req.user]
      );
  
      res.json("bio was updated");
    } catch (err) {
      console.error(err.message);
    }
  }); 

module.exports = router;
   