const Post = require('../models/post');

const postsController = function(){}

// Function index [Post]
// Give back a complete list of posts
postsController.index = function(req, res) {
    try{
        Post.find(
            {},
            function(err, posts) {
                var postMap = {};

                if(!err && (posts.length > 0)) {
                    posts.forEach(
                        function(post) {
                            postMap[post.postId] = post;
                        }
                    );
                    res.status(200).send(postMap);
                }
                else {
                    res.status(204).send();
                }
            }
        )
    }
    catch (err) {
        res.status(500).send('ERROR:postsController.index');
    }
};

// Function postsOfSpecificUser [Post]
// Give back a complete list of posts of specific user
postsController.postsOfSpecificUser = function(req, res) {
    try {
        Post.find(
            {
                username: req.params.username
            },
            function(err, posts) {
                var postMap = {};

                if(err) {
                    return res.status(204).send(err);
                }

                if( post.length === 0) {
                    return res.status(204).send();
                }

                posts.forEach(
                    function(post) {
                        postMap[post.postId] = post;
                    }
                );
                return res.status(200).send(postMap);
            }
        );
    }
    catch(err) {
        return res.status(500).send('ERROR: postsController.postsOfSpecificUser' + err);
    }
}

// Function createPost [Post]
// Create post
postsController.createPost = function(req, res) {
    try {
        Post.create(
            {
                username: req.body.username,
                content: {
                    text: req.body.content.text,
                    meta: {
                        date: req.body.content.meta.date,
                        image: req.body.content.meta.image,
                        geoloation: {
                            lat: req.body.content.meta.geoloation.lat,
                            long: req.body.content.meta.geoloation.long
                        }
                    }
                },
                votes: {
                    upvotes: 0,
                    downvotes: 0
                },
                comments: [],
                isHidden: false
            },
            function(err, post) {
                if(err) {
                    return res.status(500).send('ERROR: postsController.createPost - While Post.create()' + err)
                }
                return res.status(200).send(post);
            }
        )
    }
    catch(err) {
        res.status(500).send('ERROR: postsController.createPost' + err);
    }
}

// Function specificPostById [Post]
// Give back a specific post
postsController.specificPostById = function(req, res) {
    try {
        Post.findById(
            req.params.postId,
            function(err, post){
                if(err) {
                    return res.status(404).send('ERROR: postsController.specificPostById - While Post.findById()' + err)
                }
                return res.status(200).send(post);
            }
        )
    }
    catch(err) {
        res.status(500).send('ERROR: postsController.specificPostById' + err);
    }
}

// Function hideSpecificPostById [Post]
// Hide post from timeline
postsController.hideSpecificPostById = function(req, res) {
    try {
        Post.findByIdAndUpdate(
            req.params.postId,
            {isHidden: true},
            function(err, post) {
                if(err) {
                    return res.status(404).send('ERROR: postsController.hideSpecificPostById - While Post.findByIdAndUpdate()' + err)
                }
                return res.status(200).send();
            }
        )
    }
    catch(err) {
        res.status(500).send('ERROR: postsController.hideSpecificPostById' + err);
    }
}

module.exports = postsController;