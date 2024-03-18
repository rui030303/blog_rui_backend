import express from "express"
import postsRouter from "./route/posts.js"
import authRouter from "./route/auth.js"
import usersRouter from "./route/users.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import multer from "multer"

const app = express()

app.use(express.json())
app.use(cookieParser())
const corsOptions = {
    origin: 'http://localhost:5173', // 允许这个域的跨源请求
    credentials: true, // 允许发送凭证
  };
  
app.use(cors(corsOptions));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../blog/public/uploads")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), function(req,res){
    const file = req.file;
    res.status(200).json(file?.filename);
    console.log(req.file.filename);
})


app.get('/', (req,res)=>{
    res.json("hello")
})

app.use("/", postsRouter)
app.use("/", usersRouter)
app.use("/", authRouter)

app.listen(process.env.PORT || 3000, (req, res)=>{
    console.log("Backend successfullly start");
})