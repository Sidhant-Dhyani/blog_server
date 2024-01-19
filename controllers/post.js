const PostsModel = require('../models/Post');
const getPosts = async (req, res) => {
    try {
        const { tag } = req.query;
        let filteredPosts;
        if (!tag) {
            filteredPosts = await PostsModel.find();
        } else {
            filteredPosts = await PostsModel.aggregate([
                {
                    $match:
                    {
                        tags: {
                            $in: [tag],
                        },
                    },
                },
            ])
        }
        res.status(200).json(filteredPosts);
    } catch (error) {
        res.status(500).json(error.message);
    }

}

const getOne = async (req, res) => {
    try {
        const post = await PostsModel.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

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
                                $options: "i",
                            },
                        },
                        {
                            desc: {
                                $regex: keyword,
                                $options: "i",
                            },
                        },
                    ],
                },
            },
        ])
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getPosts, getOne, searchPosts };

// let sort;

// if (req.query.sort === "asc") {
//     sort = { title: 1 }; // Sorting posts alphabetically by title in ascending order
// } else if (req.query.sort === "desc") {
//     sort = { title: -1 }; // Sorting posts alphabetically by title in descending order
// }
