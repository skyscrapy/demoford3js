/**
 * Created by William on 11/2/17.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('GenderRecord', {
    gender : {
        type : String,
        required : true,
        default : ''
    },
    group : {
        type : Number,
        required : true,
        default : 1
    },
    createDate : {
        type: Date,
        default : Date.now
    }
});