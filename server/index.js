const express = require("express");
const app = express();
const cors = require('cors');
const pool = require('./db');
// const { process_params } = require("express/lib/router");
app.use("/auth", require("./jwtAuth"));
app.use("/dashboard", require("./dashboard"));
app.use("/group", require("./gcRoute"));
app.use("/profile", require("./profileRoutes"));
//MIDWARE
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  

// app.get('/auth/register', async(req, res) => {
//         try{
//             const allInfo = await pool.query("SELECT * FROM users");
//             res.json(allInfo.rows)
//         }catch(err){
//             console.log(err.message)
//         }
//     });

app.post("/register", async(req, res) => {
    try{
        const { name, email, password } = req.body;
    
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1,", 
        [email]);
        res.json(user.rows);
    }catch(err){
    
    }
    });


// // MAKE NEW NAME
// app.post("/nameinfo", async(req, res) => {
//     try{
//         const { name } = req.body;
//         const newName = await pool.query(
//         "INSERT INTO info (name) VALUES ($1) RETURNING *",
//          [name]
//          );

//          res.json(newName.rows[0]);
//     } catch(err){
//         console.log(err.message)
//     }
// });

// //GET ALL NAMES
// app.get('/nameinfo', async(req, res) => {
//     try{
//         const allNames = await pool.query("SELECT * FROM info");
//         res.json(allNames.rows)
//     }catch(err){
//         console.log(err.message)
//     }
// });

// // GET NAME 
// app.get('/nameinfo/:id', async(req, res) => {
// try{
//     const { id } = req.params;
//     const name = await pool.query("SELECT * FROM info WHERE id = ($1)"
//     ,[id] )
//     res.json(name.rows[0])
// }catch(err){
//     console.log(err.message)
// }
// });

// //UPDATE NAME 
// app.put("/nameinfo/:id", async(req, res) => {
// try{
//     const { id } = req.params;
//     const { name } = req.body;
//     const updateName = await pool.query("UPDATE info SET name = $1 WHERE id = $2",
//     [name, id]
//     );

//     res.json('name was update')
// }catch(err){
//     console.log(err.message)
// }
// });

// //DELETE NAME
// app.delete("/nameinfo/:id", async(req, res) =>{
// try{
//     const { id } = req.params;
//     const deleteName = await pool.query("DELETE FROM info WHERE id = $1", 
//     [id]);

//     res.json("name wad deleted")
// }catch(err){
//     console.log(err.message)
// }
// });

//SEVER
app.listen(8080, () => {
    console.log('server started')
})




// const express = require("express");
// const app = express();
// const cors = require('cors');
// const pool = require('./db');
// // const { process_params } = require("express/lib/router");

// //MIDWARE
// app.use(cors());
// app.use(express.json());

// //MAKE NEW NAME
// app.post("/nameinfo", async(req, res) => {
//     try{
//         const { name } = req.body;
//         const newName = await pool.query(
//         "INSERT INTO info (name) VALUES ($1) RETURNING *",
//          [name]
//          );

//          res.json(newName.rows[0]);
//     } catch(err){
//         console.log(err.message)
//     }
// });

// //GET ALL NAMES
// app.get('/nameinfo', async(req, res) => {
//     try{
//         const allNames = await pool.query("SELECT * FROM info");
//         res.json(allNames.rows)
//     }catch(err){
//         console.log(err.message)
//     }
// });

// //GET NAME 
// app.get('/nameinfo/:id', async(req, res) => {
// try{
//     const { id } = req.params;
//     const name = await pool.query("SELECT * FROM info WHERE id = ($1)"
//     ,[id] )
//     res.json(name.rows[0])
// }catch(err){
//     console.log(err.message)
// }
// });

// //UPDATE NAME 
// app.put("/nameinfo/:id", async(req, res) => {
// try{
//     const { id } = req.params;
//     const { name } = req.body;
//     const updateName = await pool.query("UPDATE info SET name = $1 WHERE id = $2",
//     [name, id]
//     );

//     res.json('name was update')
// }catch(err){
//     console.log(err.message)
// }
// });

// //DELETE NAME
// app.delete("/nameinfo/:id", async(req, res) =>{
// try{
//     const { id } = req.params;
//     const deleteName = await pool.query("DELETE FROM info WHERE id = $1", 
//     [id]);

//     res.json("name wad deleted")
// }catch(err){
//     console.log(err.message)
// }
// });

// //SEVER
// app.listen(8080, () => {
//     console.log('server started')
// })