const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Occupation,Character} =require('../db');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    let info = await axios.get('https://breakingbadapi.com/api/characters');
    const data = info.data.map(el=>{
        return{
            name:el.name,
            id:el.char_id,
            birthday:el.birthday,
            nickname:el.nickname,
            status:el.status,
            img:el.img,
            occupation:el.occupation.map(el=>el),
            appearance:el.appearance.map(el=>el),
        };
        
    });
    return data;
    
};

const getDbInfo = async () =>{
    return await Character.findAll({
        include:{
            model:Occupation,
            attribute: ['name'],
            through: {
                attribute:[],
            }
        }
    })
}
const getAllCharacter = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal

}
router.get('/characters',async(req,res)=>{
    const name = req.query.name;
    let characterTotal = await getAllCharacter();
    if(name){
        let characterName = await characterTotal.filter(el=> el.name.toLowerCase().includes(name.toLocaleLowerCase()));
        characterName.length ? res.status(200).send(characterName) :el.
        res.status(404).send('no se encontro el personaje')
    }else{
        res.status(200).send(characterTotal)
    }

});


router.get('/occupations',async(req,res)=>{
    const occupationApi = await axios.get('https://breakingbadapi.com/api/characters');
    const occupations = await occupationApi.data.map(el=>el.occupation); // me va a devolver todas las occupation
    const occEach = occupations.map(el=>{
        for(let i=0; i<el.length; i++) return el[i] }) // hago un segundo map para recorrer uno por uno
        console.log(occEach)
        occEach.forEach(el=>{
            Occupation.findOrCreate({
                where:{name:el}
            })
        })
    const allOcupations = await Occupation.findAll();
    res.send(allOcupations)
    });
    
router.post('/character',async(req,res)=>{
    const {name,birthday,nickname,status,imagen,createInDb,occupations} =req.body

    let charcaterCreated = await Character.create({
    name,
    birthday,
    nickname,
    status,
    imagen,
    createInDb,
    occupations
    })
    occupations.forEach(e => {
        Occupation.findOrCreate({
            where: {
                name: e,
            }
        })
    })

    let genresDb = await Occupation.findAll({
        where: {
            name: occupations.map(e => e)
        }
    })

    charcaterCreated.addOccupation(genresDb)
    res.send('Videogame creado correctamente')
})
  router.get('/characters/:id',async(req,res)=>{
  const id = req.params.id;
  const caractersTotal = await getAllCharacter();
  if(id){
      const char = await caractersTotal.filter(el=>el.id ==id)
      char.length ? res.status(200).send(char) : res.status(404).send('no eneonctre ese personaje')
  }
  })


module.exports = router;
