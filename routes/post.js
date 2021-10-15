const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const Contact =  mongoose.model("Contact")

router.post('/createcontact',requireLogin,(req,res)=>{
    const {contact_username, contact_email, contact_number, contact_favourite, pic} = req.body 
    if(!contact_username || !contact_email || !contact_number || !pic){
      return  res.status(422).json({error:"Please add all the fields"})
    }
    req.user.password = undefined
    const contact = new Contact({
        contact_username,
        contact_email,
        contact_number,
        contact_favourite,
        photo:pic,
        postedBy:req.user
    })
    contact.save().then(result=>{
        res.json({contact:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/:id', (req, res)=> {
    let id = req.params.id;
    Contact.findById(id, function(err, contact) {
        res.json(contact);
    });
});


router.post('/mycontacts',requireLogin,(req,res)=>{
    Contact.find({postedBy:req.user._id})
    .populate("postedBy")
    .then((contact)=>{
        res.json({contact})
    }).catch(err=>{
        console.log(err)
    })
});

router.post('/updatecontact/:id',(req,res)=>{
    Contact.findById(req.params.id, function(err, contact) {
        console.log("Contact", contact)
        if (!contact)
        return res.status(200).json({error:"Contact is not found!"})
        else
            contact.contact_username = req.body.contact_username;
            contact.contact_email = req.body.contact_email;
            contact.contact_number = req.body.contact_number;
            contact.contact_favourite = req.body.contact_favourite;
            contact.photo = req.body.pic;

            contact.save().then(contact => {
                return res.status(200).json({message:"Succesfully updated contact!"})
            })
            .catch(err => {
                return res.status(422).json({error:"Cannot Update contact!"})
            });
    });
})


router.delete('/deletecontact/:id', (req,res)=>{
    Contact.findByIdAndDelete(req.params.id, function(err){
        if(err)
            return res.status(422).json({error:"Cannot delete contact!"})
    }).then(result=>{
        return res.status(200).json({message:"Succesfully deleted contact!"})
    })
})



module.exports = router