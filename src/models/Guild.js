const { Schema, model } =  require('mongoose');
//Create a Schema
const Guild = Schema({
   //id within the schema
   //id is logged when the bot joins the guild
   id: String,
});

module.exports = model('Guild', Guild);