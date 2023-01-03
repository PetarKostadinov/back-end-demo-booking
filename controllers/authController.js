const { body, validationResult } = require('express-validator');
const validator = require('validator');

const { login, register } = require('../services/authService');
const { parseError } = require('../utils/parser');
const authController = require('express').Router();

authController.get('/login', (req, res) => {

    res.render('login', {
        title: 'Login'

    })
});

authController.post('/login',
    body(['username', 'password']).trim(),

    async (req, res) => {
        try {
            const result = await login(req.body.username, req.body.password);
            attachToken(req, res, result)
            res.redirect('/');
        } catch (error) {
            res.render('login', {
                title: 'Login',
                body: {
                    username: req.body.username
                },
                error: parseError(error)
               
            });
        }
    });

authController.get('/register', (req, res) => {

    res.render('register', {
        title: 'Register'

    })
});

authController.post('/register',
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required').bail()
        .isAlphanumeric().withMessage('Username may contain only English letters and numbers'),
    body('password')
        .trim()
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('repass')
        .trim()
        .custom(async (value, { req }) => {
            if (value != req.body.password) {
                throw new Error('password don\'t match');
            }
        }),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }

            const result = await register(req.body.username, req.body.password);
            attachToken(req, res, result)
            res.redirect('/');
        } catch (error) {

            res.render('register', {
                title: 'Register',
                body: {
                    username: req.body.username
                },
                error: parseError(error)
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