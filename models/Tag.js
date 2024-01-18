const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;


// _id
// 65a8cb433bb782a34a2139cb
// name
// "javascript"

// _id
// 65a8cb433bb782a34a2139cc
// name
// "web-development"

// _id
// 65a8cb433bb782a34a2139cd
// name
// "frontend"

// _id
// 65a8cb433bb782a34a2139ce
// name
// "backend"

// _id
// 65a8cb433bb782a34a2139cf
// name
// "nodejs"

// _id
// 65a8cb433bb782a34a2139cd
// name
// "react"