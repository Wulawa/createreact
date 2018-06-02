import * as type from '../actionType'
import { Map } from 'immutable'
let defaultState = Map();

export const userData = (state = defaultState, action) => {
  switch(action.type){
    case type.USERINFO:
    return state.merge(action.data);
    default:
    return state;
  }
}

export const loginUrl = (state = defaultState, action) => {
  switch(action.type){
    case type.LOGIN_URL:
    return state.merge(action);
    default:
    return state;
  }
}

export const isLogin = (state = defaultState, action) => {
  switch(action.type){
    case type.IS_LOGIN:
    return state.merge(action);
    default:
    return state;
  }
}