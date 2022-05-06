import React from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetail, resetBeaDetail } from "../actions/index.js";
import { useEffect } from "react";
import style from './Detail.module.css'

export default function Detail(props){
    console.log(props)

    const dispatch = useDispatch()
    const {id} = useParams();
    useEffect(() => {
        dispatch(getDetail(id))
        return ()=>{
            dispatch(resetBeaDetail())
        }
    },[dispatch, id] )

    const myCharacter = useSelector(state => state.detail)

    return (
        <div className={style.div}>
        {
            myCharacter.length > 0 ?
            <div>
                <h1 className={style.soy}>Soy {myCharacter[0].name}</h1>
                <img className={style.img} src={myCharacter[0].img ? myCharacter[0].img :  myCharacter[0].image} alt="img not found"/>
                <h2 className={style.sta}>Status: {myCharacter[0].status}</h2>
                <p className={style.sta}>Cumpleaños: {myCharacter[0].birthday}</p>
                <h3 className={style.sta}>
            Occupations: {" "}
            {!myCharacter[0].createdAtDb
              ? myCharacter[0].occupation + " "
              : myCharacter[0].occupations.map((el) => el.name )}
          </h3>
                
                

            </div> : <p>Loading...</p>
        }
        <Link to='/home'>
            <button className={style.btn}>Volver</button>
        </Link>
        </div>
    )}