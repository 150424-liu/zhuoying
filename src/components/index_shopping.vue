<template>
<div class="shopping">
  <!-- 头部说明 -->
  <div class="explain">
    <div @click="router"><img src="../../static/左箭头.png" /> </div>
    <div><p>商品详情</p></div>
    <div><img src="../../static/点.png" /></div>
  </div>
  <!-- 商品详情轮播图 -->
  <div class="carousel">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="image in carou">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
  </div>
  <!-- 商品简介 -->
  <div class="brief">
    <p>{{content.name}}</p>
    <div class="brief_price">
      <div class="price_left">￥{{content.price_yh}}</div>
      <div class="price_right">库存{{content.num}}</div>
    </div>
  </div>
  <!-- 详情介绍 -->
  <van-tabs style="border-top: 1px solid  #EBEDF0;" >
    <van-tab title="图文详情">
      <div style="padding-bottom: 10%;" v-html="content.content"></div>
    </van-tab>
    <van-tab title="产品参数">
      <div style="padding-bottom: 20%;">
       <div class="details">
         <p class="details_left">商品名称：</p>
         <p class="details_right">{{content.name}}</p>
       </div>
       <div class="details">
         <p class="details_left">商品编号：</p>
         <p class="details_right">{{content.updatetime}}</p>
       </div>
       <div class="details">
         <p class="details_left">分  类：</p>
         <p style="margin-left: 8%;" class="details_right">{{content.cat_name}}</p>
       </div>
      </div>

    </van-tab>
  </van-tabs>
  <!-- 立即购买 -->
  <van-button class="buttom" type="info" @click="buy">立即购买</van-button>
  <!-- 立即购买上拉 -->
  <van-action-sheet v-model="show">
    <van-card
    style="padding-top: 8%;"
      :num="value"
      tag="热卖"
      :price="content.price_yh"
      :desc="content.intro"
      :title="content.name"
      :thumb="content.photo_d"
      :origin-price="content.price"
    />
    <div class="bottoms">
      <div style="padding-top: 1%;">购买数量</div>
      <div><van-stepper v-model="value" integer /></div>
    </div>
    <van-button class="buttom" type="info" @click="confirm(content)" >确定</van-button>
  </van-action-sheet>
</div>
</template>

<script>
export default{
  inject:['reload'],
  data(){
    return{
      carou:[]  ,//轮播图
      content:""  ,//商品内容
      show:false  ,//立即购买上拉
      value: 1    //步进器
    }
  },
  methods:{
    // 返回
    router(){
      this.$router.back(-1)
    },
    // 立即购买
    buy(){
      this.show = true
    },
    // 确认订单
    confirm(key){
      this.$router.push({
        path:"/index_order",
        query:{
          shopping:key.id,
          num:this.value
        }
      })
    }
  },
  created() {
    var _this = this
    // 接收参数
    var shopping_id = this.$route.query.id
    // 商品详情接口
    this.$axios({
      methods:"post",
      url:"https://exam.qhynice.top/index.php/Api/Product/index",
      params:{
        pro_id:shopping_id
      }
    }).then(function(res){
      _this.carou = res.data.pro.img_arr  //轮播图
      _this.content = res.data.pro
      // location.reload();
    })
  }
}
</script>

<style scoped>
.shopping{
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
/* 商品详情轮播图 */
.carousel{
  width: 100%;
}
.carousel img{
  width: 100%;
}
/* 商品详情简介 */
.brief{
  width: 90%;
  margin-left: 5%;
  padding-bottom: 5%;
}
.brief_price{
  display: flex;
  justify-content: space-between;
}
.brief p{
  font-weight: bold;
}
.price_left{
  color: red;
}
.price_right{
  color: #969799;
}
/* 产品参数 */
.details{
  width: 80%;
  margin-left: 10%;
  border-bottom: 1px solid #E8E8E8;
  display: flex;
  justify-content: flex-start;
}
.details_left{
  color: #969799 ;
}
/* 立即购买 */
.buttom{
  width: 100vw;
  position: fixed;
  bottom: 0;
}
/* 上拉 */
.bottoms{
  width: 90%;
  margin-left: 5%;
  padding-top: 3%;
  padding-bottom: 20%;
  display: flex;
  justify-content: space-between;
}
</style>
