const express = require("express")
const Router = require("./app");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/api/v1", Router);


app.listen(5000, ()=>{
    console.log("Server listening on port 5000")
})
