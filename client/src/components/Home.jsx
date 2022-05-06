import React from 'react';
import { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { filterCharactersByStatus, filterCreated, getCharacters, orderByName } from '../actions';
import Card from './Card';
import Paginado from './Paginado';
import style from './Home.module.css'

export default function Home () {

const dispatch =useDispatch();
const allCharacters = useSelector((state)=>state.characters);
console.log('e',allCharacters)
const [currentPage, setCurrentPage] = useState(1)
const [charactersPerPage, setCharactersPerPage] = useState(6)
const indexOfLastCharacter = currentPage * charactersPerPage // 6
const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage // 0
const currentCharacters = allCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter)

const [order,setOrder] = useState('')
const paginado =(pageNumber)=>{
    setCurrentPage(pageNumber);
}

function handleFilterStatus (e) {
    dispatch(filterCharactersByStatus(e.target.value))
    setCurrentPage(1)
}

function handleFilterCreated (e) {
    dispatch(filterCreated(e.target.value))
    setCurrentPage(1)
}

function handleFilterOrder(e) {
    dispatch(orderByName(e.target.value))
    
    setOrder(`ordenar${e.target.value}`)
}

useEffect(()=>{
    dispatch(getCharacters());
},[dispatch]);

function handleClick (e) {
e.preventDefault();
dispatch(getCharacters()); // apreto y que me traiga todo de nuevo
}

return (
    <div className={style.di} >
        <Link to='/character' className={style.cre} >Crear personajes</Link>
        <h1 className={style.tit}>Pagina de breaking bad</h1>
        <button className={style.carg} onClick={e=>handleClick(e)}>
            volver a cargar los personajes
        </button>
        <Paginado charactersPerPage = {charactersPerPage} allCharacters={allCharacters.length} paginado={paginado}/>
       
        <div>  
            <select  className={style.sel} onChange={e=>handleFilterOrder(e)}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
            </select>
            <select className={style.sel} onChange={e=>handleFilterStatus(e)} >
                <option value="All">Todos</option>
                <option value="Alive">Vivo</option>
                <option value="Deceased">Muerto</option>
                <option value="Unknown">Desconocido</option>
                <option value="Presumed dead">Probablemente muerto</option>
            </select>
            <select className={style.sel} onChange={e=>handleFilterCreated(e)} >
                <option value="All">Todos</option>
                <option value="created">Creados</option>
                <option value="api">Existentes</option>
            </select>
            <div>
           
           </div>
           {currentCharacters?.map( ch => {
                    return(
                        <fragment>
                            <Link to={'/home/' + ch.id} >
                            <Card name={ch.name} image={ch.img ? ch.img : ch.image} nickname={ch.nickname} />
                            </Link>
                        </fragment>
                    )
                })}
            </div>
        </div>
    )
}