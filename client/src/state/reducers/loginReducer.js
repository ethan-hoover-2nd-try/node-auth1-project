import * as types from '../types';

const initialState = {
    isLoadingLOGIN: false,
    successLOGIN: false,
    user: ''
};

export const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.LOGIN_START:
            return {
                ...state,
                isLoadingLOGIN: true,
                successLOGIN: false
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                isLoadingLOGIN: false,
                successLOGIN: true,
                user: action.payload
            };
        case types.LOGIN_FAILURE:
            return {
                ...state,
                isLoadingLOGIN: false,
                successLOGIN: false,
                user: ''
            };
            default:
                return state;
    }
}