import { AnyAction } from "redux";
import * as userActionTypes from '../actionTypes/userActionTypes'
export const userReducer = (state = { toggle: false },
    action: AnyAction) => {
    //console.log(action.error_message)
    switch (action.type) {
        case userActionTypes.ADD_LOG_ALERT:
            return {
                ...state,
                toggle: true,
                error_message: action.error_message
            }
        case userActionTypes.REMOVE_LOG_ALERT:
            return {
                ...state,
                toggle: false,
                error_message: ""
            }
        case userActionTypes.GET_USER:
            return {

            }
            case userActionTypes.ADD_USER:
                return {
                    ...state,
                    ...action.payload
                }
        default:
            return state;
    }

}