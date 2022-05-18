import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, resetDetail } from "../actions";
import { useParams,useNavigate } from 'react-router';
import style from './Detail.module.css';


export default function Detail(){
    const dispatch = useDispatch();
    const { id }= useParams();
    const navigate= useNavigate();

    useEffect(() => {
        dispatch(getDetail(id));
        return ()=>{
            dispatch(resetDetail())
        }
    }, [dispatch, id])
    
    
    const navegacion =() =>{
      navigate("/home");
    }

    const perro = useSelector((state) => state.detail)

    

return(
    <div className={style.container} >
        {
            perro.length > 0 ?
            <div className={style.cont} >
                <h1 className={style.title} >{perro[0].name}</h1>
                <img className={style.img} src={perro[0].image} alt="Img not found" />
                <h3 className={style.wei} > Status: {perro[0].status}</h3>
                <h3 className={style.wei}> Species: {perro[0].species} </h3>
                <h3 className={style.wei} > Gender: {perro[0].gender} </h3>
                <h3 className={style.wei}> Created:  {perro[0].created} </h3>
                <h3 className={style.wei}>Location:{perro[0].location}</h3>
                <h3 className={style.wei}>Origin:{perro[0].origin}</h3>
                <button className={style.btn} onClick={navegacion}>HOME</button>
                
            </div> : 
            <p>Loading... </p>
        }
    </div>
)
    }