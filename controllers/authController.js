const { login, register } = require('../services/authService');

const authController = require('express').Router();

authController.get('/login', (req, res) => {

    res.render('login', {
        title: 'Login'

    })
});

authController.post('/login', async (req, res) => {
    try {
        const result = await login(req.body.username, req.body.password);
        attachToken(req, res, result)
        res.redirect('/');
    } catch (err) {
        res.render('login', {
            title: 'Login',
            error: err.message.split('\n')
        });
    }
});

authController.get('/register', (req, res) => {

    res.render('register', {
        title: 'Register'

    })
});

authController.post('/register', async (req, res) => {
    try {
        const result = await register(req.body.username, req.body.password);
        attachToken(req, res, result)
        res.redirect('/');
    } catch (err) {
        res.render('register', {
            title: 'Register',
            error: err.message.split('\n')
        });
    }
});

authController.get('/logout', (req, res) => {
    res.clearCookie('jwt');
    return res.redirect('/');
});

function attachToken(req, res, data) {
    const token = req.signJwt(data);
    res.cookie('jwt', token); //, {maxAge: 600}
}

module.exports = authController;