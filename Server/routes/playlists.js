const router = require('express').Router();
const Joi = require('joi');

const { Playlist, validate } = require("../models/playlist.js");
const { Song } = require("../models/song.js");
const { User } = require("../models/user.js");
const auth = require("../middleware/auth.js")
const validObjectId = require("../middleware/validObjectId.js");


// create playlist

router.post("/", auth, async (req,res) => {
    const {error} = validate(req.body);
    if (error)
        return res.status(400).send({ message: error.details[0].message});

    const user = await User.findById(req.user._id);
    const playlist = await Playlist({ ...req.body, user: user._id }).save();
    user.playlists.push(playlist._id);
    await user.save();

    res.status(201).send({ data: playlist });
})

// edit playlist

router.put("/edit/:id", [validObjectId, auth], async(req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        desc: Joi.string().allow(""),
        img: Joi.string().allow("")
    });

    const {error} = schema.validate(req.body);
    if (error)
        return res.status(400).send({ message: error.details[0].message});

    const playlist = await Playlist.findById(req.params.id);

    if(!playlist) 
        return res.status(404).send({ message: "Playlist not found."});
    
    const user = await User.findById(req.user._id);
    if(!user._id.equals(playlist.user))
        return res.status(403).send({ mesaage: "User dont have access to edit this playlist."})

    playlist.name = req.body.name;
    playlist.desc = req.body.desc;
    playlist.img = req.body.img;

    await playlist.save();

    res.status(200).send({ message: "Playlist updated successfully."})
})

// add songs to playlist

router.put("/add-song", auth, async (req, res) => {
    const schema = Joi.object({
        playlistId: Joi.string().required(),
        songId: Joi.string().required()
    });

    const {error} = schema.validate(req.body);
    if (error)
        return res.status(400).send({ message: error.details[0].message });

    const user = await User.findById(req.user._id);
    const playlist = await Playlist.findById(req.body.playlistId);

    if(!user._id.equals(playlist.user))
        return res.status(403).send({ message: "User dont have the acess to add songs to this playlist."});

    if (playlist.songs.indexOf(req.body.songId) === -1) {
        playlist.songs.push(req.body.songId)
    }
    await playlist.save();
    res.status(200).send({ data: playlist, message: "Song added successfully to the playlist."})
})

// remove song from playlist

router.put("/remove-song", auth, async(req,res) => {
    const schema = Joi.object({
        playlistId: Joi.string().required(),
        songId: Joi.string().required()
    });

    const {error} = schema.validate(req.body);
    if (error)
        return res.status(400).send({ message: error.details[0].message });

    const user = await User.findById(req.user._id);
    const playlist = await Playlist.findById(req.body.playlistId);

    if(!user._id.equals(playlist.user))
        return res.status(403).send({ message: "User dont have the acess to remove songs from this playlist."});

    const index = playlist.songs.indexOf(req.body.songId);
    playlist.songs.splice(index, 1);
    await playlist.save();
    res.status(200).send({ data: playlist, message: " Removed from the playlist"})
});

// user fav playlist

router.get("/favourite", auth, async(req, res) => {
    const user = await User.findById(req.user._id);
    const playlists = await Playlist.find({ _id: user.playlists});
    
    res.status(200).send({ data: playlists});    
})

// get random playlist

router.get("/random", auth, async (req, res) => {
    
    const playlists = await Playlist.aggregate([{ $sample: {size: 10} }]);
    res.status(200).send({ data: playlists});
})

// get playlist by id and song

router.get("/:id", [validObjectId, auth], async(req, res) => {

    const playlist = await Playlist.findById(req.params.id);
    if (!playlist)
        return res.status(404).send({message: "not found"});

    const songs = await Song.find({ _id: playlist.songs });
    res.status(200).send({ data: {playlist, songs}});
})

// get all playlist

router.get("/", auth, async(req, res) => {
    const playlists = await Playlist.find();
    res.status(200).send({ data: playlists});
})

// delete playlist by id

router.delete("/:id", [validObjectId, auth], async (req, res) => {
    const user = await User.findById(req.user._id);
    const playlist = await Playlist.findById(req.params.id);

    if(!user._id.equals(playlist.user))
        return res.status(403).send({ message: "User dont have the acess to delete."});

    const index = user.playlists.indexOf(req.params.id);
    user.playlists.splice(index, 1);

    await user.save();
    // await playlist.remove;
    await playlist.deleteOne();
    // await playlist.save();

    res.status(200).send({ message: "Playlist removed from library."})
})
module.exports = router;