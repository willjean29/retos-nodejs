const validarNumero = (req,res,next) => {
  const num = req.body.data;
  if( num%2 === 0){
    console.log("Recibi un Numero Par")
  }else{
    console.log("Recibi un Numero Impar")
  }
  next();
}

module.exports = validarNumero;