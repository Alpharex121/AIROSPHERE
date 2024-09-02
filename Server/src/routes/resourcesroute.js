const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

//GET Resource
router.get("/",  auth, async (req, res) => {
    try{
        const resource = await Resource.findById(req.resource._id);
        res.send(resource);
    }
    catch(error){
        res.status(500).send(error.message);
    }
});

//ADD Resource
router.post("/", auth, async (req, res) => {
    try{
        const resource = new Resource(req.body);
        await resource.save();
        res.send(resource);
    }
    catch(error){
        res.status(500).send(error.message);
    }
});



//DELETE Resource
router.delete("/", auth, async (req, res) => {
    try{
        const resource = await Resource.findByIdAndDelete(req.resource._id);
        res.send(resource);
    }
    catch(error){
        res.status(500).send(error.message);
    }
});

module.exports = router;
