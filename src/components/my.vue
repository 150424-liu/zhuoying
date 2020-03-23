<template>
<div class="my">
  <!-- 头部说明 -->
  <div class="explain">
    <div></div>
    <div style="margin-left: 11%;"><p>我的</p></div>
    <div><img src="../../static/点.png" /></div>
  </div>
  <!-- 用户信息 -->
  <div class="user">
    <img :src="user.photo" />
    <div>{{user.name}}</div>
  </div>
  <!-- 信息菜单 -->
  <div class="menu">
    <div v-for="menu in menus" @click="onintegral(menu.to)">
      <img :src="menu.img" />
      <div class="menu_text">{{menu.name}}</div>
    </div>
  </div>
<!-- 底部 -->
<bottom></bottom>
</div>
</template>

<script>
  import bottom from "./bottom.vue"
export default{
components:{bottom},
  data(){
    return{
      // 用户信息
      user:"",
      // 菜单
      menus:[
        {
          img:"../../static/绑定手机.png",
          name:"绑定手机",
          to:""
        },
        {
          img:"../../static/积分兑换.png",
          name:"积分兑换",
          to:"/my_integral"
        },
        {
          img:"../../static/我的订单.png",
          name:"我的订单",
          to:""
        },
      ]
    }
  },
  methods:{
    onintegral(e){
      this.$router.push({
        path:e
      })
    }
  },
  created() {
    var _this = this
    // 用户信息
    this.$axios({
      methods:"post",
      url:"https://exam.qhynice.top/index.php/Api/User/userinfo",
      params:{
        uid:62
      }
    }).then(function(res){
      _this.user = res.data.userinfo
    })
  }
}
</script>

<style scoped>
.my{
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
/* 用户信息 */
.user{
  color: white;
  background-color: #1989FA;
  padding-bottom: 3%;
}
.user img{
  transform: scale(0.7);
  border-radius: 50%;
}
/* 用户菜单 */
.menu{
  width: 90%;
  margin-left: 5%;
  padding-top: 5%;
  display: flex;
  justify-content: space-between;
}
.menu img{
  transform: scale(0.6);
}
.menu div{
  color: #1296db;
}
.menu_text{
  margin-top: -15%; 
}
</style>
