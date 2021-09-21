module.exports = function (req, res, next) {
    console.log("requisição:", req.url, req.params, req.query);
    next();
}