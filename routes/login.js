var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
var session = require('express-session');

var app = express();

router.post('/', function(req, res, next) {
    console.log(req);
    const email = req.body.email;
    const password = req.body.password;

    var pool = new Pool({
        database: 'toubee',
        user: 'postgres', //ユーザー名はデフォルト以外を利用している人は適宜変更してください。
        password: 'root', //PASSWORDにはPostgreSQLをインストールした際に設定したパスワードを記述。
        host: 'localhost',
        port: 5432,
    });
    pool.connect( function(err, client) {
        if (err) {
            console.log(err);
        } else {
            client.query("SELECT COUNT(*) FROM login_info WHERE mail='" + email + "'and password='" + password + "'", function (err, result) {
                console.log(result.rows[0].count);
                if (result.rows[0].count == 1) {
                    console.log("ok login");
                    // send success page
                    // TODO make session
                    app.use(session({
                        secret: email,
                        resave: false,
                        saveUninitialized: false,
                        cookie:{
                            httpOnly: true,
                            secure: false,
                            maxage: 1000 * 60 * 30
                        }
                      }));
                    res.redirect('/complete');
                } else {
                    console.log("cant login");
                    // send login faild page
                    res.redirect('/users');
                }
            });
        }
    });
});

module.exports = router;