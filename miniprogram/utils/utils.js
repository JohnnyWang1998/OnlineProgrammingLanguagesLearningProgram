module.exports={
  formatTime: formatTime,
  getUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo'] === false) {
            // 已拒绝授权
            reject()
          } else {
            wx.getUserInfo({
              success(res) {
                const userInfo = res.userInfo
                resolve(userInfo)
              }
            })
          }
        }
      })
    })
  }
}
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}