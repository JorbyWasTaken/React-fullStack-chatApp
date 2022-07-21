const Pool = require('pg').Pool;

//DB CONNECTION
const pool = new Pool({
    user: 'jorby',
    password: 'Minecraft256$',
    host : 'localhost',
    port: 5432,
    database: 'authtodolists'
    // database: 'userauth'
//    database: 'testapi'
});
module.exports = pool;