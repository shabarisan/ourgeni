import { createStore, combineReducers,applyMiddleware, AnyAction } from 'redux';
import {userRegistrationReducer,fileReducer,registerErrorReducer} from './reducers/registerReducer';
import {userReducer } from './reducers/userReducer';
import thunk, { ThunkMiddleware } from 'redux-thunk';
const rootReducer = combineReducers({
    userRegistrationReducer,
    fileReducer,
    registerErrorReducer,
    userReducer
});
const store = createStore(rootReducer,applyMiddleware(thunk as ThunkMiddleware<{}, AnyAction>));
export default store; 