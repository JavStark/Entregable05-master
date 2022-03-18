const express = require('express');
const app = express();
let cors = require("cors");
const path = require("path");
const handlebars = require("express-handlebars");
const multer = require("multer");
const uploads = multer({ dest: "uploads/" });
const Contenedor = require('./entregable2.js');
const { render } = require('pug');
const prods = new Contenedor('./productos.json')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name);
  },
});

const upload = multer({
  storage,
});


app.use(cors('*'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static("public"));
// app.use('public', express.static(path.join(__dirname,"public")));

app.use('/api/productos', require('./routes/index'));
app.use(multer({ dest: './uploads/' }).single('file'));


app.engine("hbs", handlebars({
    extname: '.hbs',
    defaultLayout:'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'

})
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views","ejs"));

app.get("/", (req, res) => {
    res.render("index");});

app.get("/tabla", async(req, res) => {
  const listProds = await prods.getAll()
     res.render("tabla", {
       productos: listProds,
       hayProds: listProds.length
      }
         )});


app.post("/", (req, res) => {
  const producto = req.body;
 prods.save(producto);
  res.redirect("/tabla")
});
   


  
  app.listen(8080, ()=>{
    console.log(`Server on en puerto 8080`);
});
