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
使用单独的模块或文件来定义 action type 常量并不是必须的，甚至根本不需要定义。对于小应用来说，使用字符串做 action type 更方便些。不过，在大型应用中把它们显式地定义成常量还是利大于弊的。参照 减少样板代码 获取更多保持代码简洁的实践经验。


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
