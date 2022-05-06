const initialState = {
    characters:[],
    allCharacters:[],
    occupations: [],
    detail:[]
}


function rootReducer (state=initialState,action) {
switch(action.type){
    case 'GET_CHARACTERS':
        return {
            ...state,
            characters:action.payload,
            allCharacters:action.payload,
        }
        case 'FILTER_BY_STATUS' :
            const allCharacters=state.allCharacters
             const statusFilter = action.payload === 'All' ? allCharacters : allCharacters.filter(el => el.status ===action.payload)
             return {
                 ...state,
                 characters:statusFilter,

             }
             case 'GET_OCCUPATIONS':
               return {
                   ...state,
                   occupations:action.payload
               }
              case 'FILTER_CREATED':
                
                const createdFilter = action.payload === 'created' ? state.allCharacters.filter(ch => ch.createInDb) : state.allCharacters.filter(ch => !ch.createInDb)
                return {
                    ...state,
                    characters: action.payload === 'All' ? state.allCharacters : createdFilter    
                }
                case 'ORDER_BY_NAME':
                    const order = action.payload === 'asc' ? 
                    state.characters.sort(function(a, b) {
                        if(a.name >b.name) {
                            return 1;
                        }
                        if(a.name < b.name) {
                            return -1;
                        }
                        return 0;
                    }):
                    state.characters.sort(function(a, b) {
                        if(a.name>b.name) {
                            return -1;
                        }
                        if(a.name<b.name){
                            return 1
                        }
                        return 0;

                    })
                    return{
                        ...state,
                        characters:order
                    }
                    case 'GET_NAME_CHARCATERS' : {
                        return{
                            ...state,
                            characters:action.payload
                        }
                    }
                    case 'POST_CHARACTERS' :
                        return {
                            ...state
                        }
                        case 'GET_DETAIL' :
                            return {
                                ...state,
                                detail:action.payload
                            }
                            case 'RESET_BREAKING':
                            return{
                                ...state,
                                detail:[]
                            }
       
                 default:
            return state;
}
}

export default rootReducer;