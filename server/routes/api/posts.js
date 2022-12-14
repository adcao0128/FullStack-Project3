const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});
//Add Post

router.post('/', async (req, res) =>{
    const posts = await loadPostsCollection();
    await posts.insertOne({
        song: req.body.song,
        artist: req.body.artist,
        album: req.body.album,
        createdAt: new Date()
    });
    res.status(201).send();
});

//Delete Post

router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne( {_id: new mongodb.ObjectId(req.params.id)} );
    res.status(200).send({});
});

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://adc135:adc135@cluster0.mvhe2xi.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('Cluster0').collection('posts');
}

module.exports = router;