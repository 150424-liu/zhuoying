<template>
<div class="integral">
  <!-- 头部说明 -->
  <div class="explain">
    <div @click="$router.back(-1)"><img src="../../static/左箭头.png" /> </div>
    <div><p>积分兑换</p></div>
    <div><img src="../../static/点.png" /></div>
  </div>
  <!-- 头部背景 -->
  <div class="integral_head"></div>
  <!-- 积分、待审核积分 -->
  <div class="integral_head_content">
    <div>
      <p>我的积分</p>
      <p>{{jifen}}</p>
    </div>
    <div>
      <p>待审核积分</p>
      <p>{{data}}</p>
    </div>
  </div>
  <!-- 提现信息 -->
  <div class="content">
  <!-- 姓名 -->
    <van-cell-group>
      <van-field
      label-align="left"
      v-model="xm"
      label="姓名:"
      :error-message="xm_cw"
      @input="name"
      placeholder="请输入姓名" />
  <!-- 手机号 -->
    <van-field
    label-align="left"
    v-model="sj"
    label="收款人手机号:"
    :error-message="sj_cw"
    @input="tel"
    placeholder="请输入真实的收款人手机号" />
   <!-- 提现账号 -->
      <van-field
      label-align="left"
      v-model="zh"
      label="提现账号:"
      :error-message="zh_cw"
      @input="acc"
      placeholder="请输入支付宝账号" />
  <!-- 提现金额 -->
    <van-field
    label-align="left"
    v-model="je"
    label="提现金额:"
    :error-message="je_cw"
    @input="monery"
    type="digit"
    placeholder="请输入整数且不小于100的金额" />
  <!-- 实时到账金额 -->
    <van-field
    label-align="left"
    v-model="ss"
    label="实时到账:"
    readonly
    error
    />
  </van-cell-group>
  </div>
  <p style="float: right;color: red;font-size: 0.75rem;">*每笔提现扣除10%手续费</p>
  <van-button class="buttom" type="info" @click="confirm" >提交申请</van-button>
</div>
</template>

<script>
import { Dialog } from 'vant';
export default{
  data(){
    return{
      jifen:""    ,//我的积分
      data:""   ,//待审核积分
      xm:""   ,//姓名
      xm_cw:""  ,//姓名错误提示
      sj:""   ,//手机号
      sj_cw:""  ,//手机号错误提示
      zh:""   ,//账号
      zh_cw:""  ,//账号错误提示
      je:""   ,//金额
      je_cw:""  ,//金额错误提示
      ss:"请输入提现金额" //实时到账金额
    }
  },
  methods:{
    // 姓名判断
    name(e){
      var _this = this
      if (e != "") {
        if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(e))) {
          _this.xm_cw = "请输入正确的姓名格式"
        } else{
          _this.xm_cw = ""
        }
      } else{
        _this.xm_cw = ""
      }

    },
    // 手机号判断
    tel(e){
      var _this = this
      if(e != ""){
        if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(e))) {
          _this.sj_cw = "请输入正确的手机号格式"
        } else{
          _this.sj_cw = ""
        }
      }else{
        _this.sj_cw = ""
      }
    },
    // 账号判断
    acc(e){
      var _this = this
      if(e != ""){
        if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(e))) {
          _this.zh_cw = "请输入正确的支付宝账号格式"
        } else{
          _this.zh_cw = ""
        }
      }else{
        _this.zh_cw = ""
      }
    },
    // 提现金额判断
    monery(e){
      var _this = this
      if(e != ""){
        if (e < 100 ) {
          _this.je_cw = "请输入不小于100的金额"
          _this.ss = "提现金额格式错误"
        } else if(parseInt(e) > _this.jifen){
          _this.je_cw = "超出己有金额"
          _this.ss = "提现金额格式错误"
        }else{
          _this.je_cw = ""
          _this.ss = e*0.9
        }
      }else{
        _this.je_cw = ""
        _this.ss = "请输入提现金额"
      }
    },
  // 提现申请
  confirm(){
    var _this = this
    if (_this.xm == "" ||_this.sj == "" ||_this.zh == "" ||_this.je == "" ) {
      Dialog({ message: '请完善信息后提交！' });
    }else if(!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(_this.xm))){
      Dialog({ message: '请输入正确的姓名格式' });
    }
    else if(!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(_this.sj))){
      Dialog({ message: '请输入正确的手机号格式' });
    }else if(!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(_this.zh))){
      Dialog({ message: '请输入正确的支付宝账号格式' });
    }
    else if(this.je < 100){
      Dialog({ message: '提现金额不能小于100！' });
    }else if(parseInt(_this.je) > _this.jifen){
      Dialog({ message: '超出己有金额' });
    }else{
      this.$axios({
        method:"post",
        url:"https://exam.qhynice.top/index.php/Api/User/withdraw",
        data:this.$qs.stringify({
          uid:62,
          name:_this.xm,
          tel:_this.sj,
          jifen:_this.ss,
          num:_this.je,
          account:_this.zh
        })
      }).then(function(res){
          console.log(res)
        })
    }
  }
  },
  created() {
    var _this = this
    // 我的积分
    this.$axios({
      methods:"post",
      url:"https://exam.qhynice.top/index.php/Api/User/userinfo",
      params:{
        uid:62
      }
    }).then(function(res){
      _this.jifen = res.data.userinfo.jifen
    })
    // 待审核积分
    this.$axios({
      method:"post",
      url:"https://exam.qhynice.top/index.php/Api/User/pending",
      data:this.$qs.stringify({
        uid:62,
      })
    }).then(function(res){
      // console.log(res)
      _this.data = res.data.data
    })
  }
}
</script>

<style scoped>
.integral{
  font-size: 0.875rem;
  padding-bottom: 7%;
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
/* 头部背景 */
.integral_head{
  background-color: #1989FA;
  padding-bottom: 33%;
}
/* 积分、待审核积分 */
.integral_head_content{
  width: 80%;
  margin-left: 10%;
  margin-top: -20%;
  padding-top: 5%;
  padding-bottom: 10%;
  background-image: url(../../static/myinback.jpg);
  background-size: 100%;
  display: flex;
  justify-content: space-around;
  color: white;
}
/* 提现信息 */
.content{
  margin-top: 10%;
  width: 90%;
  margin-left: 5%;
}
/* 提现按钮 */
.buttom{
  width: 100vw;
  position: fixed;
  bottom: 0;
}
</style>
