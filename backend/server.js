import express from "express"
import router from "./routes/users.js";
import mongoose from "mongoose";
import loginRouter from "./routes/login.js"
import cors from "cors"

const port = 5050;

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/epicode")
    .then(() => {console.log("db connected")})
    .catch(error => console.log(error))


app.use(express.json())

app.use(cors());

app.use("/", loginRouter);

app.use("/users", router)

app.listen(port, () => {
    console.log("server running on port: " + port)
})