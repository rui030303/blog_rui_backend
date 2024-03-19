import mysql from "mysql2"

// const db = mysql.createConnection(
//     {
//         host:"localhost",
//         user:"root",
//         password:"MYsql1998!",
//         database:"blog_fullstack"
//     }
// )
const db = mysql.createConnection(
    {
        host:"database-1.c1cmokc649lv.ap-southeast-2.rds.amazonaws.com",
        user:"admin",
        password:"951753123",
        database:"blog_fullstack"
    }
)
export default db