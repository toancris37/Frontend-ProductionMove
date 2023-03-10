import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo,
            }
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
            }
        case actionTypes.PROCESS_LOGOUT:
            localStorage.setItem('accessToken', null)
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
            }
        default:
            return state;
    }
}

export default appReducer;