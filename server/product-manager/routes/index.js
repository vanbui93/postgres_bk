var express = require('express');
var router = express.Router();

const {  Pool, Client } = require('pg')
const connectionString = 'postgres://xtfqmrut:GsxrPh5iW1oVQUznsBuR9xgVEJmpqTCa@isilo.db.elephantsql.com:5432/xtfqmrut'
const pool = new Pool({ connectionString})


/* GET product page. */
router.get('/api/notes', function(req, res) {
  pool.connect(function(error){
    pool.query('SELECT * FROM postgres_note', (err, response) => {
      if(error) {  // nếu lỗi thì trả về error
        return console.error('error running query', error);
      } else {   // Nếu thành công trả về response        
        res.send(response.rows);  //send dữ liệu phía api
      }
      // pool.end(); // đóng cổng kết nói csdl
    })
  })
});

router.post('/api/insert', function(req, res) {
  var sql = "INSERT "
          + "INTO postgres_note(title,content) "
          + "VALUES('"
          +   req.body.title+ "','" 
          +   req.body.content+"')";
      pool.query(sql, function (err, results) {
    if(err) throw err;
    res.json({notes: results});
  });
});

router.post('/api/edit', (req, res) => {
  var sql = "UPDATE postgres_note SET "
          +   "title='"+req.body.title+"',"
          +   "content='"+req.body.content+"'"
          + "WHERE id='"+req.body.id+"'";
      pool.query(sql, function(err, results) {
    if (err) throw err;
    res.json({notes: results});
  });
});


module.exports = router;
