let mongoose = require('mongoose');

//Schema Validation

let userSchema5 = mongoose.Schema({
    fx : {type: String ,required : true },
    a : {type: Number ,required : true}
});

let Newton = mongoose.model('newton',userSchema5);
module.exports = Newton;
