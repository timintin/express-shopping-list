
function errorHandler(err, req, res, next) {
    res.status(err.status || 500);
    return res.json({
        error: err.message || "Something went wrong."
    });
}

module.exports = errorHandler;
