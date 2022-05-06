import React from 'react';
import {Link} from 'react-router-dom';
import style from './LandingPage.module.css';
export default function LandingPage () {
    return(
        <div className={style.div}> 
            <h1 className={style.tit}>Bienvenido a mi pagina de Breaking Bad</h1>
            <Link to='/home'><button className={style.crea}> Ingresar...</button></Link>
        </div>
    )
}