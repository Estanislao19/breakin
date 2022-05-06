import React, {useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {postCharacters,getOccupations} from '../actions';
import {Link, useNavigate} from 'react-router-dom';
import style from './CharacterCreated.module.css'

function validate (input){
    let errors ={};
    if(!input.name){
        errors.name ='se requiere nombre'
    }else if (!input.nickname){ 
        errors.nickname ='Nickname debe ser completado'
    }else if (!input.birthday){
        errors.birthday='Birthday debe ser completado'
    }else if(!input.status){
        errors.status='Status debe ser completado'
    }else if(!input.image){
        errors.image='Image debe ser completado'
    }
    return errors;
}
export default function CharacterCreated () {
const dispatch = useDispatch();
const allOcupations = useSelector((state)=>state.occupations)
const [errors,setErrors] =useState({});

const [input,setInput] = useState({
    name: "",
    nickname: "",
    birthday: "",
    status: "",
    image:"",
    occupations: [],
})
function handleChange (e) {
    setInput({
    ...input,
    [e.target.name] :e.target.value
    })
    setErrors(validate({
        ...input,
        [e.target.name]: e.target.value,
    }))
    console.log(input)
}

function handleCheck (e) {
    if(e.target.checked){
        setInput({
            ...input,
            status:e.target.value
        })
    }
}
function handleSubmit(e) {
    if (
        !input.name ||
        !input.nickname ||
        !input.image ||
        !input.status ||
        !input.birthday ||
        !input.occupations
      ) {
        e.preventDefault();
        alert("Complete todos los campos para poder continuar");
      } else {
        e.preventDefault();
        dispatch(postCharacters(input));
        alert("Tu personaje a sido creado con exito!!!!");
        // Para volver a la pantalla principal
      
        // Reseteamos el input
        setInput({
          name: "",
          nickname: "",
          image: "",
          status:"",
          occupations: [],
          image:""
        });
      }
    

   
  }
function handleSelect (e) {
setInput({
    ...input,
    occupations:[...input.occupations,e.target.value]
})
}
function handleDelete (e) {
    setInput({
        ...input,
        occupations:input.occupations.filter(occ =>occ !== e)
    })
}
useEffect(()=>{
    dispatch(getOccupations())
},[])


return (
    <div className={style.crear}>
        <Link to='/home'><button className={style.vol}> Volver</button></Link>
        <h1 className={style.nam}>Crea tu personaje</h1>
        <form className={style.form} onSubmit={(e)=>handleSubmit(e)}>
            <div>
                <label className={style.lab}>Nombre:</label>
                <input 
                type='text'
                value={input.name} 
                name='name'
                onChange={(e)=>handleChange(e)}
                
                />
                {errors.name && (
                                        <p >{errors.name}</p>
                                    )} 
            </div>
            <div>
                <label className={style.lab}>Nickname:</label>
                <input 
                type='text'
                value={input.nickname} 
                name='nickname'
                onChange={(e)=>handleChange(e)}
                />
                 {errors.nickname && (
                                        <p >{errors.nickname}</p>
                                    )} 
            </div>
            <div>
                <label className={style.lab}>Birthday:</label>
                <input 
                type='text'
                value={input.birthday} 
                name='birthday'
                onChange={(e)=>handleChange(e)}
                />
                {errors.birthday && (
                                        <p >{errors.birthday}</p>
                                    )} 
            </div>
            <div>
                <label className={style.lab}>Imagen:</label>
                <input 
                type="text"
                value={input.image}
                name="image" 
                onChange={(e)=>handleChange(e)}
                />
                {errors.image && (
                                        <p >{errors.image}</p>
                                    )}
            </div>
            <div>
                <label className={style.lab}>Status:</label>
                <label>
                <input 
                type="checkbox"
                name="Alive"
                value="Alive"
                onChange={(e)=>handleCheck(e)}
                />Alive</label>
              <label>
                <input 
                type="checkbox"
                name="deceased"
                value="desceased"
                onChange={(e)=>handleCheck(e)}
                />Deceased</label>
                <label>
                <input 
                type="checkbox"
                name="Unknown"
                value="Unknown"
                onChange={(e)=>handleCheck(e)}
                />Unknown</label>
                {errors.status && (
                                        <p >{errors.status}</p>
                                    )}
            </div>
            <select className={style.selec} onChange={(e)=>handleSelect(e)}>
                {allOcupations.map((occ)=>(
                <option value={occ.name}>{occ.name}</option>
                ))}
            </select>
            <button type="submit" className={style.per}>CrearPersonaje</button>
            <ul><li>{input.occupations.map(el=>el +",")}</li></ul>
            
           
        </form>
        {input.occupations.map(oc => 
                <div>
                    <p>{oc}</p>
                    <button className={style.dele} onClick={() => handleDelete(oc)}>x</button>
                </div>
            )}
        </div>
    )
}