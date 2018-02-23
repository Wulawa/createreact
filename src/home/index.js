import React, { Component } from 'react'
import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';
import './home.less';

class HomePage extends Component {
  state = {
    banners:[1,2,3]
  }
  componentWillMount(){

  }
  render() {
    return (
      <div id='homePage'>
        <Carousel
          autoplay={false}
          infinite
          selectedIndex={1}
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {this.state.banners.map((item) => <div>{item}</div>)}
        </Carousel>
      </div> 
    )
  }
}
export default HomePage