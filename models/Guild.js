const { Schema, model } =  require('mongoose');
//Create a Schema
const Guild = Schema({
    id: String,
});

module.exports = model('Guild', Guild);