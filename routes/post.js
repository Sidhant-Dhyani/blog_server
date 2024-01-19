
const express = require('express');
const router = express.Router();

const {
    getPosts, getOne, searchPosts
} = require('../controllers/post.js');

router.get('/all', getPosts); //getting all posts
router.get('/one/:id', getOne); //getting a single post
router.get('/search', searchPosts); //getting search result

module.exports = router;