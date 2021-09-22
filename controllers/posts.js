const Post = require('../models/post');

module.exports = {
    // GET /posts
    async postIndex(req,res,next){
        let posts = await Post.find({});
        res.render('posts/index', { posts });
    },
    // GET /posts/new
    postNew(req,res,next){
        res.render('posts/new');
    },
    // POST /posts
    async postCreate(req,res,next){
        let post = await Post.create(req.body.post);
        res.redirect(`/posts/${post.id}`);
    },
    // GET /posts/:id
    async postShow(req,res,next){
        let post = await Post.findById(req.params.id);
        res.render(`posts/show`, { post });
    },
    // GET /posts/:id/edit
    async postEdit(req,res,next){
        let post = await Post.findById(req.params.id);
        res.render(`posts/edit`, { post });
    },
    // PUT /posts/:id
    async postUpdate(req,res,next){
        let post = await Post.findByIdAndUpdate(req.params.id,req.body.post, {new:true}); // El parámeto new:true se usa para que la función retorne el nuevo objeto (actualizado)
        res.redirect(`/posts/${post.id}`);
    },
    // DELETE /posts/:id
    async postDestroy(req,res,next){
        let post = await Post.findByIdAndRemove(req.params.id);
        res.redirect(`/posts`);
    },
}