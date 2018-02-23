import service from './request'

class http extends service {
  async getBanners(param){
    try{
      if(!param) param = {}
      const options = Object.assign({
        pageNum: 1,
        pageSize: 5,
        photoLive: 1
      },param)
      const result = await this.axios('get', '/banner', options);
      if(result && result.code === 0){
        return result.data;      
      } else {
        const  err = {
          tip: '获取banner失败',
          response: result,
          data: options,
          url: '/banner',
        }
        throw err
      }
    } catch (err){
      throw err;
    }
  }
}
export default new http()