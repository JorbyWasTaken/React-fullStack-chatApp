const router = require("express").Router();
const pool = require('./db');
const auth = require('./auth')
const cors = require("cors");
const express = require("express");
// const { route } = require("./jwtAuth");
router.use(cors());
router.use(express.json());
//ALL TODOS AND NAME NEW


//GROUP ROUTES
// router.post("/group", auth, async (req, res) => {
//     try {
//         // const { description } = req.body;
//         const {group_name} = req.body;
//     //   console.log(req.body);
//       const newGroup = await pool.query(
//         "INSERT INTO groups(user_id, group_name) VALUES ($1, $2) RETURNING *",
//         [req.user, group_name]
//       );

  
//       res.json(newGroup.rows[0]);
//     } catch (err) {
//       console.error(err.message);
//     }
//   });



//FETCH AND DISPLAY NAME
router.get("/name", auth, async(req, res) => {
try{
// res.json(req.user);
const user = await pool.query("SELECT user_name, user_id FROM users WHERE user_id = $1", 
[req.user]
);
res.json(user.rows[0])
}catch(err) {
    console.log(err);
}
});

//GET EMAIL ROUTE



//GET TODOS
//was post
router.get("/todos", auth, async(req, res) => {
try{
const user = await pool.query(
    "SELECT users.user_name, todos.todo_id, todos.description FROM users LEFT JOIN todos ON users.user_id = todos.user_id WHERE users.user_id = $1",
[req.user]
 );
//was [0]
res.json(user.rows);
}catch(err){
    console.error(err.message);
    res.status(500).send("Server error");
    }
});

//CREATE A TODO NEW
router.post("/todos", auth, async (req, res) => {
    try {
        // const { description } = req.body;
        const {description} = req.body;
    //   console.log(req.body);
      const newTodo = await pool.query(
        "INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *",
        [req.user, description]
      );

  
      res.json(newTodo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
//UPDATE A TODO NEW
router.put("/todos/:id", auth, async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const updateTodo = await pool.query(
        "UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *",
        [description, id, req.user]
      );
  
      if (updateTodo.rows.length === 0) {
        return res.json("This todo is not yours");
      }
  
      res.json("Todo was updated");
    } catch (err) {
      console.error(err.message);
    }
  });
  
//DELETE A TODO NEW
router.delete("/todos/:id", auth, async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await pool.query(
        "DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *",
        [id, req.user]
      );
  
      if (deleteTodo.rows.length === 0) {
        return res.json("This Todo is not yours");
      }
  
      res.json("Todo was deleted");
    } catch (err) {
      console.error(err.message);
    }
  });
module.exports = router;