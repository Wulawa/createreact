# 构建react+react-router+redux+antd项目

### 快速开始

```shell
npm install -g create-react-app       /* 安装create-react-app，建议使用cnpm */

create-react-app myapp                 /* 使用命令创建应用，myapp为项目名称 */

cd myapp                                        /* 进入目录，然后启动 */

npm start

 // 显示webpake文件  需要先commit
npm run eject

```

按以上执行，即可快速创建React开发环境。

打开http://localhost:3000/ 查看

### 环境配置介绍：

添加LESS

安装：
```shell
npm install less less-loader --save-dev

```

修改webpack.config.dev.js

```javascript
const pxtorem = require('postcss-pxtorem');
.
.
.
{
    // 修改为加载两种
    test: /\.(css|less)$/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
        },
      },
      // 添加以下这个语句块
      {
          loader: require.resolve('less-loader')
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              browsers: [ '>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9', ],
              flexbox: 'no-2009',
            }),
            // 添加以下这句 //px自动转rem工具
            pxtorem({ rootValue: 100, propWhiteList: [] })
          ],
        },
      }
    ],
  },
```

### 安装路由

```shell
npm i -save react-router
```
##### <Route>是如何渲染的？

当一个路由的path匹配成功后，路由用来确定渲染结果的参数有三种。只需要提供其中一个即可。

> component ： 一个React组件。当带有component参数的route匹配成功后，route会返回一个新的元素，其为component参数所对应的React组件（使用React.createElement创建）。
> render ： 一个返回React element的函数[注5]。当匹配成功后调用该函数。该过程与传入component参数类似，并且对于行级渲染与需要向元素传入额外参数的操作会更有用。
> children ： 一个返回React element的函数。与上述两个参数不同，无论route是否匹配当前location，其都会被渲染。

基本写法

```javascript
import {
  BrowserRouter, Switch,  Route
} from 'react-router-dom'

<BrowserRouter>
  <Switch>
    <Route exact path='/' compontent={ Button }/>
    <Route path='/detail' compontent={ detail }/>
    <Route path='/mine' compontent={ mine }/>
  </Switch>
</BrowserRouter>

```

按需加载

使用react-loadable插件（官方方法）[文档](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/code-splitting.md)

```shell
npm i -save react-loadable
```
```javascript
const LoadingComponent = () => <div>Loading...</div>
const home = Loadable({
  loader: () => import('./home'),
  loading:LoadingComponent
})
```
[更多方法](https://www.cnblogs.com/alan2kat/p/7754846.html)

工程化路由配置

```javascript
const routes = [
  {
    path: "/",
    exact: true,
    component: home
  },...
]
const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      <route.component {...props} routes={route.routes} />
    )}
  />
);
// 生成路由组件
export default () => (
  <Switch>
    {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
  </Switch>
)

```

### 安装antd

```shell
npm i -save antd
```
配置按需加载
[antd官方介绍](https://mobile.ant.design/docs/react/introduce-cn)

create-react-app 项目问题：

如果执行eject  会因为package添加babel解析语法，而忽略.babelrc文件配置

解决方法：
1：在webpack里配置
```javascript
{
    test: /\.(js|jsx)$/,
    include: paths.appSrc,
    loader: 'babel',
    query: {
        cacheDirectory: true,
        plugins: [["import", { libraryName: "antd", style: "css"}]]
    }
},
```

2：干掉package里的babelrc 写入.babelrc文件

参考：
[issues](facebookincubator/create-react-app#1066)

[source](https://github.com/ant-design/create-react-app-antd/blob/fdc0199b50f893a6b7ded8fba315e8f606e24dac/package.json#L86-L90)


## 添加redux
```shell
  npm i redux  //状态管理
  npm i react-redux  // 结合react
  npm i redux-thunk ...// 异步中间件
```
```javascript
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

```

```javascript
// ./store
import { createStore, combineReducers, applyMiddleware } from 'redux'
import * as home from './home/reducer' //
import thunk from 'redux-thunk'

const store = createStore(
  combineReducers({...home}),  //整合reducer
  applyMiddleware(thunk)  //添加中间件
);

export default store
```
##### 创建action

```javascript
import * as types from './actionType.js'  //
import service from '@/service'
//异步处理dispatch
export const getUserInfo = () => {
  return async dispatch => {
    try{
      let result = await service.getUserInfo();
      dispatch({
        type: types.USERINFO,
        dataList: result,
      })
    }catch(err){
      console.error(err);
    }
  }
}
```

关于types文件
使用单独的模块或文件来定义 action type 常量并不是必须的，甚至根本不需要定义。对于小应用来说，使用字符串做 action type 更方便些。不过，在大型应用中把它们显式地定义成常量还是利大于弊的。参照 减少样板代码 获取更多保持代码简洁的实践经验。3


在模块中应用 action
```javascript
import { connect } from 'react-redux';
import { getUserInfo } from '@/store/common/action';

class App extends Component {
  componentDidMount() {  //组件加载后获取用户信息
    this.prop.getUserInfo()
  }
  render(){
    ...
    return (<div>{this.prop.userInfo}</div>)
    ...
  }
}
export default withRouter(connect(state => ({ // withRouter将match，location和history道具给被包装组件。
  userData: state.userData,  // connect注册需要的(mapStateToProps,mapDispatchToProps)(组件)生成容器组件
}), {
  getUserInfo
})(App));
```
##### 添加reducer
dispatch 时 redux 触发 reducer
```javascript
import * as type from './actionType'
let defaultState = {
  userName: '',
}

export const userData = (state = defaultState, action) => {
  switch(action.type){
    case type.USERNAME:
    return { ...state, ...action }
    default:
    return { ...state }
  }
}

```
### redux工作流程

组件中触发action -> 进行对新旧数据的整合 -> 触发dispatch -> reducer响应 -> 修改stroe ->获取prop数据


### 热重载

因为create-react-app只做到了live-reload 并且无法监听组件change,因此添加hot reload

安装react-hot-loader

[具体使用文档](https://www.npmjs.com/package/react-hot-loader)

## redux-saga

比较繁琐的一章
首先需要了解Generator异步处理方法[Generator](Generator)
redux-saga 使用了 ES6 的 Generator 功能，让异步的流程更易于读取，写入和测试。
配置 
```javascript
  import { createStore, combineReducers, applyMiddleware } from 'redux'
  import createSagaMiddleware from 'redux-saga' // redux-saga 核心函数创建一个中间件
  import * as home from './common/reducer'
  import commonSaga from './common/sagas'

  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    combineReducers({ ...home }),    // 绑定reducer 到 redux
    applyMiddleware(sagaMiddleware)  // 添加saga中间件到 redux
  );
  sagaMiddleware.run(commonSaga);  // 将saga处理函数绑定到中间件

  export default store

```
此时redux-saga工作流程
应用场景触发action函数，由saga捕获dispatch，saga通过封装的Generator进入异步状态，返回结果后进行pull（dispatch），reducer进行处理
```javascript
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
```
通过while函数，当一次状态处理结束后，再次进入捕获阶段
[saga文档]('https://redux-saga-in-chinese.js.org/')
  #### Generator
  es6 协程 异步处理
  形式上，Generator 函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的内部状态
  ```javascript
  function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
  }

  var hw = helloWorldGenerator(); // 此时helloWorldGenerator不会有任何输出
  ```
  现在我们定义的helloWorldGenerator函数内部有三个状态hello， world， ending

  >下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止。换言之，Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。
  
  ```javascript
  hw.next()
  // { value: 'hello', done: false }

  hw.next()
  // { value: 'world', done: false }

  hw.next()
  // { value: 'ending', done: true }

  hw.next()
  // { value: undefined, done: true }
  ```
  next方法执行后返回 当前状态返回的值， done为true时后面没有状态；
  next函数可接受一个参数，为当前状态的返回值  例如: yield 返回值

  Generator创建时会生成 Iterator对象 所以 可以通过 for of 进行遍历
  ```javascript
  function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
  }

  for (let v of foo()) {
    console.log(v);
  }
  // 1 2 3 4 5
  ```
  <h5>for of便利时会自动执行next();</h5>
  因此利用for...of循环，可以写出遍历任意对象（object）的方法。原生的 JavaScript 对象没有遍历接口，无法使用for...of循环，通过 Generator 函数为它加上这个接口，就可以用了。
  例：
  ```javascript
  function* objectEntries(obj) {
    let propKeys = Reflect.ownKeys(obj);

    for (let propKey of propKeys) {
      yield [propKey, obj[propKey]];
    }
  }

  let jane = { first: 'Jane', last: 'Doe' };

  for (let [key, value] of objectEntries(jane)) {
    console.log(`${key}: ${value}`);
  }
  // first: Jane
  // last: Doe
  ```
  除了for...of循环以外，扩展运算符（...）、解构赋值和Array.from方法内部调用的，都是遍历器接口。这意味着，它们都可以将 Generator 函数返回的 Iterator 对象，作为参数。
  ```javascript
  function* numbers () {
    yield 1
    yield 2
    return 3
    yield 4
  }

  // 扩展运算符
  [...numbers()] // [1, 2]

  // Array.from 方法
  Array.from(numbers()) // [1, 2]

  // 解构赋值
  let [x, y] = numbers();
  x // 1
  y // 2

  // for...of 循环
  for (let n of numbers()) {
    console.log(n)
  }
  // 1
  // 2
  ```

## immutable

数据结构处理

## propTypes

数据类型验证