// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'python-866586'
})
const db = cloud.database({
  env: 'python-866586'
})
//此函数用来获取openid
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const userId = wxContext.OPENID
  const param = event.param
  return {
    userId,
    param
  }
}