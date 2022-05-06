import React from "react";
import style from './Paginado.module.css';


export default function Paginado({ charactersPerPage, allCharacters, paginado }) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allCharacters / charactersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className={style.dea}>
            <ul className='paginado'>
                { pageNumbers && pageNumbers.map(number => (
                   
                        <button className={style.pag} onClick={() => paginado(number)}>{number}</button>
                   
                ))}
            </ul>
        </nav>
    )
}