// implement your posts router here
const Posts = require('./posts-model');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    Posts.find()
    .then(post =>{
        res.status(200).json(post)
    })
    .catch(err =>{
        res.status(500).json(err.message)
    })
})

router.get('/:id', (req, res) =>{
    const {id} = req.params
    Posts.findById(id)
    .then(post =>{
        res.status(200).json(post)
    })
    .catch(err =>{
        res.status(500).json(err.message)
    })
})

router.post('/', (req, res) =>{
    const newPost = req.body
    Posts.insert(newPost)
    .then(post =>{
        res.status(201).json(post)
    })
    .catch(err =>{
        res.status(500).json(err.message)
    })
})

router.put('/:id', (req, res) =>{
    const {id} = req.params
    const updatedPost = req.body
    Posts.update(id, updatedPost)
    .then(post =>{
        res.status(201).json(post)
    })
    .catch(err =>{
        res.status(500).json(err.message)
    })
})

router.delete('/:id', (req, res) =>{
    const {id} = req.params
    Posts.remove(id)
    .then(post =>{
        res.status(201).json(post)
    })
    .catch(err =>{
        res.status(500).json(err.message)
    })
})

module.exports = router;