import React, { Component } from 'react'
import { Carousel } from 'antd-mobile';
import service from '@/service'
import './home.less';

class HomePage extends Component {
  state = {
    banners:[]
  }
  async componentDidMount(){
    const banners = await service.getBanners();
    console.log(banners)
    this.setState({ banners })
  }
  render() {
    return (
      <div id='homePage'>
        <Carousel
          autoplay={true}
          infinite
          selectedIndex={1}
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {this.state.banners.map((item,i) => <a key={i} src={item.link} ><img src={item.picUrl} alt='banner' className='banner'/></a>)}
        </Carousel>
      </div> 
    )
  }
}
export default HomePage