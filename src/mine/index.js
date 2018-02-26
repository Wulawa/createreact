import React, { Component } from 'react'
import { connect } from 'react-redux'
class minePage extends Component {
  render() {
    return (
      <div>userName1:{this.props.userData.userName}</div> 
    )
  }
}

export default connect(state => ({ // withRouter将match，location和history道具给被包装组件。
  userData: state.userData,  // connect注册需要的(mapStateToProps,mapDispatchToProps)(组件)生成容器组件
}))(minePage); 