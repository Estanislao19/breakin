import React from 'react';
import style from './Card.module.css';

export default function Card({name,image,nickname}) {
    return (
        <div className={style.card}>
            <h3 className={style.nam}>{name}</h3>
            <h5 className={style.nick}>{nickname}</h5>
            <img className={style.img} src={image} alt="img not found" width="200px" height="250px" />
        </div>
    );
};