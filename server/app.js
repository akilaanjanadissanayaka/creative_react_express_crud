const Router = require("express").Router();
const vehiclesRouter = require("./routes/vehicles");


Router.use("/vehicles", vehiclesRouter);
module.exports = Router;