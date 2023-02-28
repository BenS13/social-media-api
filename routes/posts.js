const Router = require('koa-router');

const bodyParser = require('koa-bodyparser');

const router = Router({prefix: '/api/v1/posts'});

let posts = [
    {title:'Test Post', fullText:'Testing the posting view'},
    {title:'Test2 Post', fullText:'Testing again the posting view'}
];

router.get('/', getAllPosts);
router.post('/', bodyParser(), createPost)

router.get('/:id([0-9]{1,})', getPostById); 
router.put('/:id([0-9]{1,})', updatePost); 
router.del('/:id([0-9]{1,})', deletePost);

function getAllPosts(cnx, next){
    cnx.body = posts;
}

function getPostById(cnx, next){
    let id = cnx.params.id;
    if ((id < posts.length+1) && (id > 0)) {
        cnx.body = posts[id-1]
    }else {
        cnx.status = 404;
    }
}

function createPost(cnx, next){
    //TODO
}

function updatePost(cnx, next){
    //TODO
}

function deletePost(cnx, next){
    //TODO
}

module.exports = router;

