import db from "../db.js"
import bcrypt from "bcryptjs" 
import jwt from "jsonwebtoken"

const register = (req, res) => {
    // 查询数据库检查用户是否存在
    const query = "SELECT * FROM users WHERE email = ? OR username = ?";
    db.query(query, [req.body.email, req.body.username], (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (data.length > 0) {
            return res.status(409).json("User already exists!");
        }
        
        // 用户不存在，继续注册流程
        // 使用bcryptjs哈希密码
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        // 插入新用户
        const insertQuery = "INSERT INTO users(username, email, password) VALUES (?, ?, ?)";
        const values = [req.body.username, req.body.email, hash];

        db.query(insertQuery, values, (err, data) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.status(200).json("Successfully registered");
        });
    });
};


const login = (req, res)=>{
    const checkUserName = "SELECT * FROM users WHERE username = ?"
    db.query(checkUserName, [req.body.username], (err, data)=>{
        if (err){
            return res.status(500).json("Internal Server Error")
        }
        if(data.length == 0){
            return res.status(404).json("User not found")
        }

        if (!bcrypt.compareSync(req.body.password,data[0].password)){
            return res.status(400).json("Wrong username or password")
        }else{
            const token = jwt.sign({id:data[0].id}, "jwt_key")
            const {password, ...other} = data[0]
            res.cookie("access_token", token, {
                // httpOnly:true

            }).status(200).json(other)
            
        }
    })
}
const logout = (req, res)=>{
    res.clearCookie("access_token", {
        sameSite:"none", 
        secure:true
    }).status(200).json("logout successful")
}

export {register, login, logout}