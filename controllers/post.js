const PostsModel = require('../models/Post');

// Get all posts or filtered posts based on tags
const getPosts = async (req, res) => {
    try {
        const { tag } = req.query;
        let filteredPosts;

        if (!tag) {
            // If no tag is specified, get all posts
            filteredPosts = await PostsModel.find();
        } else {
            // If tag is specified, use aggregation to filter posts based on the tag
            filteredPosts = await PostsModel.aggregate([
                {
                    $match:
                    {
                        tags: {
                            $in: [tag],
                        },
                    },
                },
            ]);
        }

        res.status(200).json(filteredPosts);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// Get a single post by its ID
const getOne = async (req, res) => {
    try {
        const post = await PostsModel.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// Search posts based on keywords in title or description
const searchPosts = async (req, res) => {
    try {
        const keyword = req.query.keywords;
        const posts = await PostsModel.aggregate([
            {
                $match:
                {
                    $or: [
                        {
                            title: {
                                $regex: keyword,
                                $options: "i", // Case-insensitive search
                            },
                        },
                        {
                            desc: {
                                $regex: keyword,
                                $options: "i", // Case-insensitive search
                            },
                        },
                    ],
                },
            },
        ]);

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getPosts, getOne, searchPosts };
