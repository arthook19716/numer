let mongoose = require('mongoose');

//Schema Validation

let userSchema5 = mongoose.Schema({
    fx : {type: String ,required : true },
    a : {type: Number ,required : true}
});

let Onepoint = mongoose.model('onepoint',userSchema5);
module.exports = Onepoint;
