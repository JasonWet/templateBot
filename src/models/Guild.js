const { Schema, model } =  require('mongoose');
//Create a Schema
const Guild = Schema({
    id: Number,
});

module.exports = model('Guild', Guild);