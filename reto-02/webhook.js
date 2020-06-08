const axios = require("axios");
const readline = require('readline');
console.log("Iniciando Mensajes Webhooks")
//simulacion Server Facebook

const url = "http://localhost:4000/webhook";

let limit = 0;
let arrayPares = [];
let arrayImpares = [];

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// pedir el limite 
async function pedirLimite () {
  return new Promise(function(resolve,reject){
    terminal.question("Ingrese el limite de numeros a evaluar (ej: 30) : ",function(res){
      resolve(res);
    })
  })
}

pedirLimite().then((resp) => {
  limit = resp;
  separarNumeros();
  seleccionarData();
});


function separarNumeros(){
  for (let i = 1; i <= limit; i++) {
    if(i%2===0){
      arrayPares.push(i);
    }else{
      arrayImpares.push(i);
    }
  }
}


async function consultarServer(dato) {
  const resp = await axios.post(url,{data: dato});
  console.log(resp.data)
}

async function seleccionarData (){

  for (let i = 0; i < arrayPares.length; i++) {
    if(i === 10){
      arrayPares.splice(0,10);
      break;
    }
    await consultarServer(arrayPares[i]);
    if(i === arrayPares.length - 1){
      arrayPares = [];
      break;
    }
  }

  for (let j = 0; j < arrayImpares.length; j++) {
    if(j === 10){
      arrayImpares.splice(0,10);
      break;
    }
    await consultarServer(arrayImpares[j]);
    if(j === arrayImpares.length - 1){
      arrayImpares = [];
      break;
    }
  }

  seleccionarData();
}


