import * as types from './actionType.js'
// import service from '@/service'

export const getUserInfo = () => {
  return dispatch => {
    try{
      // let result = await service.getUserInfo();
      dispatch({
        type: types.USERINFO,
        userName: 'lisi',
        age: 19,
        // ...result
      })
    }catch(err){
      console.error(err);
    }
  }
}