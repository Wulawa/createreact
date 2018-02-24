import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { getUserInfo } from '@/store/common/action';

// import logo from './logo.svg';
// import { NavLink } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import RouterComponents from './router'
import './App.less';
class App extends Component {
  state = {
    tabActive: '/',
  }
  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
        <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              hidden: !this.state.hidden,
            });
          }}
        >
          Click to show/hide tab-bar
        </a>
        <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              fullScreen: !this.state.fullScreen,
            });
          }}
        >
          Click to switch fullscreen
        </a>
      </div>
    );
  }
  componentDidMount(){
    this.props.getUserInfo();
  }
  checkTab(tabActive) {
    this.setState({ tabActive });
    this.props.history.push(tabActive)
  }
  render() {
    return (
      <div className="App">
        {this.props.userData.userName}
        <RouterComponents></RouterComponents>
        {/* <ul style={styles.nav} className="tabbar">
          <NavLink to="/">home</NavLink>
          <NavLink to="/create">create</NavLink>
          <NavLink to="/main">main</NavLink>
        </ul> */}
        <TabBar
         unselectedTintColor="#949494"
         tintColor="#33A3F4"
         barTintColor="white"
         >
          <TabBar.Item
            title="首页"
            key="home"
            onPress={() => this.checkTab('/')}
            selected={this.state.tabActive === '/'}
            icon={<svg className="icon" aria-hidden="true" slot="icon">
              <use xlinkHref="#icon-home"></use>
            </svg>
            }
            selectedIcon={<svg className="icon" aria-hidden="true" slot="icon">
            <use xlinkHref="#icon-home"></use>
          </svg>
            }
          >
          </TabBar.Item>
          
          <TabBar.Item
            title="创建直播"
            key="create"
            selected={this.state.tabActive === 'create'}            
            onPress={() => this.checkTab('create')}            
            icon={<svg className="icon" aria-hidden="true" slot="icon">
              <use xlinkHref="#icon-chuangjian"></use>
            </svg>
            }
            selectedIcon={<svg className="icon" aria-hidden="true" slot="icon">
            <use xlinkHref="#icon-chuangjian"></use>
          </svg>
            }
          >
          </TabBar.Item>
          
          <TabBar.Item
            title="我的"
            key="mine"
            selected={this.state.tabActive === 'mine'}                     
            onPress={() => this.checkTab('mine')}   
            icon={<svg className="icon" aria-hidden="true" slot="icon">
              <use xlinkHref="#icon-my"></use>
            </svg>
            }
            selectedIcon={<svg className="icon" aria-hidden="true" slot="icon">
            <use xlinkHref="#icon-my"></use>
          </svg>
            }
          >
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

const styles = {};

styles.fill = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};

styles.TabBar = {
  position: "fixed",
  bottom: 0,
  height: "40px",
};

export default withRouter(connect(state => ({ // withRouter将match，location和history道具给被包装组件。
  userData: state.userData,  // connect注册需要的(mapStateToProps,mapDispatchToProps)(组件)生成容器组件
}), {
  getUserInfo
})(App)); 