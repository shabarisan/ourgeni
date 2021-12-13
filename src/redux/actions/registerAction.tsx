import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AnyAction, Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import * as registerActionTypes from '../actionTypes/registernActionTypes';
import configData from '../../constants.json';

type ThunkResult<R> = ThunkAction<any, {}, undefined, AnyAction>;

export const addChange = (field:any,fieldValue:any) =>({
    type: registerActionTypes.ADD_CHANGE,
    payload:{
        field,
        fieldValue
    }
})
export const addFiles =(field:any,fieldValue:any) =>({
    type: registerActionTypes.ADD_FILES,
    payload:{
        field,
        fieldValue
    }
})
export const addError = (field:any) =>({
    type: registerActionTypes.ADD_ERROR,
    payload:{
        field
    }
})

export const removeError = (field:any) =>({
    type: registerActionTypes.REMOVE_ERROR,
    payload:{
        field
    }
})
export const SetLoading = () =>({
    type:typeof registerActionTypes.SET_LOADING,
})
export const removeLoading = () =>({
    type: registerActionTypes.REMOVE_LOADING,
})
export const addAlert = (value) =>(
    {type:registerActionTypes.ADD_ALERT,message:value}
)
export const removeAlert = () =>(
    {type:registerActionTypes.REMOVE_ALERT,message:""}
)

export const addUser = (userObj):ThunkResult<void> =>{
    return async(dispatch:Dispatch) =>{
        try{
            dispatch({type:registerActionTypes.SET_LOADING,});
            const res = await axios.post(configData.userRegitrationApiUrl,userObj);
            
            if(res.data.success == true){
                //console.log("add sucess");
                dispatch(addAlert(res.data.message))
                window.location.href="/login-with-otp"
            }
            
            if(res.data.success == false)
            {
                for (const key in res.data.data) {
                    let keys = key;
                    let value = res.data.data[key];
                    dispatch(addAlert(value));
                }
            }
            
            // if(res.data.statusMessage === "success"){
            //     console.log("add sucess");
            //     window.location.href="/login"
            // }
            // if(res.data.statusMessage == "failed"){
            //     console.log(res.data.result.error_message);
            //     dispatch({type:registerActionTypes.ADD_ALERT,message:res.data.result.error_message})
            // }
            // if( res.data.statusCode === 300){
            //     dispatch(addAlert(res.data.result.error_message))
            // }
            // dispatch({type:registerActionTypes.REMOVE_LOADING})
        }catch(err){
            console.error(err);
        }
    }
}