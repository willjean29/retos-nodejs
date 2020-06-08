const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const validarNumero = require('./middleware/validarNumero');
const bodyParser = require("body-parser");
//Para que El servidor reciba request de  tipo JSON
app.use(bodyParser.json());

//POST http://localhost:4000/webhook
app.post("/webhook",validarNumero,function(req,res){
  const data = req.body.data;
  res.json({mensaje: `Número ${data}`})
})


//iniciar Servidor
app.listen(port,()=>{
    console.log(`Servidor ejecutando en el puerto ${port}`)
})