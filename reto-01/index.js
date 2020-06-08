const readline = require('readline');
const axios = require('axios');

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function consultarApi (input){
  const resp = await axios(`https://pokeapi.co/api/v2/pokemon/${input}`);
  const data = resp.data;

  return {
    name: data.name,
    types: data.types,
    abilities: data.abilities
  }
}

function consultarPokemon (){
  terminal.question("Ingrese el Id o el nombre del pokemon a buscar : ",async function(res){
    if(res === "exit"){
      terminal.close();
      return;
    }
    const infoPokemon = await consultarApi(res);
    console.log("Información del Pokemon: \n",infoPokemon);
    console.log("Para salir ingrese 'exit'");
    consultarPokemon();
  })
}

consultarPokemon();