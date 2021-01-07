export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const SET_AUTH_INFO = 'SET_AUTH_INFO';

export const authLogin = () =>{
    return{
        type:AUTH_LOGIN,
        payload:true,
    }
}
export const authLogout = () =>{
    return{
        type:AUTH_LOGOUT,
        payload:false
    }
}

export const setuserID = (ID) =>{
    
    return{
        type:SET_AUTH_INFO,
        payload:ID
    }
}
