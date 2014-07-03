exports.errorHandler = function (err, req, res, next){
	"user strict";
    console.error(err.message);
    console.error(err.stack);
    res.status(500);
    res.render('error_page', { error: err });
}