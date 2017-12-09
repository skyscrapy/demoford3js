/**
 * Created by William on 11/2/17.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('AgeRecord', {
    age : {
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
        default: Date.now
    }
});/**
 * Created by William on 11/2/17.
 */
