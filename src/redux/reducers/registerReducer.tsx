import { AnyAction } from 'redux';
import * as registerActionTypes from '../actionTypes/registernActionTypes';
type FormAction = {
    type: string;
    payload: {
        field: string;
        fieldValue: string;
    }
};
interface IUserRegiserState {
    user_type: string;
    first_name: String;
    last_name: String;
    username: String;
    password: String;
    primary_phone_no: String;
    address: String;
    userid: String;
    services: string;
    secondary_phone_no: string;
}

export const initialState: IUserRegiserState = {
    user_type: "",
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    primary_phone_no: "",
    address: "",
    userid: "",
    services: "",
    secondary_phone_no: "",
}

export const userRegistrationReducer = (state = initialState,
    action: AnyAction) => {
    switch (action.type) {
        case registerActionTypes.ADD_CHANGE:
            return {
                ...state,
                [action.payload.field]: action.payload.fieldValue
            }
        case registerActionTypes.ADD_FILES:
            return {

            }

        default:
            return state;
    }
}

export interface IErrorState {
    error_email: boolean;
    error_mobile: boolean;
    error_password: boolean;
    error_confirmPassword: boolean;
    loading:boolean;
    toggle: string;
    message: string;
}
const initialErrorState: IErrorState = {
    error_email: false,
    error_mobile: false,
    error_password: false,
    error_confirmPassword: false,
    loading:false,
    toggle: 'false',
    message: ""
}

export const registerErrorReducer = (state: IErrorState = initialErrorState,
    action:AnyAction) => {
    switch (action.type) {
        case registerActionTypes.ADD_ERROR:
            console.log(action.payload.field)
            return {
                ...state,
                [action.payload.field]: true
            }
        case registerActionTypes.REMOVE_ERROR:
            return {
                ...state,
                [action.payload.field]: false
            }
        case registerActionTypes.SET_LOADING:
            return {
                ...state,
                loading: true
            }

        case registerActionTypes.REMOVE_LOADING:
            console.log('loading remove...')
            return {
                ...state,
                loading: false,
            }
        case registerActionTypes.ADD_ALERT:
            console.log(action);
            return {
                ...state,
                toggle:true,
                message:action.message,
            }
            case registerActionTypes.REMOVE_ALERT:
                return {
                    ...state,
                    toggle:false,
                    message:action.message,
                }
        default:
            return state
    }
}
type FileAction = {
    type: string;
    payload: {
        field: string;
        fieldValue: any;
    }
};
export interface IFileState {
    profile_pic: any,
}
export const fileState: IFileState = {
    profile_pic: '',
}
export const fileReducer = (
    state: IFileState = fileState,
    action: FileAction
): IFileState | any => {

    switch (action.type) {
        case registerActionTypes.ADD_FILES:
            console.log(action.payload.fieldValue);
            return {
                ...state,
                [action.payload.field]: action.payload.fieldValue
            }
        default:
            return state
    }
}