import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "backend",
  })
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));

  // schema 
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

const app = express();

// Using Middlewares
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Setting up View Engine
app.set("view engine", "ejs");

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const decoded = jwt.verify(token, "sdjasdbajsdbjasd");

    req.user = await User.findById(decoded._id);

    next();
  } else {
    res.redirect("/login");
  }
};

app.get("/", isAuthenticated, (req, res) => {
  res.render("logout", { name: req.user.name });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user) return res.redirect("/register");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res.render("login", { email, message: "Incorrect Password" });

  const token = jwt.sign({ _id: user._id }, "sdjasdbajsdbjasd");

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return res.redirect("/login");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ _id: user._id }, "sdjasdbajsdbjasd");

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});

app.get("/logout", (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});

app.listen(5000, () => {
  console.log("Server is working");
});
/* app.get("/", (req, res) => {
    //const pathlocation = path.resolve();

    res.render("index", {name:"Vanshika"});

    //res.sendFile("index")
})
 */
/* 
app.get("/login", (req, res) => {
    res.render("login");
  });

app.get("/success", (req, res) => {
    
    res.render("success");
})

app.get("/add", (req, res) => {
    
    res.send("success");
})

app.post("/contact", (req, res) => {
    //console.log(req.body.name);

    users.push({username: req.body.name, email: req.use.email});

    res.redirect("/success")
})

app.get("/users", (req, res) => {
    
    res.json({
        users,
    });
})

app.listen(5000, () => {
    console.log("server working");
})
 */

/* console.log("Hel!O"); //node i[tab] and i need to repeat this
//nodemon dependency
const http = require("http");
const { genRandom } = require("./features");
const { readFile } = require("fs");
//console.log(http);
const server = http.createServer((req, res) => {
    console.log(req.url)
})

fs.readFile()
console.log(genRandom());
server.listen(5000, () => {
    console.log("Server working")
}) */