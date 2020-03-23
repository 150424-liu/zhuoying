<template>
<div class="login">
  <!-- 头部说明 -->
  <div class="explain">
    <div></div>
    <div style="margin-left: 11%;"><p>登陆</p></div>
    <div><img src="../../static/点.png" /></div>
  </div>
  <!-- 登陆页面头部logo -->
  <div class="logo">
    <img src="../../static/login.png" />
  </div>
  <!-- 登陆信息 -->
  <div class="content">
    <div class="content_head">
      <p>用户登陆</p>
    </div>
    <div class="content_bottom">
      <van-cell-group>
        <van-field
          v-model="value1"
          left-icon="friends"
          placeholder="用户名或账号"
        />
       <van-field
          v-model="value2"
          left-icon="lock"
          type="password"
          placeholder="密码"
        />
      </van-cell-group>
    </div>
    <!-- 注册 -->
    <div class="sign">
      <div class="sign_right" @click="onSign">
        没有账号？立即注册
      </div>
    </div>
    <!-- 隐私权 -->
    <div class="privacy">
      <van-checkbox v-model="checked" icon-size="15px">已同意《卓盈助手隐私权法》</van-checkbox>
    </div>
    <!-- 登陆按钮 -->
    <div style="padding-bottom: 20%;">
      <van-button
      color="linear-gradient(to right, #4bb0ff, #6149f6)"
      class="button"
      @click="login"
      type="info">
      登陆
      </van-button>
    </div>
  </div>
</div>
</template>

<script>
 import { Dialog } from 'vant';
 export default {
   data() {
     return {
       value1: '',    //用户名
       value2: ''     ,//密码
       checked: false  //隐私权
     };
   },
   methods:{
     // 注册页面跳转
     onSign(){
       this.$router.push({
         path:"/login_sign"
       })
     },
     // 登录
     login(){
       if (this.value1 == "") {
         Dialog({ message:"用户名不能为空" })
       } else if(this.value2 == ""){
         Dialog({ message:"密码不能为空" })
       }else if(this.checked == false){
         Dialog({ message:"未同意卓盈助手隐私权法" })
       }else{
         var items = JSON.parse(localStorage.getItem("msgBody"));
         for (let i = 0;i<items.length;i=i+2) {
           if(this.value1 == items[i]){
             if(this.value2 == items[i+1]){
               Dialog({ message:"登录成功" })
               this.$router.push({
                 path:"/index"
               })
               break
             }
             }
           else {
                 Dialog({ message:"账号或密码错误" })
           }
         }
       }

     }
   }
 };
</script>

<style scoped>
.login{
  font-size: 0.875rem;
  text-align: center;
  height: 100vh;
  background-image: url(../../static/loginback.jpg);
  background-size: 100%;
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
/* 登陆信息 */
.content{
  width: 80%;
  margin-left: 10%;
  background-color:rgba(255,255,255,0.4) ;
  border-radius: 10px;
}
.content_head p{
  font-size: 1.25rem;
  font-weight: bold;
  color: #585c5f;
  padding-top: 5%;
}
.content_head{
  border-bottom: 1px solid #DCDDE0;
}
.content_bottom{
  width: 80%;
  margin-left: 10%;
  padding-top: 6%;
}
/* 注册 */
.sign{
  width: 80%;
  margin-left: 10%;
  padding-top: 1%;
  display: flex;
  justify-content: flex-end;
}
.sign_right{
  font-size: 0.625rem;
  color: #0570DB;
  cursor: pointer;
}
/* 隐私权 */
.privacy{
  width: 80%;
  margin-left: 10%;
  padding-top: 5%;
  padding-bottom: 1%;
  font-size: 0.625rem;
}
/* 登陆按钮 */
.button{
  width: 80%;
  border-radius: 4px;
}
</style>
