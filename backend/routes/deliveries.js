var express = require('express');
var router = express.Router();
var Joi = require('joi');
var { insertRecord,getAllRecords } = require('./deliveries-db-utils');


router.get('/', async function(req,res,next){
  res.json(await getAllRecords());
});

router.post('/insert', function(req, res, next) {

  const schema = Joi.object({
    email: Joi.string().email(),
    image: Joi.string(),
    payment: Joi.number()
  })

  try {
    const result = schema.validate(req.body);
    console.log(result);
    if (result.error){
      res.status(403).json({ "ERROR": "Invalid Request" })
    }
    insertRecord(result.value);
    res.json(result);
  }
  catch (err) {
    res.json({ "ERROR": "Invalid Request" })
  }
 
});

module.exports = router;
