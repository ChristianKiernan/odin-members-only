const isAuth = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.status(401).json({
		msg: 'You are not authorized to view this resource',
	});
};

const isMember = (req, res, next) => {
	if (req.isAuthenticated() && req.user.is_member) {
		return next();
	}
	res.status(403).json({ msg: 'Members only' });
};

const isAdmin = (req, res, next) => {
	if (req.isAuthenticated() && req.user.is_admin) {
		return next();
	}
	res.status(403).json({ msg: 'Admins only' });
};

module.exports = {
	isAuth,
	isMember,
	isAdmin,
};
