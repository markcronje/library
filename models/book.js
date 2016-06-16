var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Book = new Schema({
    title: { type: String },
    author: { type: String },
    plot: { type: String },
    year: { type: Number }
});

module.exports = mongoose.model('Book', Book);