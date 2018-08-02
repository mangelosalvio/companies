import axios from 'axios';
import setAuthToken from './../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import jwt_decode from 'jwt-decode';


export const loginUser = ({id_no, password}, history) => dispatch => {
    axios.post('/api/users/login', {id_no, password})
    .then((response) => {
        const  { token } = response.data; 

        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        //Decode token to get user data
        const decoded = jwt_decode(token);
        console.log(decoded);
        //Set current user
        dispatch(setCurrentUser(decoded))
        history.push('/');
    })
    .catch((err) => {
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    });  
};

export const setCurrentUser = (decoded) => {
    return {
        type : SET_CURRENT_USER,
        payload : decoded
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}