import { AUTH_LOGIN, AUTH_LOGOUT, SET_AUTH_INFO } from '../action/index'

const initState = {
    login: false,
    userID: null
}

const reducer = (state = initState, action) => {
    switch(action.type){
        case AUTH_LOGIN: {
            return {
                ...state,
                login: action.payload,
            }
        }
        case AUTH_LOGOUT:{
            return {
                ...state,
                login: action.payload
            }
        }
        case SET_AUTH_INFO:{
            const userID = action.payload
            return{
                ...state,
                userID: userID
            }
        }
        default:{
            return state
        }
    }
}

export default reducer;