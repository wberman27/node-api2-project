// implement your posts router here
const Posts = require('./posts-model');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    Posts.find()
    .then(post =>{
        res.status(200).json(post)
    })
    .catch(() =>{
        res.status(500).json({ message: "The posts information could not be retrieved" })
    })
})

router.get('/:id', (req, res) =>{
    const {id} = req.params
    Posts.findById(id)
    .then(post =>{
        if(!post){
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }else{

            res.status(200).json(post)
        }
    })
    .catch(() =>{
        res.status(500).json({ message: "The post with the specified ID does not exist" })
    })
})

router.post('/', (req, res) =>{
    const newPost = req.body
    if((!newPost.title || !newPost.contents)){
        res.status(400).json({ message: "Please provide title and contents for the post" })
    }else{
        Posts.insert(newPost)
        .then(()=>{
            res.status(201).json(newPost)
        })
        .catch(() =>{
            res.status(500).json({ message: "There was an ()or while saving the post to the database" })
        })
    }
})

router.put('/:id', (req, res) =>{
    const {id} = req.params
    const changes = req.body
    if(!changes){
        res.status(404).json({ message: "The post with the specified ID does not exist" })
    }else{
        if(!changes.title || !changes.contents){
            res.status(400).json({ message: "Please provide title and contents for the post" })
        }else{
            Posts.update(id, changes)
            .then(() =>{
                res.status(200).json(id)
            })
            .catch(() =>{
                res.status(500).json({ message: "The post information could not be modified" })
            })
        }
    }
})

router.delete('/:id', (req, res) =>{
    const {id} = req.params
    const deletedPost = req.body
    if(!deletedPost){
        res.status(404).json({ message: "The post with the specified ID does not exist" })
    }else{
        Posts.remove(id)
        .then(()=>{
            res.status(201).json(deletedPost)
        })
        .catch(() =>{
            res.status(500).json({ message: "The post could not be removed" })
        })
    }
})

router.get('/:id/comments', (req, res) =>{
    const postId = req.query.post_id
    const comment = req.body
    if(!comment){
        res.status(404).json({ message: "The post with the specified ID does not exist" })
    }else{
        Posts.findPostComments(postId)
        .then(() =>{
            res.status(200).json(comment)
        })
        .catch(()=>{
            res.status(500).json({ message: "The comments information could not be retrieved" })
        })
    }
})

// router.get('/:id/comments', (req, res) =>{
//     const {id} = req.params

//     Posts.findCommentById(id)
//     .then(post =>{
//         if(!post){
//             res.status(404).json({ message: "The post with the specified ID does not exist" })
//         }else{
            
//             res.status(200).json(post)
//         }
//     })
//     .catch(() =>{
//         res.status(500).json({ message: "The comments information could not be retrieved" })
//     })
// })

module.exports = router;