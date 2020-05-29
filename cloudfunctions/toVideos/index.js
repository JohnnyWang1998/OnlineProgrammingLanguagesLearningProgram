// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'python-866586'
})

// 云函数入口函数

const db = cloud.database({
  env: 'python-866586'
})

const MAX_LIMIT = 100
// 云函数入口函数
exports.main = async (event, context) => {
  const id = event.id
  const countResult = await db.collection('Videos').where({
    class_id: parseInt(id)
  }).count()
  const total = countResult.total
  const batchTimes = Math.ceil(total / 100)
  const tasks = []
  for (let i = 0; i < batchTimes; i++){
    const promise = db.collection('Videos').where({
      class_id: parseInt(id)
    })
    .skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }

    return await Promise.all(tasks)
}