import axios from 'axios';


export function getcharacter() {
return async function (dispatch){
   var json = await axios.get('/characters')
   return dispatch({
    type:'GET_CHARACTERS',
    payload:json.data
   })
}
} 
export function filterAlfa(payload){
   return {
       type:'FILTER_BY_ALFA',
       payload
   }
}
 
export function filterCharacters (payload) {
   return {
       type:'FILTER_CHARACTERS',
       payload
   }
}
export function getEpisode() {
   return async function (dispatch){
      var json = await axios.get('/episode')
      return dispatch({
       type:'GET_EPISODE',
       payload:json.data
      })
   }
   } 
   export function filterAir (payload){
      return{
         type:'FILTER_AIR',
         payload
      }
   }
  
   export function filtipo (payload){
      return{
         type:'FILT_TIPO',
         payload
      }
   }
   

   export function filtAlive (payload){
      return{
         type:'FILT_ALIVE',
         payload
      }
   }


   export function filtergender (payload){
      return{
         type:'FILT_GENDER',
         payload
      }
   }
   export function filterLocation (payload){
      return{
         type:'FILTER_LOCATION',
         payload
      }
   }

export function getDetail(id){
    return async function(dispatch){
       
            var json = await axios.get("/characters/" + id);
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
                      
    }
}
export function resetDetail (payload) {
   return{
       type:'RESET_DETAIL',
       payload
   }
   
   }
   export function filterOrigin (payload){
      return{
         type:'FILTER_ORIGIN',
         payload
      }
   }
   export function getSearch (name){
   
      return function (dispatch){
          axios.get('/characters?name=' + name)
          .then(res=>{
              dispatch({
                  type:'GET_SEARCH',
                  payload:res.data
                  
              })
          }).catch(error=>
           alert('no se encuentra el personaje que estas buscando'))
      }
      
   }