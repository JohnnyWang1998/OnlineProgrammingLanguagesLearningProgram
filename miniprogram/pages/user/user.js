// pages/user/user.js
const util = require('../../utils/utils')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
  },

  onTapLogin(event) {

    this.setData({
      userInfo: event.detail.userInfo
    })
  },

  onTapFavourite() {
    wx.navigateTo({
      url: '../favorite/favorite',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  onTapHistory() {
    wx.showToast({
      icon: 'none',
      title: '先去收藏看看吧'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (){
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
    })
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