var express = require('express');
var router = express.Router();

// model
const modelCat = require('../models/Category');

/**
 * @module api-categoreis
*/

/**
 * @path: categories/
 * @method: GET
 * @param: 
 * @return: list categories:json 
*/
router.get('/', async(req, res, next) => {
  let categories = await modelCat.find().sort({ name: 1 });
  res.json(categories);
});

/**
 * @path: categories/{id}
 * @method: GET
 * @param: 
 * @return: data categories:json 
*/
router.get('/:id', async(req, res, next) => {
  const { id } = req.params;
  let data = await modelCat.findById(id);
  res.json(data);
});

/* ------------------------------------- POST ----------------------------------------------- */

/**
 * @path: categories/
 * @method: POST
 * @param: { name, description, image, alias, active}
 * @return: status(200 OK)
*/
router.post('/', async(req,res, next) => {
  var data_cat = req.body;
  // validate params
  if (!data_cat.name || !data_cat.alias) {
    res.status(200).send({ error: true, message: 'Registro incompleto name/alias' });
  } else {
    // save model
    const newCat = new modelCat(data_cat);
    // verify alias
    const verifyAlias = await modelCat.find({ alias: { $eq : newCat.alias }});
    if (verifyAlias.length > 0) {
      res.status(200).send({ error: true, message: 'Ya se encuentra registrado el alias' });
    } else {
      // save data
      let result = await newCat.save();
      if (result) {
        // search data
        const dataCat = await modelCat.findById(newCat._id);
        res.json(dataCat);
      } else {
        res.status(200).send({ error: true, message: 'Registro incompleto error en BD' });  
      }
    }
  }
});

/* ------------------------------------- PUT ----------------------------------------------- */

/**
 * @path: categories/{id}
 * @method: PUT
 * @param: { name, description, image, alias, active}
 * @return: status(200 OK)
*/
router.put('/:id', async(req,res) => {
  var data_cat = req.body;
  const { id } = req.params;
  if (!id) {
    res.status(200).send({ error: true, message: 'Datos incompletos' });
  } else {
    await modelCat.findByIdAndUpdate(id, data_cat);
    // show data update
    const dataCat = await modelCat.findById(id);
    res.json(dataCat);
  }
});

/* ------------------------------------- DELETE ----------------------------------------------- */

/**
 * @path: categories/{id}
 * @method: DELETE
 * @param:
 * @return: status(200 OK)
*/
router.delete('/:id', async(req,res) => {
  const { id } = req.params;
  if (!id) {
    res.status(200).send({ error: true, message: 'Datos incompletos' });
  } else {
    await modelCat.findByIdAndDelete(id);
    res.status(200).send({ error: false, message: 'Datos eliminados' });
  }
});

module.exports = router;