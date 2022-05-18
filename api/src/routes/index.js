const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Character,Episode} =require('../db');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async() => {
  
    // const {name} = req.query
    //buscar en el endpoint de la api el personaje que nos viene por queryf
    
     const apiCharacters = await axios.get('https://rickandmortyapi.com/api/character');
  
     const dale= apiCharacters.data.results.map((char) => {
        return {
          id: char.id,
          name: char.name,
          image: char.image,
          status:char.status,
          species:char.species,
          gender:char.gender,
          created:char.created,
          type:char.type,
          location:char.location.name,
          origin:char.origin.name
           
        };
      });
  return dale
      
    
  };
  
  router.get('/characters',async(req,res)=>{
    const name = req.query.name;
    const rick = await getApiInfo();
    if(name){
        const dogi = await rick.filter(el=>el.name.toLowerCase().includes(name.toLocaleLowerCase()));
        dogi.length ? res.status(200).send(dogi) : res.status(404).send('no se encontro ese dogi');
        
    }else {
        res.status(200).send(rick)
    }
});
router.get ('/characters/:id', async (req, res) => {
  const id = req.params.id;
  const dogTotal = await getApiInfo()
  if (id) {
  let dogId = dogTotal.filter( el => el.id == id)     
  dogId.length? res.status(200).json(dogId) :
  res.status(404).send('Dog not found')           
    }
    })



  

module.exports = router;
