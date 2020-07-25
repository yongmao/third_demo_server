const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index", {});
});

router.get("/admin", function (req, res, next) {
  res.render("admin", {});
});

router.post("/call", function (req, res, next) {
  res.send(require('../work/call/index')(req.body,req.query));
});

router.post("/webcall", async function (req, res, next) {
  let {name,data} = req.body;
  if(name){
    res.send(await require(`../work/${name}/index`)(data));
  }
  else{
      res.send(404);
  }
});
 
module.exports = router;
