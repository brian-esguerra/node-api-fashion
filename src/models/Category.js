const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Model Category
 * @class category
 * @param {Object} category
 * @param {String} category.name - name
 * @param {String} category.description - description (Optional)
 * @param {String} category.image - url image (Optional)
 * @param {String} category.alias - alias
 * @param {String} category.active - status (1:active, 0:disable)
 */

const CategoryShema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  image: { type: String, required: false },
  alias: { type: String, required: true },
  active: { type: Boolean, required: true },
});

module.exports = mongoose.model('Category', CategoryShema);
