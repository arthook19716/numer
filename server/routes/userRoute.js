var express = require('express');
var router = express.Router();


let Bisection = require('../models/Bisection');
let FalsePosition = require('../models/FalsePosition');
let Onepoint = require('../models/Onepoint');
let Newton = require('../models/Newton');

/* GET users listing. */

/////////////////////////////////////////////////////////////

/*----------------- Bisection-------------------------*/
router.get('/showBisection', function(req, res, next) {
 
  Bisection.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/addBisection',(req,res)=>{
  console.log(req.body);
  let doc = new Bisection(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

/*-------------------------False-Position----------------------*/

router.get('/showFalsePosition', function(req, res, next) {
 
   FalsePosition.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/addFalsePosition',(req,res)=>{
  console.log(req.body);
  let doc = new FalsePosition(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})


/*------------------One-point----------------------------*/
router.get('/showOnepoint', function(req, res, next) {
 
  Onepoint.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/addOnepoint',(req,res)=>{
  console.log(req.body);
  let doc = new Onepoint(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

/*--------------------Newton-------------------------*/
router.get('/showNewton', function(req, res, next) {
 
  Newton.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/addNewton',(req,res)=>{
  console.log(req.body);
  let doc = new Newton(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

/////////////////////////////////////////////////////////////

module.exports = router;
