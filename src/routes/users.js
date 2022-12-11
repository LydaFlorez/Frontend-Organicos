const express = require('express');
const router = express.Router();

//login de usuario
router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

//registro de usuario
router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

//Ruta para recibir los datos de usuario
router.post('/users/signup', (req, res) => {
    const {nombre, email, password, confirm_password} = req.body;
    const errors = [];
    
    if(password != confirm_password) {
        errors.push({texto: 'Las contraseñas no coinciden.'});
    };

    if(password.length < 4) {
        errors.push({texto: 'La contraseña debe tener al menos 4 caracteres.'});
    };

    if(errors.length > 0) {
        res.render('users/signup', {errors, nombre, email, password, confirm_password});
    } else {
        res.send('Usuario registrado.');
    }
    //console.log(req.body);
});

router.get('/users/logout', (req, res) => {
    req.logout();
    delete req.session
    res.redirect('/');
})

module.exports = router;