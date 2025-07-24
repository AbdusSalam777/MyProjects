const express = require("express");
const pg = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors=require("cors");
const PORT = 3000;
const JWT_SECRET = "1223";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials: true
}))

const db = new pg.Client({
  user: "postgres",
  password: "Postgres123",
  host: "localhost",
  database: "users",
  port: 5432,
});

db.connect();

db.query(`CREATE TABLE IF NOT EXISTS data(
    id SERIAL PRIMARY KEY,
    email VARCHAR(50),
    password VARCHAR(50)
    )
    `);

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userexists = await db.query("SELECT * FROM data WHERE email=$1", [
      email,
    ]);

    if (userexists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists !" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO data (email,password) VALUES($1,$2)", [
      email,
      hashedPassword,
    ]);
    res.status(201).json({ message: "User registered !" });
  } catch (error) {
     console.error("Error in /register:", error);
    res.status(500).json({ message: "Internal server error !" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const alreadyexists = await db.query("SELECT * FROM data WHERE email=$1", [
      email,
    ]);

    if (alreadyexists.rows.length === 0) {
      return res.status(400).json({ message: "Invalid Credentials !" });
    }

    const user = alreadyexists.rows[0];
    const iscorrect = await bcrypt.compare(password, user.password);

    if (!iscorrect) {
      return res.status(400).json({ message: "Invalid Credentials !" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" });

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
      })
      .json({ message: "Logged in !" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error !" });
  }
});

app.get("/verify",(req,res)=>{
  const token = req.cookies.token;

  if(!token){
    return res.json({status:false})
  }

  jwt.verify(token,JWT_SECRET,(error,decoded)=>{
    if(error){
      return res.json({status:false});
    }
    return res.json({status:true})
  })

})

app.get("/logout",(req,res)=>{
  res.clearCookie("token",{
    httpOnly:true,
    sameSite:"lax"
  })
  res.json({message:"Logged out0"})
})
app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});
