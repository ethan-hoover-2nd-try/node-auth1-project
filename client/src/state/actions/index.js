import * as types from '../types'; // types can be used as 'types.<YOUR-TYPE>'
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import {logout} from '../../components/withAuth/services';

// ACTIONS LIVE HERE

// LOGIN
export const login = (username, password) => dispatch => {
    dispatch({ type: types.LOGIN_START });
    return axiosWithAuth()
    .post('/auth/login', {
        username: username,
        password: password
    })
    .then(res => {
        localStorage.setItem('token', res.status.token);
        if(res.data.user_id) {
            localStorage.setItem('user_id', res.data.user_id);
        }
        console.log(res.data);
        dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
    })
    .catch(res => {
        logout(callback => {
            alert(res);
        });
        dispatch({
            type: types.LOGIN_FAILURE,
            payload: res.data
        });
    });
};