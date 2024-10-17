const passport = require('passport');
const router = require('express').Router();

/* router.get('/', (req, res) => {
    res.send("WZ talktowalls Meta APIs");
}) */
router.use('/', require('./swagger'));
router.use('/members', require('./members'));
router.use('/members/loan', require('./loan'));
router.use('/authors', require('./authors'));
router.use('/books', require('./books'));

//Login routes
router.get('/login', passport.authenticate('github'), (req, res) => {
	// req.session.user = "creestian";
	// res.send("Session is set");
});

router.get('/logout', function (req, res, next) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
});

module.exports = router;
