let mongoose = require('mongoose');

//Schema Validation

let userSchema5 = mongoose.Schema({
    fx : {type: String ,required : true },
    a : {type: Number ,required : true},
    b : {type: Number ,required : true}
});

let FalsePosition = mongoose.model('falseposition',userSchema5);
module.exports = FalsePosition;
