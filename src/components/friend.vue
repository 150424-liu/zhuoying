<template>
<div class="friend">
  <!-- 头部说明 -->
  <div class="explain">
    <div></div>
    <div style="margin-left: 11%;"><p>邀请好友</p></div>
    <div><img src="../../static/点.png" /></div>
  </div>
  <!-- 邀请好友内容 -->
  <div class="content">
    <div class="content_head">好友召集令</div>
    <!-- 二维码 -->
    <div class="code">
      <p>邀请码</p>
      <img :src="code" />
      <p style="padding-top: 4%;padding-bottom: 10%;" >邀请好友扫一下！</p>
    </div>
  </div>
<!-- 底部导航 -->
<bottom></bottom>
</div>
</template>

<script>
import bottom from "./bottom.vue"
export default{
components:{bottom},
  data(){
    return{
      // 二维码
      code:""
    }
  },
  created() {
    var _this = this
    this.$axios({
      methods:"post",
      url:"https://exam.qhynice.top/index.php/Api/User/getWxcode",
      params:{
        invite_code:62
      }
    }).then(function(res){
      _this.code = res.data
    })
  }
}
</script>

<style scoped>
.friend{
  font-size: 0.875rem;
  text-align: center;
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
/* 邀请好友内容 */
.content{
  background-image: url(../../static/friendback.jpg);
  background-size: 100%;
  height: 90vh;
}
.content_head{
  padding-top: 10%;
  font-size: 1.125rem;
  color: #1989FA ;
}
/* 二维码 */
.code{
  width: 70%;
  margin-left: 15%;
  background-color:white;
  border-radius: 3px;
}
.code img{
  width: 70%;
}
.code p{
  font-size: 1.125rem;
  padding-top: 15%;
}
</style>
