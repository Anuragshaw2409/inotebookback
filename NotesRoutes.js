const express = require('express');
const router = express.Router();
const fetchuser = require('../middlewares/fetchuser');
const Notes = require('../Models/Notes')


// --------------------------Fetch All Notes ---------------------

router.get('/fetchallnotes',fetchuser, async(req, res) => {
    const notes = await Notes.find({user: req.user});
    return res.status(200).json({notes});
    
       
})



// _-------------------------- Add Note ----------------------


router.post('/addnote', fetchuser, async(req,res)=>{


    try {
        const addedNote =await Notes.create({
            "user": req.user,
            "title": req.body.title,
            "description" : req.body.description,
            "tag": req.body.tag
        })

        return res.status(200).json({"Note added":"true"});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({"error": "Internal server error"});
    }
    



});


// -----------------------------------Edit Notes----------------------------------------------


router.put('/editnote/:id',fetchuser, async(req,res)=>{

    try {
        
        const findNote =await  Notes.findById(req.params.id);
        if(!findNote){
           return res.status(404).json({"error": "Note not found"});
    
        }
    
        const editnote = await Notes.findByIdAndUpdate(req.params.id, {
            "title":req.body.title,
            "description":req.body.description,
            "tag":req.body.tag,
    
        })
        return res.status(200).json({"Note updated":"true"});

        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({"error": "Internal server error"});
        
    }



});

// ------------------------------------------Delete Note --------------------------------------

router.delete('/deletenote/:id',fetchuser, async(req,res)=>{

    try {
        
        const findNote =await  Notes.findById(req.params.id);
        if(!findNote){
           return res.status(404).json({"error": "Note not found"});
    
        }
        console.log(findNote.user.toString(),",",req.user);
        if(findNote.user.toString()!==req.user){
            return res.status(401).json({"error": "Not permitted"});
        }
    
        const deletedNote = await Notes.findByIdAndDelete(req.params.id);

        res.status(200).json({"deleted note": deletedNote});

       
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({"error": "Internal server error"});
        
    }



});




module.exports = router;