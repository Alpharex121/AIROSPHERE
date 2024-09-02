const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");



//club notification
router.get("/", auth, async (req, res) => {
    try{
        const club = await Club.findById(req.club._id);
        res.send(club.notifications);
    }
    catch(error){
        console.log(error);
        res.status(400).send(error);
    }
});




//club events
router.get("/", auth, async (req, res) => {
    try{
        const club = await Club.findById(req.club._id);
        res.send(club.events);
    }
    catch(error){
        console.log(error);
        res.status(400).send(error);
    }
});

//club addMember
router.post("/:username", auth, async (req, res) => {
    try{
        const club = await Club.findById(req.club._id);
        club.members.push(req.params.username);
        await club.save();
        res.send(club);
    }
    catch(error){
        console.log(error);
        res.status(400).send(error);
    }
});

// club deleteMember
router.delete("/:username", auth, async (req, res) => {
    try{
        const club = await Club.findById(req.club._id);
        club.members = club.members.filter((member) => member !== req.params.username);
        await club.save();
        res.send(club);
    }
    catch(error){
        console.log(error);
        res.status(400).send(error);
    }
});



module.exports = router;
