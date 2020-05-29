// miniprogram/pages/favorite/favorite.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: "deleteFavorite",
      data: {},
      success: res => {
        this.setData({
          _openid: res.result.userId
        })
        // console.log(this.data._openid)
        const db = wx.cloud.database({
          env: 'python-866586'
        })
        db.collection('myFavorite').where({
          _openid: this.data._openid,
        }).get({
          success: res => {
            this.setData({
              videoList:res.data
            })
              const a = res.data[0].createTime
            console.log(formatTime(a))
          }
        })

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})