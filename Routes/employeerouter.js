const express = require("express");

const router = express.Router();

const {
  create,
  list,
  update,
  remove,
  findone,
  depart
 
} = require("../Controller/crud");


router.post("/create",create);
router.get("/employeelist", list);
router.put("/update/:name", update);
router.delete("/delete/:employeename",remove);
router.get("/employee/:employeename",findone);
router.get("/:department",depart)



module.exports = router;