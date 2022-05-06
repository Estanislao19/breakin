import axios from 'axios'


export function getCharacters () {
return async function(dispatch){
    var json = await axios.get('/characters');
    console.log('e',json)
    return dispatch({
        type:'GET_CHARACTERS',
        payload:json.data
    });
};
};

export function filterCharactersByStatus(payload) {
    return {
        type:'FILTER_BY_STATUS',
        payload
    }
}

export function filterCreated(payload) {
    return{
        type:'FILTER_CREATED',
        payload
    }
}
export function orderByName(payload) {
    return {
        type:'ORDER_BY_NAME',
        payload
    }
}
export function getNameCharacters(name){
    return async function (dispatch){
        var json = await axios.get('/characters?name=' + name)
        return dispatch ({
            type:'GET_CHARACTERS',
            payload:json.data
        })
    }
}

export function getOccupations () {
    return async function (dispatch) {
        var json =await axios.get('/occupations')
        return dispatch({
            type: 'GET_OCCUPATIONS',
            payload:json.data
        })
    }
}
export function postCharacters (payload) {
    return async function (dispatch){
        var json = await axios.post('/character', payload)
        return {
            json
        }
    }
}
export function resetBeaDetail(payload) {
    return {
        type:'RESET_BREAKING',
        payload
    }
}
export function getDetail (id) {
return async function (dispatch){
    var json = await axios.get('/characters/' + id);
    return dispatch ({
        type:'GET_DETAIL',
        payload:json.data
    })
}
}