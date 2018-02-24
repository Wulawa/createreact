import * as types from './actionType.js'
// import service from '@/service'

export const getUserInfo = () => {
  return dispatch => {
    try{
      // let result = await service.getUserInfo();
      debugger;
      dispatch({
        type: types.USERINFO,
        userInfo: {
          userName: 'lisi',
          age: 19
        },
      })
    }catch(err){
      console.error(err);
    }
  }
}