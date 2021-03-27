const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const { check } = require('express-validator');


const Courier = require("../models/courier");

router.post('/', checkAuth,(req, res, next) => {

    const courier = new Courier(
        {
            _id: new mongoose.Types.ObjectId(),
            studentEmail: req.body.studentEmail,
            studentName: req.body.studentName,
        }

    );

    courier.save()
    .then(result =>{
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    });

    res.status(201).json({
        message: "handling post requests",
        createdcourier: courier
    });
    
    


});



router.get('/user',[check('email').isEmail().normalizeEmail()], checkAuth, (req, res,next) => {
  
  const email = sanitizer.value(req.body.email,String);

  Courier.find({studentEmail: email})
  .exec()
  .then(doc =>{
    res.status(200).json(doc);
  }
  )
  .catch(err => {
    console.log(err);
  }
  );

});




module.exports = router;