var express = require('express');
var router = express.Router();

var app = express();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("get");
    console.log(req.session.email);
    console.log("********************");
    console.log(req);
        if (req.session.email) {
            res.render('complete', {
                "user": req.session.email
              });
        } else {
        res.redirect('/login.html');
        }
});


module.exports = router;