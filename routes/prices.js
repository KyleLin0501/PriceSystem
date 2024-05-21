var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();


var db = new sqlite3.Database('./db/sqlite.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the sqlite.db database.');
});

// API端点：获取价格数据
router.get('/prices', function(req, res, next) {
    // 从请求的查询参数中获取月份
    const month = req.query.month;

    // 检查月份是否已提供
    if (!month) {
        return res.status(400).json({ error: "Month is required" });
    }

    let query = `SELECT * FROM price WHERE price_date LIKE ?`;
    let params = [`${month.toString()}%`];

    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});


module.exports = router;