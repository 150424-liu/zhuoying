<template>
<div class="order">
  <!-- 头部说明 -->
  <div class="explain">
    <div @click="$router.back(-1)" ><img src="../../static/左箭头.png" /> </div>
    <div><p>确认订单</p></div>
    <div><img src="../../static/点.png" /></div>
  </div>
  <!-- 默认地址 -->
  <div @click="onsite" class="order_site">
      <div>
        <img src="../../static/地址-背景.png" />
      </div>
      <div class="site">
         <div><span>{{site.name}}</span><span>{{site.phone}}</span></div>
         <div>{{site.address}}</div>
      </div>
      <div>
        <img src="../../static/右箭头.png" />
      </div>
  </div>
  <!-- 商品信息 -->
  <div class="order_shopping">
    <van-card
    style="padding-top: 8%;"
      :num="num"
      tag="热卖"
      :price="content.price_yh"
      :desc="content.intro"
      :title="content.name"
      :thumb="content.photo_d"
      :origin-price="content.price"
    />
  </div>
  <!-- 留言 -->
  <div class="message">
    <div style="font-weight: bold;padding-left: 4%;">备注:</div>
    <van-cell-group>
      <van-field  placeholder="请添加备注信息" />
    </van-cell-group>
  </div>
  <!-- 支付 -->
  <div class="pay">
    <div class="pay_text">应支付</div>
    <div class="pay_price">￥{{price}}</div>
  </div>
  <van-button  style="width: 100vw;position: fixed;bottom: 0;"  @click="pay" type="info">立即下单</van-button>
</div>
</template>

<script>
import { Dialog } from 'vant';
export default{
  data(){
    return{
      site:"" ,//默认地址
      num:"",   //商品数量
      content:""  ,//商品内容
      price:"" //应支付金额
    }
  },
  methods:{
    // 跳转地址列表
    onsite(){
      this.$router.push({
        path:"/index_sitelist"
      })
    },
    // 立即下单
    pay(){
      var _this = this
      this.$axios({
        methods:"get",
        url:"https://star.qhynice.top/api/wxpay/index",
        params:{
          userid:73,
          goodsid:_this.content.id,
          goodsname:_this.content.name,
          username:_this.site.name,
          address:_this.site.address,
          phone:_this.site.phone,
          buy_number_count:_this.num,
          total_price :_this.price.toFixed(2)
        }
      }).then(function(res){
        Dialog.alert({
          message:"订单提交成功"
        }).then(function(res){
          _this.$router.push({
            path:"/"
          })
        })
      })
    }
  },
  created() {
    var _this = this
    // 默认地址接口
    this.$axios({
      methods:"get",
      url:"https://star.qhynice.top/api/address/getaddress",
      params:{
        user_id:73
      }
    }).then(function(res){
    // 地址列表
      for (let i in res.data.res) {
        if(res.data.res[i].is_default == 1){
          _this.site = res.data.res[i]
        }
      }
    })
    // 商品数量
    var num = this.$route.query.num
    _this.num = num
    // 商品信息接口
    var shopping = this.$route.query.shopping
    this.$axios({
      methods:"post",
      url:"https://exam.qhynice.top/index.php/Api/Product/index",
      params:{
        pro_id:shopping
      }
    }).then(function(res){
      _this.content = res.data.pro
       // 应支付金额
      _this.price = _this.content.price_yh*num
    })

  }
}
</script>

<style scoped>
.order{
  font-size: 0.875rem;
}
/* 头部说明 */
.explain{
  padding-left: 2%;
  padding-right: 2%;
  width: 96%;
  background-color: #1989FA;
  display: flex;
  justify-content: space-between;
  color: white;
}
.explain img{
  transform: scale(0.5);
  padding-top: 43%;
}
/* 默认地址 */
.order_site{
  display: flex;
  justify-content: space-between;
}
.order_site img{
  transform: scale(0.3);
}
.site{
  padding-top: 4%;
}
/* 备注 */
.message{
  margin-top: 10%;
}
/* 支付 */
.pay{
  display: flex;
  justify-content: center;
  margin-top: 30%;
}
.pay_text{
  color: #646566;
  font-size: 1.125rem;
}
.pay_price{
  color: red;
  font-size: 1.25rem;
  font-weight: bold;
}
/* 底部按钮 */
.bottom{

}
</style>
