const fs  = require('fs')           //se requiere el módulo fs con el cual vamos a leer, guardar, eliminar

class Contenedor {

  constructor(ruta) {           //el constructor recibe la ruta, que se la vamos a pasar cuando generemos una instancia de esta clase
    this.ruta = ruta;           //ruta apunta a (ruta), para referirnos a ella vamos a usar this.ruta que es en este caso ./productos.txt
  }


  //estas funciones se llaman métodos porque están dentro de una clase y van a ser todas asincronas porque llevarán un tiempo realizarlas
  async save(obj) {             
    const objs = await this.getAll()    //primero leer si hay algo dentro del archivo productos.txt

    let newId                           //se genera la variable que guardará el id de cada objeto   
    if (objs.length == 0) {             //si en productos.txt no hay nada...
      newId = 1                         //entonces el id será 1
    } else {
      newId = objs[objs.length - 1].id + 1  //sino será la cantidad de objetos + 1
    }

    const newObj = { ...obj, id: newId }    //ese nuevo objeto que se creó con su id, se guarda en una constante
    objs.push(newObj)                       //y después se inserta en el array que está dentro del productos.txt

    try {
      await fs.promises.writeFile(this.ruta, JSON.stringify(objs, null, 2)) //el módulo fs escribe el archivo txt con esos datos que le pasamos arriba
      return newId                                                          //JSON.stringify es para pasar de objeto a string
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`)
    }
  }

  async getById(id) {                       //recibe un id (el que estamos buscando)
    const objs = await this.getAll()        //guarda lo que hay en el archivo productos.txt en una constante
    const buscado = objs.find(o => o.id == id)  //recorre el array de objetos buscando uno que tenga in id que coincida con el que le pasamos por parámetro a la función
    return buscado                              //muestra el objeto encontrado
  }

  async getAll() {
    try {
      const objs = await fs.promises.readFile(this.ruta, 'utf-8')
      return JSON.parse(objs)
    } catch (error) {
      return []
    }
  }  

  async deleteById(id) {
    const objs = await this.getAll()
    const index = objs.findIndex(o => o.id == id)
    if (index == -1) {
      throw new Error(`Error al borrar: no se encontró el id ${id}`)
    }

    objs.splice(index, 1)
    try {
      await fs.promises.writeFile(this.ruta, JSON.stringify(objs, null, 2))
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`)
    }
  }

  async deleteAll() {
    await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2))
  }
}

//generamos los objetos que vamos a guardar luego con el método save:
const p1 = {
    title: "Escuadra",
    price: 123.45,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
  }
  
  const p2 = {
    title: "Calculadora",
    price: 234.56,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
  }
  
  const p3 = {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
  }
  
//encerramos las pruebas en una función asincrona

// async function pruebas(){

//     const prods = new Contenedor('./productos.txt') //generamos una instancia de la clase contenedor
//                                                     //pasandole la ruta del archivo a generar    
//     console.log('muestro todo')
//     let objs = await prods.getAll();                //desde esa instancia llamamos al método getAll
//     console.log(objs);
  
//     console.log('guardo p1')
//     let idP1 = await prods.save(p1);                //guardamos el p1 creado más arriba
//     console.log('id de p1: ', idP1);
  
//     console.log('guardo p2')
//     let idP2 = await prods.save(p2);
//     console.log('id de p2: ', idP2);
  
//     console.log('muestro todo')
//     objs = await prods.getAll();                    //se muestra lo guardado en productos.txt donde ya estará p1 y p2
//     console.log(objs);  
  
//     console.log('busco p1 por id')
//     const res = await prods.getById(idP1);
//     console.log('resultado: ', res)
  
//     console.log('busco por id inexistente')
//     const noexiste = await prods.getById(999);
//     console.log('resultado: ', noexiste)
  
//     console.log('borro p1 por id')
//     await prods.deleteById(idP1);
  
//     console.log('muestro todo')
//     objs = await prods.getAll();
//     console.log(objs);
  
//     console.log('borro todo')
//     await prods.deleteAll();
  
//     console.log('muestro todo')
//     objs = await prods.getAll();
//     console.log(objs);

// }

// pruebas()

module.exports = Contenedor;