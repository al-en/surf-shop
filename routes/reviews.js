const express = require('express');
const router = express.Router({mergeParams:true});

/* GET reviews index /posts/:id/reviews */
router.get('/', (req, res, next) => {
    //res.render('index', { title: 'Express' });
    res.send("reviews")
});

/* GET reviews index /posts/:id/reviews/new */
/* router.get('/new', (req, res, next) => {
    //res.render('index', { title: 'Express' });
    res.send("reviews")
}); */

/* POST reviews create /posts/:id/reviews */
 router.post('/', (req, res, next) => {
    //res.render('index', { title: 'Express' });
    res.send("CREATE /reviews")
}); 

/* GET reviews show /posts/:id/reviews/:id */
/* router.get('/:review_id', (req, res, next) => {
    //res.render('index', { title: 'Express' });
    res.send("reviews")
}); */

/* GET reviews edit /posts/:id/reviews/:review_id/edit */
router.get('/:review_id/edit', (req, res, next) => {
    //res.render('index', { title: 'Express' });
    res.send("EDIT reviews")
});

/* PUT reviews update /posts/:id/reviews/:id */
router.put('/:review_id', (req, res, next) => {
    //res.render('index', { title: 'Express' });
    res.send("UPDATE reviews")
});

/* DELETE reviews destroy /reviews/:id */
router.delete('/:review_id', (req, res, next) => {
    //res.render('index', { title: 'Express' });
    res.send("reviews")
});

module.exports = router;
