// var time = require('C:/Luckin/miniprogram-cloud/miniprogram/utils/utils.js');
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'python-866586'
})
const db = cloud.database({
  env: 'python-866586'
})

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID
  const video = event.video
  var timestamp = Date.parse(new Date());
  var date = new Date(timestamp);
  //年  
  var Y = date.getFullYear();
  //月  
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  //日  
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var time = Y+'/'+M+'/'+D
  await db.collection('myFavorite').add({
    data: {
      _openid:user,
      createTime: time,
      video: event.video
    },
  })

  return {
    event,
    openid: wxContext.OPENID,
  }
}