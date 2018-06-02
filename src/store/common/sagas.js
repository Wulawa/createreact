// import { takeEvery } from 'redux-saga'
import {take, call, put, fork} from 'redux-saga/effects'
import { fromJS } from 'immutable'
import * as types from '../actionType.js'
import service from '@/service'
// function * targetUser(currUser) {
//     while(true) {
//         const { id } = yield take(types.GET_TARGET_USERINFO);
//         const targetUserResponse = yield call(service.getUserInfo, id);
//         const targetUser = fromJS(targetUserResponse.data);
//         if(targetUserResponse.data){
//             debugger;
//             yield put({ type: types.HAS_USER_POWER, power: targetUser.equals(currUser)})            
//             yield put({type: types.TARGET_USERINFO, data: targetUser});            
//         } else {
//             yield put({type: types.RESPONSE_ERROR, data: targetUserResponse});
//         }
//     }
// }
function * userInfo () {
    while(true){
        yield take(types.GET_USERINFO);
        try{
            const response = yield call(service.getUserInfo);
            const userData = response.data ;
            yield put({type: types.USERINFO, data: fromJS(userData)});
            yield put({ type: types.IS_LOGIN, isLogin: true });
        } catch(err){
            const mock = {
              userName: 'lisi',
              age: 19,
            }
            yield put({type: types.USERINFO, data: fromJS(mock)});
            yield put({ type: types.LOGIN_URL, url: 'http://www.baidu.com' });            
            yield put({ type: types.IS_LOGIN, isLogin: false });
        }
    }
} 

function * commonEntry() {
    yield fork(userInfo);
}
export default commonEntry;