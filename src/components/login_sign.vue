<template>
<div class="sign">
  <!-- 头部说明 -->
  <div class="explain">
    <div @click="$router.back(-1)" ><img src="../../static/左箭头.png" /> </div>
    <div><p>注册</p></div>
    <div><img src="../../static/点.png" /></div>
  </div>
  <!-- 注册页面logo -->
  <div class="sign_logo">
    <img src="../../static/signlogo.png" />
  </div>
  <!-- 注册信息 -->
  <div class="content">
      <div class="content_head">
        <p>用户注册</p>
      </div>
      <div class="content_bottom">
        <van-cell-group>
          <van-field
            v-model="value1"
            left-icon="friends"
            :error-message="err"
            placeholder="用户名或账号"
            @input="user"
          />
         <van-field
            v-model="value2"
            left-icon="lock"
            type="password"
            placeholder="密码"
          />
        </van-cell-group>
      </div>
      <!-- 注册按钮 -->
      <div style="margin-top: 15%;padding-bottom: 20%;">
        <van-button
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        class="button"
        @click="onLogin"
        type="info">
        立即注册
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
       value2: ''   ,//密码
       err:""   //错误提示
     };
   },
   methods:{
     // 检测是否已经注册用户名
     user(){
       var _this = this
       var items = JSON.parse(localStorage.getItem("msgBody"));
       for (let i=0;i<items.length;i=i+2) {
         if (_this.value1 == items[i]) {
           _this.err = "*用户名已存在"
           break
         } else{
           _this.err = ""
           continue
         }
       }
     },
     // 注册
     onLogin(){
       if (this.value1 == "") {
         Dialog({ message: '用户名不能为空' });
       } else if(this.value2 == ""){
         Dialog({ message: '密码不能为空' });
       }else{
         if (this.err == "") {
           window.localStorage.setItem("name",this.value1)
           window.localStorage.setItem("pass",this.value2)
           let aa = window.localStorage.getItem("name")
           let bb = window.localStorage.getItem("pass")
              var templist = JSON.parse(localStorage.getItem("msgBody") || "[]");
                 templist.push(aa);
                 templist.push(bb)
                 localStorage.setItem("msgBody", JSON.stringify(templist));
           Dialog({ message:"注册成功" })
           this.$router.push({
             path:"/"
           })
         } else{
            Dialog({ message:"用户名已存在" })
         }
       }
     }
   }
 };
</script>

<style scoped>
.sign{
  font-size: 0.875rem;
  text-align: center;
  height: 100vh;
  background-image: url(../../static/signback.jpg);
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
.sign_logo img{
  transform: scale(0.8);
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
/* 登陆按钮 */
.button{
  width: 80%;
  border-radius: 4px;
}
</style>
