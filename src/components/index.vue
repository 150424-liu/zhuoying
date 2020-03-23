<template>
  <div class="index">
  <!-- 头部说明 -->
  <div class="explain">
    <div></div>
    <div style="margin-left: 11%;"><p>首页</p></div>
    <div><img src="../../static/点.png" /></div>
  </div>
  <!-- 首页轮播图 -->
  <div class="carousel">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image.photo" />
      </van-swipe-item>
    </van-swipe>
  </div>
  <!-- 商品列表 -->
  <div class="list">
    <div class="list_shooping" v-for="list in lists" @click="onshopping(list.id)" >
      <img :src="list.photo_x" />
      <div class="list_name">{{list.name}}</div>
      <div class="list_price">
        <p class="list_price_left">￥{{list.price_yh}}</p>
        <p class="list_price_right">￥{{list.price}}</p>
      </div>
      <div class="list_price">
        <p>新品推荐</p>
        <p>{{list.shiyong}}</p>
      </div>
    </div>
  </div>
  <!-- 底部导航 -->
  <bottom></bottom>
  </div>
</template>

<script>
import bottom from '@/components/bottom'  //底部导航
export default {
  components:{bottom},
  data () {
    return {
       value:"",
       images:[]   ,// 轮播图
       lists:[]     //商品列表
    }
  },
  methods:{
   // 商品详情事件
   onshopping(id){
     this.$router.push({
       path:"/index_shopping",
       query:{
         id:id
       }
     })
   }
  },
  created() {
    var _this = this
    this.$axios({
      methods:"post",
      url:'https://exam.qhynice.top/index.php/Api/Index/index'
    }).then(function(res){
      _this.images = res.data.ggtop         // 轮播图
      _this.lists = res.data.prolist      //商品列表
    })
  }
}
</script>

<style scoped>
.index{
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
/* 轮播图 */
.carousel{
  width: 100%;
}
.carousel img{
  width: 100%;
}
/* 商品列表 */
.list{
  width: 90%;
  margin-left: 5%;
  padding-top: 3%;
  padding-bottom: 23%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 0.75rem;
  color: #DBDBDB;
}
.list p{
  line-height: 40%;
  padding-left: 2%;
  padding-right: 2%;
}
.list img{
  width: 100%;
}
.list_shooping{
  width: 49%;
  border: 1px solid #DCDDE0;
}
.list_name{
  color: #000000; margin-left: 2%;
}
.list_price_left{
  color: red;
}
.list_price_right{
  text-decoration: line-through;
}
.list_price{
  display: flex;
  justify-content: space-between;
}
</style>
