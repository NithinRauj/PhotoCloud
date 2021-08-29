import actionTypes from "../constants/action-types";

const { SET_CURRENT_USER, SET_PHOTOS, SET_MODAL_PROPS, SET_PHOTOS_PATH } = actionTypes

export const initialState = {
    currentUser: {},
    photos: [],
    modalProps: {},
    photosPath: 'root'
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
        case SET_MODAL_PROPS:
            return {
                ...state,
                modalProps: action.payload
            }
        case SET_PHOTOS_PATH:
            return {
                ...state,
                photosPath: action.payload
            }
        default:
            return state;
    }
}
