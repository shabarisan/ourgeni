import axios from 'axios';
import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as userActionTypes from '../actionTypes/userActionTypes';
import configData from '../../constants.json';
type ThunkResult<R> = ThunkAction<any, {}, undefined, AnyAction>;
export const logIn =(userObj):ThunkResult<void> =>{
    return async(dispatch:Dispatch) =>{
        try{
            //const res = await axios.post('https://demo.smartstorez.com/ourgeniedemo/tempapi/user-login/',userObj);
            const res = await axios.post(configData.userLoginApiUrl,userObj);
            if(res.data.success == true){
               //dispatch({type:userActionTypes.ADD_USER,payload:res.data.result[0][0]})
                localStorage.setItem("user_name",res.data.data.first_name +' '+ res.data.data.last_name);
                localStorage.setItem("mobile_no",res.data.data.mobile_no);
                localStorage.setItem("UserId",res.data.data.id);
                localStorage.setItem('CityID',res.data.data.city_id);
                localStorage.setItem("UserEmail",res.data.data.email);
                dispatch({type:userActionTypes.ADD_LOG_ALERT,error_message:res.data.message})
                setTimeout(function(){
                    window.location.href="/user-profile"
                },3000);
            }
            if(res.data.success == false){
               dispatch({type:userActionTypes.ADD_LOG_ALERT,error_message:res.data.message})
            }
        }
        catch(err){

        }
    }
}
export const removeAlert =() =>({
    type:userActionTypes.REMOVE_LOG_ALERT
})
export const logOut = ()=>({
    type:userActionTypes.LOG_OUT
})
export const getUser = ()=>({
    type:userActionTypes.GET_USER
})