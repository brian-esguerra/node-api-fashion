var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;

// model
const modelUser = require('../models/User');

/**
 * @module api-users
*/

/**
 * @path: users/
 * @method: GET
 * @param: 
 * @return: list users:json 
*/
router.get('/', async(req, res, next) => {
  let users = await modelUser.find();
  res.json(users);
});

/**
 * @path: users/{id}
 * @method: GET
 * @param: 
 * @return: data user:json 
*/
router.get('/:id', async(req, res, next) => {
  const { id } = req.params;
  let data = await modelUser.findById(id);
  res.json(data);
});

/* ------------------------------------- POST ----------------------------------------------- */

/**
 * @path: users/
 * @method: POST
 * @param: { email, password, name, oferts, address}
 * @return: status(200 OK)
*/
router.post('/', async(req,res, next) => {
  var data_user = req.body;
  // validate params
  if (!data_user.email || !data_user.name) {
    res.status(200).send({ error: true, message: 'Registro incompleto email/name' });
  } else {
    // encrypt password
    const hash = bcrypt.hashSync(data_user.password, saltRounds);
    data_user.password = hash;
    // save model
    const newUser = new modelUser(data_user);
    // verify email
    const verifyEmail = await modelUser.find({ email : { $eq : newUser.email }});
    if (verifyEmail.length > 0) {
      res.status(200).send({ error: true, message: 'Ya se encuentra registrado el email' });
    } else {
      // save data
      let result = await newUser.save();
      if (result) {
        // search data
        const dataUser = await modelUser.findById(newUser._id);
        res.json(dataUser);
      } else {
        res.status(200).send({ error: true, message: 'Registro incompleto error en BD' });  
      }
    }
  }
});

/* ------------------------------------- PUT ----------------------------------------------- */

/**
 * @path: users/{id}
 * @method: PUT
 * @param: { email, password, name, oferts, address}
 * @return: status(200 OK)
*/
router.put('/:id', async(req,res) => {
  var data_user = req.body;
  const { id } = req.params;
  if (!id) {
    res.status(200).send({ error: true, message: 'Datos incompletos' });
  } else {
    await modelUser.findByIdAndUpdate(id, data_user);
    // show data update
    const dataUser = await modelUser.findById(id);
    res.json(dataUser);
  }
});

/* ------------------------------------- DELETE ----------------------------------------------- */

/**
 * @path: users/{id}
 * @method: DELETE
 * @param:
 * @return: status(200 OK)
*/
router.delete('/:id', async(req,res) => {
  const { id } = req.params;
  if (!id) {
    res.status(200).send({ error: true, message: 'Datos incompletos' });
  } else {
    await modelUser.findByIdAndDelete(id);
    res.status(200).send({ error: false, message: 'Datos eliminados' });
  }
});

module.exports = router;