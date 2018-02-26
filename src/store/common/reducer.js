import * as type from './actionType'
let defaultState = {
    userName: '',
    age: 18
}

export const userData = (state = defaultState, action) => {
  switch(action.type){
    case type.USERINFO:
    return { ...state, ...action }
    default:
    return { ...state }
  }
}