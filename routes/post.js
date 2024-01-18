
const express = require('express');
const router = express.Router();

const {
    getPosts, getOne, searchPosts
} = require('../controllers/post.js');

router.get('/all', getPosts);
router.get('/one/:id', getOne);
router.get('/search/', searchPosts);

module.exports = router;