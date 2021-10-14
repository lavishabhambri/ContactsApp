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

// {
//     "contact_username": "Lavisha",
//     "contact_email": "bhambrilavisha@gmail.com",
//     "contact_number": "1234456",
//     "contact_favourite":"true",
//     "postedBy":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGVmMmNlNjcwNjdmOTI0NGRkOGViMmUiLCJpYXQiOjE2MjYyODc2MDZ9.ejEy-tB2QtEDcJ9CFijvTeAOs7pk3jRJ992f3tHYT_M"
// }

module.exports = mongoose.model('Contact', Contact);


