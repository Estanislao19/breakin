import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import {Link} from 'react-router-dom';
import { filtAlive, filterAir, filterAlfa, filterCharacters, filterDogue, filtergender, filterLoca, filterLocation, filterName, filterOrigin, filtipo, getcharacter, getEpisode } from '../actions';
import Paginado from './Paginado';
import Card from './Card'; 
import style from './Home.module.css';
import SearchBar from './SearchBar';


export default function Home (){
    const dispatch=useDispatch();
    const allCharacters = useSelector((state)=>state.characters) 
    console.log('eseee',allCharacters)
    const [orderaz,setOrderAZ] =useState('')
    const [currentPage, setCurrentPage] = useState(1)//1ro mi pagina actual y un estado q setee mi pag actual
    // const [countriesPerPage, setCountriesPerPage] = useState(10)//setea cant personajes x pag
    const [characters, setcountryPerPage] = useState(12);
    const lastCharacter = currentPage * characters//10
    const firstCharacters = lastCharacter - characters //0
    const currentCountries = allCharacters.slice(firstCharacters, lastCharacter)
    const allepisode=useSelector((state)=>state.episode)
    console.log('all',allepisode)
     

    useEffect(()=>{
        dispatch(getcharacter())
        dispatch(getEpisode())
    },[dispatch]);

    function handleClick (e) {
      
        dispatch(getcharacter());
       
    } 
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    function handlefilterCharacters (e) {
        dispatch(filterCharacters(e.target.value));
       setCurrentPage(1)
   }
   let razadedog = allCharacters.map(e =>{
    let sa = e.name.split('').join('');
    let san = sa
    return san
})
const allraza = [...new Set(razadedog)]

    function handlefilterAlfa(e){
        e.preventDefault();
        dispatch(filterAlfa(e.target.value));
        setOrderAZ(`Ordenado ${e.target.value}`)
        
        }
        function handleFilterair_date (e){
            dispatch(filterAir(e.target.value));
            
        }
        let creados = allCharacters.map(e =>{
            let re = e.created.split('').join('');
            let perr = re
            return perr
        })
        const allcreated = [...new Set(creados)]
       
        function handleAlive(e){
            dispatch(filtAlive(e.target.value));
            
        }
        let dead = allCharacters.map(e =>{
            let estan = e.status.split('').join('');
            let estani = estan
            return estani
        })
        const alive = [...new Set(dead)]
        
        function handlegenre(e){
            e.preventDefault();
            dispatch(filtergender(e.target.value));
            
            }
            let gend = allCharacters.map(e =>{
                let mort = e.gender.split('').join('');
                let morti = mort
                return morti
            })
            const allgender = [...new Set(gend)]
        
     function handleori(e){

        dispatch(filterOrigin(e.target.value));
            
    }
    let vamos = allCharacters.map(e =>{
        let summ = e.origin.split('').join('');
        let summer = summ
        return summer
    })
    const allorigin = [...new Set(vamos)]


        function handletipo (e){
            dispatch(filtipo(e.target.value));
            
        }
        let loca = allCharacters.map(e =>{
            let res = e.type.split('').join('');
            let perr = res
            return perr
        })
        const alltipos = [...new Set(loca)]

        
        function handlelocation (e){
            dispatch(filterLocation(e.target.value));
            
        }
        let locat = allCharacters.map(e =>{
            let re = e.location.split('').join('');
            let perr = re
            return perr
        })
        const allLocation = [...new Set(locat)]
        
     
    



    return(
        <div className={style.container}>
            <h1 className={style.title} >PAGINA DE RICK AND MORTY</h1>
            
            <select className={style.rick}  onChange ={e => handlefilterAlfa(e)}>
		<option value ='asc'>Ordenamiento alfebetico A-Z</option>
		<option value ='des'>Ordenamiento alfebetico Z-A</option>
        </select>
       
        <select className={style.rick} onChange={(e)=> handlefilterCharacters(e)}>
            
            <option value="all">Filtrado por nombre del personaje</option>
            {allraza.map((e)=> 
            <option name={e}>{e}</option>)}
            
        </select>
        
        <div>
        <select className={style.rick} onChange={(e)=>handleFilterair_date (e)}>
        <option value="all">Fecha de creacion de personajes</option>
            {allcreated.map((e)=> 
            <option name={e}>{e}</option>)}
            
            
        </select>
        <div>
          <select className={style.rick} onChange={(e)=> handletipo(e)}>
          <option value="All">Tipos de personajes</option>
            {alltipos.map((e)=> 
            <option name={e}>{e}</option>)}
          </select>
            
                <select className={style.rick} onChange={(e)=>handleAlive(e)}>
                <option value="all">Estado de los personajes</option>
            {alive.map((e)=> 
            <option name={e}>{e}</option>)}
                </select>
            
        
            <select className={style.rick} onChange={(e)=>handlegenre(e)}>
            <option value="All">Genero de los personajes</option>
            {allgender.map((e)=> 
            <option name={e}>{e}</option>)}
            </select>
        </div>
        <div>
            
                <select className={style.rick} onChange={(e)=>handlelocation(e)}>
                <option value="All">Location</option>
            {allLocation.map((e)=> 
            <option name={e}>{e}</option>)}
                </select>
            
        
        
        <select className={style.rick} onChange={(e)=>handleori(e)}>
                <option value="All">Origin</option>
            {allorigin.map((e)=> 
            <option name={e}>{e}</option>)}
                </select>
        
        <div>
            <button className={style.carg} onClick={e=> {handleClick(e)}}>Volver a cargar los personajes</button>
        </div>
        <div>
            <SearchBar/>
        </div>
        </div>
        <div>
        <Paginado
                characters={characters}
                allCharacters={allCharacters.length}
                paginado={paginado}
            />
            {
                    currentCountries.map(el => {
                        return (
                            <div key={el.id}>
                                <Link to={"/home/" + el.id} >
		<Card name={el.name} air_date={el.air_date} type={el.type} location={el.location} species={el.species} created={el.created} image={el.image} status={el.status} />
		</Link>
		</div>
		)})}
        </div>
            </div>
        </div>
    )
}