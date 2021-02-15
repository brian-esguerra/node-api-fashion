var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const saltRounds = 10;
// JWT
const JWT_SIGNIN_KEY = 'keysignin123';
const JWT_SIGNUP_KEY = 'keysignup123';
// Google API Client ID
const GOOGLE_API_CLIENT = "646745966934-19dt9hbdaerg6v19a7d0tc8q39v3n9d1.apps.googleusercontent.com"
// Client OAUTH2
const client = new OAuth2Client(GOOGLE_API_CLIENT);

// model
const modelUser = require('../models/User');

/**
 * @module api-Auth
*/

/**
 * @path: auth/
 * @method: GET
 * @param: 
 * @return: test 
*/
router.get('/', async(req, res, next) => {
  res.send("auto init");
});

/**
 * @path: auth/singup
 * @method: POST
 * @param: { email, password, name, oferts, address}
 * @return: { token, user }: json
 * @desc: register
*/
router.post('/signup', async(req, res) => {
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
        // token
        const token = jwt.sign(data_user, JWT_SIGNUP_KEY, {expiresIn: '1d'});
        res.json({
          token,
          user: dataUser
        });
      } else {
        res.status(200).send({ error: true, message: 'Registro incompleto error en BD' });  
      }
    }
  }
});

/**
 * @path: auth/singin
 * @method: POST
 * @param: { email, password }
 * @return: { token, user }: json
 * @desc: login
*/
router.post('/signin', async(req, res) => {
  const {email, password } = req.body;

  // validate params
  if (!email || !password) {
    res.status(200).send({ error: true, message: 'Datos incompletos' });
  } else {
    // search user
    const user = await modelUser.findOne({email});
    console.log(user);
    if (!user) { 
      res.status(200).send({ error: true, message: 'No existe el usuario' });
    } else {
      // validate password
      if (bcrypt.compareSync(password, user.password)){
        // token
        const token = jwt.sign({_id: user._id}, JWT_SIGNIN_KEY, {expiresIn: '1d'});
        // ok return user + token
        res.json({
          token,
          user
        });
      } else {
        res.status(200).send({ error: true, message: 'Datos de sessión incorrectos' });
      }
    }
  }
  
});

/**
 * @path: auth/googlelogin
 * @method: POST
 * @param: { tokenID }
 * @return: { token, user }: json
 * @desc: login - google
*/
router.post('/googlelogin', async(req, res) => {
  const { tokenId } = req.body;

  client.verifyIdToken({ idToken: tokenId, audience: GOOGLE_API_CLIENT }).then(async(response) => {
    const { email_verified, name, email } = response.payload;
    console.log("verify token", response.payload);
    if (email_verified) {
      // search user
      const user = await modelUser.findOne({email});
      console.log(user);
      if (!user) { 
        // no exist - create account
        let password = email+JWT_SIGNIN_KEY;
        // save model
        const newUser = new modelUser({email, name, password });
        // save data
        let result = await newUser.save();
        if (result) {
          // search data
          const dataUser = await modelUser.findById(newUser._id);
          // token
          const token = jwt.sign({_id: dataUser._id}, JWT_SIGNUP_KEY, {expiresIn: '1d'});
          res.json({
            token,
            user: dataUser
          });
        } else {
          res.status(200).send({ error: true, message: 'Registro incompleto error en BD' });  
        }
      } else { 
        // exist account
        // generate token
        const token = jwt.sign({_id: user._id}, JWT_SIGNIN_KEY, {expiresIn: '1d'});
        // ok return user + token
        res.json({
          token,
          user
        });
      }
    } else {
      res.status(200).send({ error: true, message: 'Verificación incorrecta' });
    } // end 
  });
});

module.exports = router;