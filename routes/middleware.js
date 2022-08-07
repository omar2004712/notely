const { validationResult } = require('express-validator'); // added for the handleErrors

module.exports = {
    requireAuth(req, res, next) {
        if (!req.session.userId) {
            return res.redirect('/register');
        }

        next();
    },
    handleErrors() {
        // move from auth dir to route dir to be accessible by all routes
        return (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.send(errors.mapped());
            }
            next();
        };
    },
};
