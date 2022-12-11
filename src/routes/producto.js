const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

router.get('/producto/agregar', (req, res) => {
    res.render('producto/new-producto');
});

router.post('/producto/new-producto', async (req, res) => {
    //let id = req.params.id;
    console.log(req.body);
    const {palabra, tipo, significado} = req.body
    const errors = [];
    if(!palabra) {
        errors.push({texto: 'Escriba una palabra.'});
    }
    if(!tipo) {
        errors.push({texto: 'Escriba un tipo.'});
    }
    if(!significado) {
        errors.push({texto: 'Escriba un significado.'});
    }
    if(errors.length > 0) {
        res.render('producto/new-producto', {
            errors,
            palabra,
            tipo,
            significado
        });
    } else {
        const newProducto = new Producto({palabra, tipo, significado});
        //console.log(newProducto)
        await newProducto.save();
        res.redirect('/producto');
        //res.send('Palabra Guardada.');
    }   
})

//Listar los datos de la DB
router.get('/producto', async (req, res) => {
        //res.send('Notas de la Base de Datos');
        const producto = await Producto.find().sort({date: 'desc'});
        res.render('producto/all-producto', {producto});
});

router.get('/producto/edit/:id', async (req, res) => {
    const producto = await Producto.findById(req.params.id);
    res.render('producto/edit-producto', {producto});
});

router.put('/producto/edit-producto/:id', async (req, res) => {
    const {palabra, tipo, significado} = req.body;
    await Producto.findByIdAndUpdate(req.params.id, {palabra, tipo, significado});
    res.redirect('/producto');
});

router.delete('/producto/delete/:id', async (req, res) => {
    //console.log(req.params.id);
    await Producto.findByIdAndDelete(req.params.id);
    res.redirect('/producto');
    //res.send('Ficha eliminada');
})

module.exports = router;