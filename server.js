var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname;
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});


router.get("/",function(req,res){
  res.sendFile(path + "/outputNew.html");
});

app.use("/",router);

app.listen(3001,function(){
  console.log("Live at Port 3001");
});