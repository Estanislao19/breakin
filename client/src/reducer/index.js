const initialState ={
   characters:[],
   allcharacters:[],
   detail:[],
}


function rootReducer (state=initialState,action) {
switch(action.type){
    case 'GET_CHARACTERS':
        return {
            ...state,
            characters:action.payload,
            allcharacters:action.payload
        }

        case 'FILTER_BY_ALFA':
            const alfaname = action.payload=== 'asc' ?
            state.characters.sort(function(a,b){
                if(a.name> b.name){ // compara el que encunetra primero y el que ecnuentra despues
                    return 1; 

                }
                if(b.name>a.name){
                    return -1;
                }
                return 0;
            }):
            state.characters.sort(function(a,b){
                if(a.name>b.name){
                    return -1;
                }
                if(b.name>a.name){
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                allcharacters:alfaname
            }
            case 'FILTER_CHARACTERS':
                       let raz =state.characters;
                           let can = action.payload === 'all' ? raz : raz.filter((el)=>el.name.includes(action.payload));
                           return{
                               ...state,
                               characters:can
                           }
             case 'GET_SEARCH' :
              return {
                 ...state,
                  characters:action.payload
                    }
                          
            case 'GET_EPISODE':
                return{
                    ...state,
                    episode:action.payload
                }
                case 'FILTER_AIR':
                    let crea =state.characters;
                    let creados = action.payload === 'all' ? crea : crea.filter((el)=>el.created.includes(action.payload));
                    return{
                        ...state,
                        characters:creados
                    }

              case 'FILT_TIPO':
                let tipo =state.characters;
                let tip = action.payload === 'All' ? tipo : tipo.filter((el)=>el.type.includes(action.payload));
                return{
                    ...state,
                    characters:tip
                }
                
            case 'FILT_ALIVE':
            const allPai = state.allcharacters
            const statusFiltered = action.payload === 'All' ? allPai : allPai.filter(el => el.status.includes(action.payload)) // si mi payload es todo devolveme todo sino devolveme los continentes
            return{
                ...state, 
                characters:statusFiltered,
                
            }
            case 'FILT_GENDER':
            const genn = state.allcharacters
            const genero = action.payload === 'All' ? genn : genn.filter(el => el.gender.includes(action.payload)) // si mi payload es todo devolveme todo sino devolveme los continentes
            return{
                ...state, 
                characters:genero,
                
            }
            case 'FILTER_LOCATION':
                const locati = state.allcharacters
            const ubi = action.payload === 'All' ? locati : locati.filter(el => el.location.includes(action.payload)) // si mi payload es todo devolveme todo sino devolveme los continentes
            return{
                ...state, 
                characters:ubi,
            }

            case 'GET_DETAIL':
                return{
                    ...state,
                    detail:action.payload
                }
                case 'RESET_DETAIL':
                 return{
               ...state,
                  detail:[]
                 }  
                 case 'FILTER_ORIGIN':
                    const origen = state.allcharacters
                    const filt = action.payload === 'All' ? origen : origen.filter(el => el.origin.includes(action.payload)) // si mi payload es todo devolveme todo sino devolveme los continentes
                    return{
                        ...state, 
                        characters:filt,
                    } 

        default:
            return state;
}
}
export default rootReducer;