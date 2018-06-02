import * as types from '../actionType.js'
// import service from '@/service'

/*           redux-sagas                  */
export const getUserInfo = () => ({ type: types.GET_USERINFO })

/*           redux-thunk                  */
// export const getUserInfo = () => {
//   return async dispatch => {
//     try{
//       let result = await service.getUserInfo();
//       dispatch({
//         type: types.USERINFO,
//         userName: 'lisi',
//         age: 19,
//         // ...result
//       })
//     }catch(err){
//       console.error(err);
//     }
//   }
// }