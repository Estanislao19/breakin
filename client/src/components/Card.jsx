import React from "react";
import style from './Card.module.css';

    export default function Card ({name, species, image, status,location}){
    return (
        <div className={style.Card} >
            <h3 className={style.name}>{name}</h3>
            <img className={style.img} src={image} alt='Imagen no encontrada' width='250px' height='175px' />
            <h3 className={style.rick} > Specie:{species}</h3>
            <h3 className={style.rick} > Status:{status}</h3>
            <h2 className={style.rick}> Location: {location}</h2>
            
        </div>
    )
}