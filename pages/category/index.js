// pages/category/index.js
// 引入 用来发送请求的方法 一定要把路径补全
import { request } from "../../utils/request.js" //因为这个 request 请求使用export 导出的 所以要加 双大括号

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左边菜单栏数据
    leftMenuList: [],
    // 右边内容数据
    rightContentList: [],
    // 左侧当前被点击的菜单索引
    currentIndex: 0,
    // 右侧内容区，滚动条距离顶部的距离
    scrollTop: 0
  },

  //定义一个数组用来保存接口的返回数据
  cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
      使用缓存技术
      在web中使用本地缓存 和 在小程序中使用本地缓存的区别
      1、写代码的方式不一样
          web中: localStorage.setItem("key","value");  locaStorage.getItem("key");
          小程序中：wx:setStorageSync("key","value");   wx.getStorageSync("key") 
      2、存在类型转换
      web：不管存入的是什么类型的数据，最终都会先调用下 toSing()，把数据变成字符串，再存进去
      小程序：不存在 类型的转换这个操作 存什么类似的数据进去，获取的时候就是什么类型
    
      1、先判断一下本地存储中有没有旧数据
      {tiem:Date.now(),data:[...]}
      2、没有旧数据，直接发送请求
      3、有旧的数据 同时 旧的数据也没有过期 就使用 本地存储中的旧数据即可
    */

      // 1、获取本地存储中的数据
      const cates = wx.getStorageSync('cates');
      // 2、判断
      if(!cates){
        // 如果缓存中不存在就发请求获取
        this.getCates();
      } else {
        // 有旧的数据 定义过期时间
        if(Date.now() - cates.time > 1000*60){
          // 如果数据过期了则重新发请求
          this.getCates();
        } else {
          // 如果数据没有过期则继续使用缓存中的数据
          // 将本地存储中的数据cates保存到data中的cates中
          this.cates = cates.data;
          // 给左边的菜单栏添加数据
          let leftMenuList = this.cates.map( item => {
            return item.cat_name
          })

          // 给右边的内容区添加数据
          let rightContentList = this.cates[0].children;
          this.setData({
            leftMenuList,
            rightContentList
          });
          console.log("从缓存请求数据成功");
        }
      }
  },

  // 获取分类页面数据
  getCates(){
    request({
      url: '/2094038?/categories'
    }).then( res => {
      this.cates = res.data.cates;
      // 把接口获取到底数据存到本地存储中
      wx.setStorageSync('cates', {
        time: Date.now(),
        data: this.cates
      })
      console.log("从网络请求数据成功且保存");

      // 给左边的菜单栏添加数据
      let leftMenuList = this.cates.map((item)=>{
        return item.cat_name
      });
      // 给右边的内容区添加数据
      let rightContentList = this.cates[0].children;
      this.setData({
          leftMenuList,
          rightContentList
      });
    })
  },

  // 点击左侧菜单事件
  handleItemTap(e){
    // 1、获取被点击的标题身上的索引
    // 2、给data中的currentIndex赋值就可以了
    // 3、根据不同的索引来渲染右侧的商品内容
    let index = e.target.dataset.index;
    this.setData({
      currentIndex: index
    })
    
    this.setData({
      // 右侧的内容跟随者 索引index 的变化而切换
      rightContentList:this.cates[index].children,
      // 将内容区滚动条 距离顶部的距离 重新设置为0;
      scrollTop:0
    });
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
    // console.log("leftMenuList", this.data.leftMenuList);
    // console.log("rightContentList",  this.data.rightContentList);
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