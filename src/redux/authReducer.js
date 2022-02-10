import * as types from './actionTypes';

const initialState = {
    user: {
        activated: false,
    },
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN:
            return {
                ...state,
                user: {
                    id: action.payload.id,
                    username: action.payload.username,
                    activated: true,
                }
            }
        case types.LOGOUT:
            return {
                ...state,
                user: {
                    activated: false,
                }
            }
        default:
            return state;
    }
}

export default authReducer;