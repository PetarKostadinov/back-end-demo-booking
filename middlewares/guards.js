function hasUser() {
    return (req, res, next) => {
        if (req.user != undefined) {
            next();
        } else {
            res.status(401).redirect('/auth/login')
        }
    };
}

function isGuest() {
    return (req, res, next) => {
        if (req.user != undefined) {
            res.redirect('/');
        } else {
            next();
        }
    };
}

function hasRole() {  // not in use for the app!
    return (req, res, next) => {
        if (req.user == undefined || req.user.roles.includes(rol) == false) {
            res.redirect('/login');
        } else {
            next();
        }

    }
}

module.exports = {
    hasUser,
    isGuest
}