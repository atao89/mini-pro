// index.js
// 获取应用实例
const app = getApp()

// 引入 用来发送请求的方法 一定要把路径补全
import { request } from "../../utils/request.js" //因为这个 request 请求使用export 导出的 所以要加 双大括号

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据
    swiperList: [],
    // 分类导航数据
    navList: [],
    // 楼层数据
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList();
    this.getNavList();
    this.getFloorList();

    // wx.showToast({
    //   title:'Hello World'
    // })

    // // 异步加载轮播图
    // var reqTask = wx.request({
    //   url: '',
    //   data: {},
    //   header: {'content-type':'application/json'},
    //   method: 'GET',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: (result) => {
        
    //   },
    //   fail: () => {},
    //   complete: () => {}
    // });
  },

  // 首页轮播图数据请求
  getSwiperList(){
    request({
      url: '/2090056?/home/swiperdata'
    }).then((res)=>{
      this.setData({
        swiperList: res.data.swiperList
      })
    })
  },
  
  // 首页分类导航数据请求
  getNavList(){
    request({
      url: '/2091975?/home/catitems'
    }).then((res)=>{
      this.setData({
        navList: res.data.navList
      })
    })
  },

  // 获取楼层数据请求
  getFloorList(){
    request({
      url: '/2092201?/home/floordata'
    }).then(res=>{
      this.setData({
        floorList: res.data.floorList
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(111222)
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
