<template>
<div class="team">
  <!-- 头部说明 -->
  <div class="explain">
    <div></div>
    <div style="margin-left: 11%;"><p>我的团队</p></div>
    <div><img src="../../static/点.png" /></div>
  </div>
  <!-- 我的团队用户 -->
  <van-tabs style="padding-bottom: 25%;" >
    <!-- 一级用户 -->
    <van-tab title="一级">
      <p class="urser">一级用户数量：{{listone.length}}</p>
      <div class="userList" v-for="listones in listone">
        <div><img :src="listones.photo" /> </div>
        <div class="userList_right" >
          <div>用户名:{{listones.name}}</div>
          <div>手机号:{{listones.tel}}</div>
        </div>
      </div>
    </van-tab>
    <!-- 二级用户 -->
    <van-tab title="二级">
      <p class="urser">二级用户数量：{{listtwo.length}}</p>
      <div class="userList" v-for="listtwo in listtwo">
        <div><img :src="listtwo.photo" /> </div>
        <div class="userList_right" >
          <div>用户名:{{listtwo.name}}</div>
          <div>手机号:{{listtwo.tel}}</div>
        </div>
      </div>
    </van-tab>
  </van-tabs>
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
        listone:""  ,//一级用户列表
        listtwo:""   //二级用户列表
      }
    },
    created() {
      var _this = this
// 一级用户列表
      this.$axios({
        method:"post",
        url:"https://exam.qhynice.top/index.php/Api/User/tree",
        data:this.$qs.stringify({
          uid:44,
        })
      }).then(function(res){
        _this.listone = res.data.data
      })
// 二级用户列表
      this.$axios({
        method:"post",
        url:"https://exam.qhynice.top/index.php/Api/User/tree",
        data:this.$qs.stringify({
          uid:44,
          level:1
        })
      }).then(function(res){
        _this.listtwo = res.data.data
      })
    }
  }
</script>

<style scoped>
/* 头部说明 */
.team{
  font-size: 0.875rem;
}
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
/* 用户 */
.urser{
  text-align: center;
  color:  #969799;
  border-bottom: 1px solid #E8E8E8;
  padding-bottom: 3%;
}
/* 用户列表 */
.userList{
  display: flex;
  justify-content: flex-start;
  padding-left: 2%;
  padding-top: 2%;
  border-bottom: 1px solid #E8E8E8;
}
.userList img{
  width: 50%;
  border-radius: 10px;
}
.userList_right{
  padding-top: 3%;
  margin-left: -10%;
}
</style>
