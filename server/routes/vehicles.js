const userRouter = require("express").Router();
const { response } = require("express");
const { connection, query } = require("./../helpers/mysql");

userRouter.post("/", async (req, res) => {
 

  const response = await query(
    "INSERT INTO `vahicles` (`vtype`, `vno`, `dimei`, `connection`, `status`, `lupdate`, `level`, `r_data`, `tu_date`) VALUES (?,?,?,?,?,?,?,?,?);",
    [req.body.Dicon,req.body.vno,req.body.imei, req.body.cno, 'active' ,'2023-08-09','ADMIN LEVEL 1',req.body.rdata, req.body.rdata]
  );
  console.log("response", req.body);
  return res.status(200).send({ message: "sucess" });
});

userRouter.get("/", async (req, res) => {
  console.log(req.query.id);
  const response = await query("SELECT * FROM vahicles");
  return res.status(200).send(response);
});

module.exports = userRouter;
