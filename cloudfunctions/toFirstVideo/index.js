// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'python-866586'
})

// 云函数入口函数

const db = cloud.database({
  env: 'python-866586'
})

exports.main = async (event, context) => {
  id = event.id;
  return await db.collection('Videos').where({
    lesson_id: 1,
    class_id: parseInt(id)
  }).get();
}