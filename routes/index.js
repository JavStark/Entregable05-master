const { Router } = require('express');
const router = Router();
const productos = require('../productos.json');
const id = require('../productos.json');
const path = require("path");
const Contenedor = require("../entregable2.js");
const contenedor = new Contenedor("../productos.json")



router.get('/', async (req, res)=>{
    const prods = await contenedor.getAll()
    res.json(prods);
});

router.get('/:id', async(req, res)=>{
    const {id} = req.params;
    const prods = await contenedor.getById(id)
    res.send(prods);
});

router.post('/', async (req, res)=>{
    await contenedor.save({ 
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
    });
    // res.status(200).json(req.body)
    res.redirect('/tabla')
});


router.put('/:id', async(req, res)=>{
    const prods = await contenedor.getAll()
    const {id} = req.params
    const data = req.body
    let encontrado = false
    for (const producto of prods) {
        if (producto.id == id){
            producto.title = data.title
            producto.price = data.price
            producto.thumbnail = data.thumbnail
            encontrado = true
        }
    }
    encontrado ? res.json(prods.find(elem => elem.id == id)) : res.json(`Error: El id ${id} no pertenece a ningún producto`)
});

router.delete('/:id', async(req, res)=>{
    const {id} = req.params;
    const prods = await contenedor.deleteById(id)
    res.json(prods);
    console.log(`eliminado correctamente`);
});





module.exports = router;