var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'g123456789',
    database: 'new'
})
/* GET home page. */
router.get('/new', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    connection.query('SELECT * FROM work', function(err, rows, fields) {
        res.send(rows);
    })
});
router.post('/delete', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    connection.query('DELETE FROM work WHERE id=' + req.body.id + '', function(err, rows, fields) {
        res.send(rows);
    })
});
router.post('/add', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    connection.query("INSERT INTO work (name,title) VALUES ('" + req.body.name + "','" + req.body.title + "')", function(err, rows, fields) {
        if (rows != '' || rows != null) {
            connection.query('SELECT * FROM work', function(err, rows, fields) {
                res.send(rows)
            })
        }
    })
})
module.exports = router;