const router = require("express").Router();
const pool = require('./db');
const express = require("express");
const bcrypt = require('bcrypt');
const jwtGenerator = require("./jwtGenerator");
const validInfo = require("./validinfo")
const auth = require('./auth')
// const app = express();
const cors = require('cors');


router.use(cors());
router.use(express.json());

//REGISTER ROUTE
router.post("/register",validInfo, async(req, res) => {
try{
    const { name, email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", 
    [email]);
    if(user.rows.length !== 0){
        return res.status(401).send("user alread exist")
    }

    const saltRound  = 10;
    const salt = await bcrypt.genSalt
    (saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
        "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, bcryptPassword]
    );

    //generate web token
    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });
    console.log(token);

}catch(err){
    console.error(err.message);
  }
});

//LOGIN ROUTE 
router.post("/login",validInfo, async(req, res) => {
    try{
        const { email, password } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1",
        [email]);
        
        if(user.rows.length === 0){
            return res.status(401).json("password or email incorrect");
        } 

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
        if (!validPassword){
            return res.status(401).json('password or email incorrect');
        }

        const token = jwtGenerator(user.rows[0].user_id);
        res.json({ token });

    }catch(err){
        console.error(err.message);
        res.status(500).send("server error")
    }
});

//VERIFY JWT
router.post('/verify', auth, async(req, res) => {
    try{
        res.json(true);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;