const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: String },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    author: { type: String, required: true }
});
postSchema.index({ title: 'text', desc: 'text' });
const Post = mongoose.model('Post', postSchema);

module.exports = Post;