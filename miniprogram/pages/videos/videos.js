// pages/videos/videos.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topNum: 0,
    classId: '',
    _openid: '',
    video: {},
    favorite: false,
    videoURL: "",
    title: "",
    intro: "",
    actionSheetHidden: true,
    actionSheetItems: ['item1', 'item2', 'item3'],
    videoList: [{
      id: '',
      name: '',
      open: false,
      pages: [{
        _id: '',
        name: "",
        lesson_name: ''
      }]
    }]
  },

  kindToggle: function(e) {
    var id = e.currentTarget.id,
      list = this.data.videoList;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      videoList: list
    });
  },

  /**
   * 点击列表更新页面资源
   */

  nextVideo: function(event) {
    var id = event.currentTarget.dataset.gid
    const db = wx.cloud.database({
      env: 'python-866586'
    })

    db.collection('Videos').where({
      _id: id
    }).get({
      success: res => {
        let d = res.data[0]
        this.setData({
          title: d.name,
          intro: d.intro,
          videoURL: d.url,
          video: d,
        })
      }
    })
    this.isFavorite()
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },
  /**
   * 添加收藏
   */
  addFavorite: function() {
    if(!this.data._openid){
      wx.showToast({
        icon: 'none',
        title: '登陆后才可以收藏哦'
      })
    }else{
    wx.cloud.callFunction({
      name: "addFavorite",
      data: {
        video: this.data.video
      },
      success: res => {
        console.log('收藏成功')
      },
      fail: console.error
    })
    this.setData({
      favorite: true
    })
    }
  },
  /**
   * 取消收藏
   */
  cancelFavorite: function() {
    const db = wx.cloud.database({
      env: 'python-866586'
    })

    db.collection('myFavorite').where({
      _openid: this.data._openid,
      video: this.data.video
    }).get().then(res => {
      console.log(res.data)
      const id = res.data[0]._id
      db.collection('myFavorite').doc(id).remove().then(
        console.log
      )
    })
    this.setData({
      favorite: false
    })
  },

  actionSheet: function() {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var init = options.cid
    var fav = options._id
    if (init) {
      this.getInitVideo(init)
      this.getVideoList(init)
    }
    if (fav) {
      this.getFavVideo(fav)
      const db = wx.cloud.database({
        env: 'python-866586'
      })
      db.collection('Videos').doc(fav).get({
        success:(res=>{
          const param = res.data.class_id
          console.log('class id:')
          console.log(param)
          this.getVideoList(param)
        })
      })
    }
    this.isFavorite()
  },

  isFavorite: function() {
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
          video: this.data.video
        }).get({
          success: res => {
            // console.log(res)
            if (res.data.length > 0) {
              this.setData({
                favorite: true
              })
            } else {
              this.setData({
                favorite: false
              })
            }
          }
        })

      }
    })
  },

  //从收藏页面跳转
  getFavVideo: function(id) {
    const db = wx.cloud.database({
      env: 'python-866586'
    })
    db.collection('Videos').where({
      _id: id
    }).get({
      success: res => {

        let d = res.data[0]
        this.setData({
          title: d.name,
          intro: d.intro,
          videoURL: d.url,
          video: d
        })
      }
    })
  },

  /**
   * 显示本页面第一个视频
   */
  getInitVideo: function(classId) {
    const db = wx.cloud.database({
      env: 'python-866586'
    })
      db.collection('Videos').where({
        lesson_id: 1,
        class_id: parseInt(classId)
      }).get({
        success: res =>{
        let d = res.data[0]
        this.setData({
          title: d.name,
          intro: d.intro,
          videoURL: d.url,
          video: d
        })
      }
    })
  },

  /**
   * 显示列表
   */
  getVideoList: function(classId) {
    const db = wx.cloud.database({
      env: 'python-866586'
    })
    wx.cloud.callFunction({
      name: 'toVideos',
      data: {
        id: classId,
      },
    success: res => {
      var list = []
      var allList = []
      for(let k = 0; k < res.result.length;k++){
      var slength = res.result[k].data.length
      for (var i = 0; i < slength; i++) {

        var obj = {
          _id: res.result[k].data[i]._id,
          name: res.result[k].data[i].name,
          lesson_name: res.result[k].data[i].lesson,
          lesson_id: res.result[k].data[i].lesson_id

        }
        allList.push(obj)
      }
    }
      var maxLessonId = 0
      for (var j = 0; j < allList.length; j++) {
        if (maxLessonId < allList[j].lesson_id) {
          maxLessonId = allList[j].lesson_id;
        }
      }
      for (var k = 0; k < maxLessonId; k++) {
        var obj1 = []
        for (var j = 0; j < allList.length; j++) {
          if (allList[j].lesson_id == (k + 1)) {
            var temp = {
              _id: allList[j]._id,
              name: allList[j].name,
              lesson_name: allList[j].lesson_name

            }
            obj1.push(temp)
          }

        }
        var obj = {
          id: (k + 1).toString(),
          name: obj1[0].lesson_name,
          open: false,
          pages: [].concat(obj1)

        }
        list.push(obj)
      }

      this.setData({
        videoList: list
      })
    }
  })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})