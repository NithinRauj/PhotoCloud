import actionTypes from "../constants/action-types";

const { SET_CURRENT_USER } = actionTypes

export const initialState = {
    currentUser: {}
};

export default function reducer(state, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}
