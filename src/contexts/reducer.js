import actionTypes from "../constants/action-types";

const { SET_CURRENT_USER, SET_PHOTOS } = actionTypes

export const initialState = {
    currentUser: {},
    photos: []
};

export default function reducer(state, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case SET_PHOTOS:
            return {
                ...state,
                photos: action.payload
            }
        default:
            return state;
    }
}
