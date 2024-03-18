import mysql from "mysql2"

const db = mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"MYsql1998!",
        database:"blog_fullstack"
    }
)

export default db