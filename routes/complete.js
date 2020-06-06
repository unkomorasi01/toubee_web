var express = require('express');
var router = express.Router();

var app = express();

/* GET users listing. */
router.post('/', function(req, res, next) {
    console.log("post");
    console.log(req.session);
    console.log("********************");
    console.log(req);
        if (req.session.user) {
            res.render('complete', {
                "user": req.session.user
              });
        } else {
        res.redirect('/login');
        }
});
router.get('/', function(req, res, next) {
    console.log("get");
    console.log(req.session);
    console.log("********************");
    console.log(req);
        if (req.session.user) {
            res.render('complete', {
                "user": req.session.user
              });
        } else {
        res.redirect('/login');
        }
});


module.exports = router;