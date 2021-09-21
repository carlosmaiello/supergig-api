var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send('index');
});

router.post('/', function (req, res) {
    res.send('create');
});

router.get('/:id', function (req, res) {
    res.send(req.params);
});

router.put('/:id', function (req, res) {
    res.send('update');
});

router.delete('/:id', function (req, res) {
    res.send('delete');
});

module.exports = router;