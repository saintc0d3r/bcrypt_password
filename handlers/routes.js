module.exports = function(app){
	var DEFAULT_SALT_ROUNDS = 10000;
	/**
	 * Display main page
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 * HTTP Method: GET	 
	 */
	app.get('/', function(req, res, next){
		// Display main page
		return res.render('index');
	});

	/**
	 * Handle submitted password
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 * HTTP Method: POST
	 */
	app.post('/', function(req, res, next){
		"use strict";
		// Get submitted values
		var password = req.body.password;
		var salt_rounds = req.body.salt_rounds ? Number(req.body.salt_rounds) : DEFAULT_SALT_ROUNDS;

		console.log('[DEBUG] - Submitted values = ');
		console.dir({'password':password, 'salt_rounds': salt_rounds});

		// TODO: validate submitted values
		var validation_errors = {};
		if (validateInputs(password, salt_rounds, validation_errors)){
			// Process request using bcrypt
			var bcrypt = require('bcrypt');
			bcrypt.genSalt(salt_rounds, function(err, salt){
				console.log("[DEBUG] - Generated salt = "+salt);
				bcrypt.hash(password, salt, function(err, hash){
					console.log("[DEBUG] - Generated password = "+hash);
					var result = {gen_salt: salt, gen_hash: hash, rounds: salt_rounds};
					return res.render('index', result);
				});
			});
		}
		else{
			console.log('[DEBUG] - Validation errors = ');
			console.dir(validation_errors);
			return res.render('index', { 'validation_errors': validation_errors});
		}
	});

	// ------------- Helpers ---------------
	this.validateInputs = function(password, salt_rounds, errs){
		"use strict";
		var regex_password = new RegExp('^[a-zA-Z0-9_]{3,}$');
		var regex_salt_rounds = new RegExp('^[0-9]{4,}$');		

		if (!regex_password.test(password)){
			errs['password_error'] = "Password should be minimum 3 chars length & contains letters/numbers/underscore only.";
			return false;
		}

		if (!regex_salt_rounds.test(salt_rounds)){
			errs['salt_rounds_error'] = "Salt rounds should be a positive integer number";
			return false;
		}

		return true;
	}
}
