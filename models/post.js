const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

let Contact = new mongoose.Schema({
    contact_username: {
        type: String
    },
    contact_email: {
        type: String
    },
    contact_number: {
        type: String
    },
    contact_favourite: {
        type: Boolean
    },
    photo:{
        type:String,
        required:true
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
    }
});

module.exports = mongoose.model('Contact', Contact);


