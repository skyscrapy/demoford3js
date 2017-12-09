/**
 * Created by William on 10/29/17.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('DiseaseRecord', {
    name : {
        type : String,
        required: true,
        default: ''
    },
    icd : {
        type: String,
        required: true,
        default: ''
    },
    patientId : {
        type: String,
        required: true,
        default: ''
    },
    time : {
        type: Date,
    },
    createTime : {
        type: Date,
        default: Date.now
    }
});