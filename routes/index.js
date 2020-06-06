var express = require('express');
var router = express.Router();
// var pg = require('pg');
const { Pool } = require('pg');

router.get('/', function(req, res, next) {
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
      client.query('SELECT user_name FROM login_info', function (err, result) {
        console.log(result);
        res.render('index', {
          "datas": result.rows[0].user_name
        });
        console.log(result);
      });
    }
  });
});

module.exports = router;
