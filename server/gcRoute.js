const router = require("express").Router();
const pool = require('./db');
const auth = require('./auth')
const cors = require("cors");
const express = require("express");
// const { route } = require("./jwtAuth");
router.use(cors());
router.use(express.json());

//ADD ROOM TO JOINED
router.post("/joinroom/:id", auth, async (req, res) => {
  try {
      const {id} = req.params;
    const newGroup = await pool.query(
      "Insert into joinedgroups (group_id, member_id) values ($1, $2)",
      [id, req.user]
    );
    res.json(newGroup.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//FETCH MY JOINED ROOMS
router.get('/myjoinedrooms', auth, async(req, res) => {
  try{
    const groups = await pool.query(
    "select users.user_name, groupsanddata.group_name, groupsanddata.user_id, groupsanddata.group_id, joinedgroups.member_id from users left join groupsanddata on users.user_id =  groupsanddata.user_id left join joinedgroups on groupsanddata.group_id = joinedgroups.group_id where joinedgroups.member_id = $1",
    [req.user]
    );
    res.json(groups.rows)
  }catch(err){
  }
});

//GET MEMBERS OF GROUP ID 
router.get('/groupmembers/:id', auth, async(req, res) => {
  try{
    const { id } = req.params;
    const groups = await pool.query(
    "select users.user_name, groupsanddata.group_name, groupsanddata.user_id, groupsanddata.group_id, joinedgroups.member_id from users left join joinedgroups on users.user_id = joinedgroups.member_id left join groupsanddata on joinedgroups.group_id = groupsanddata.group_id where groupsanddata.group_id = $1",
    [id]
    );
    res.json(groups.rows)
  }catch(err){
  }
});

//LEAVE ROOM
router.delete("/myjoinedrooms/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM joinedgroups WHERE group_id = $1 AND member_id = $2 RETURNING *",
      [id, req.user]
    );

    if (deleteTodo.rows.length === 0) {
      return res.json("This group is not yours");
    }

    res.json("group was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

//SEARCH AND FIND GROUPS INFO ROUTE
router.get('/search', async(req, res) => {
  try{
    const {groupname} = req.query;

    const groups = await pool.query(
    "SELECT * FROM groupsanddata WHERE group_name ILIKE $1",
    [`%${groupname}%`]
    );
    res.json(groups.rows)
  }catch(err){
  
  }
})

//CREATE GROUP ROUTE
router.post("/newgroup", auth, async (req, res) => {
        try {
            const { newDate } = req.body;
            const {group_name} = req.body;
            const {group_description} = req.body;
        //   console.log(req.body);
          const newGroup = await pool.query(
            "INSERT INTO GroupsAndData(user_id, group_name, group_description, date) VALUES ($1, $2, $3, $4) RETURNING *",
            [req.user, group_name, group_description, newDate]
          );
          res.json(newGroup.rows[0]);
        } catch (err) {
          console.error(err.message);
        }
});

//SUBMIT MESSAGE TO GC
router.post("/groupmessages/:id", auth, async (req, res) => {
    try {
      const { id } = req.params;
      const { group_messages, datetime } = req.body;
      const insertGroupMessage = await pool.query(
        "INSERT INTO profiledata(user_id, group_id, group_messages, datetime) VALUES ($1, $2, $3, $4) RETURNING *",
        [req.user, id, group_messages, datetime]
      );
  
      if (insertGroupMessage.rows.length === 0) {
        return res.json("This group is not yours");
      }
  
      res.json("message inserted");
    } catch (err) {
      console.error(err.message);
    }
  });


//GET GROUPS AND THEIR MESSAGES
router.get("/groupmessages/:id", async(req, res) => {
    try {
      const { id } = req.params;
      const allGroupMessages = await pool.query(
        "SELECT user_id, group_id, group_messages, datetime FROM profiledata WHERE group_id = $1",
        [id]
      );
      if (allGroupMessages.rows.length === 0) {
        return res.json("chat has no messages");
      };
      res.json(allGroupMessages.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
//ALL DATA
  router.get("/allgroupdata/:id", auth, async(req, res) => {
    try{
        const { id } = req.params;
    const user = await pool.query(
    "SELECT profiledata.message_id, users.user_id, users.user_name, profiledata.group_id, profiledata.group_messages, profiledata.datetime FROM users LEFT JOIN profiledata ON users.user_id = profiledata.user_id WHERE group_id = $1",
 [id]
     );
    //was [0]
    res.json(user.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
        }
    });
    // "SELECT users.user_id, users.user_name, profiledata.group_id, profiledata.group_messages FROM users LEFT JOIN profiledata ON users.user_id = profiledata.user_id WHERE users.user_id = $1 AND group_id = $2",

//GET EVERY GROUP
router.get("/everygroup", async(req, res) => {
    try{
    const user = await pool.query(
        "SELECT group_name from GroupsAndMessages"
     );
    //was [0]
    res.json(user.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
        }
    });

//DELETE GROUPS
router.delete("/mygroups/:id", auth, async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await pool.query(
        "DELETE FROM groupsanddata WHERE group_id = $1 AND user_id = $2 RETURNING *",
        [id, req.user]
      );
  
      if (deleteTodo.rows.length === 0) {
        return res.json("This group is not yours");
      }
  
      res.json("group was deleted");
    } catch (err) {
      console.error(err.message);
    }
  });

 // "SELECT users.user_name, groups.group_id, groups.group_name FROM users LEFT JOIN groups ON users.user_id = groups.user_id WHERE users.user_id = $1",

//GET GROUPS FROM SPECIFIC USER
router.get("/mygroups", auth, async(req, res) => {
    try{
    const user = await pool.query(
        // "SELECT users.user_id, users.user_name, profiledata.group_id, profiledata.group_messages FROM users LEFT JOIN profiledata ON users.user_id = profiledata.user_id WHERE users.user_id = $1",
        // "SELECT users.user_name, groups.group_id, groups.group_name FROM users LEFT JOIN groups ON users.user_id = groups.user_id WHERE users.user_id = $1",

        "SELECT users.user_name, groupsanddata.group_id, groupsanddata.group_name, groupsanddata.group_description FROM users LEFT JOIN groupsanddata ON users.user_id = groupsanddata.user_id WHERE users.user_id = $1",
    [req.user]
     );
    //was [0]
    res.json(user.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
        }
    });

//GROUP 
    router.get("/groupdata/:id", auth,  async(req, res) => {
        try{
        // res.json(req.user);
        const { id } = req.params;
        const user = await pool.query(
            "SELECT users.user_name, groupsanddata.user_id, groupsanddata.group_name, groupsanddata.date, groupsanddata.group_id, group_description FROM users left join groupsanddata on users.user_id = groupsanddata.user_id where group_id = $1", 
              [id]
              // const user = await pool.query("SELECT users.user_name, groups.group_id, groups.group_name FROM users LEFT JOIN groups ON users.user_id = groups.user_id "
        );
        res.json(user.rows)
        }catch(err) {
            console.log(err);
        }
      });

module.exports = router;