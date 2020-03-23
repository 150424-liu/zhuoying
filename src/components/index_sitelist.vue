<template>
<div class="sitelist">
  <!-- 头部说明 -->
  <div class="explain">
    <div @click="$router.back(-1)" ><img src="../../static/左箭头.png" /> </div>
    <div><p>地址列表</p></div>
    <div><img src="../../static/点.png" /></div>
  </div>
  <!-- 地址列表 -->
 <van-address-list
   v-model="chosenAddressId"
   :list="list"
   disabled-text="以下地址超出配送范围"
   default-tag-text="默认"
   @add="onAdd"
   @edit="onEdit"
 />
</div>
</template>

<script>
export default{
  data() {
      return {
        chosenAddressId: '',
        list: [],     //地址列表
      }
    },

    methods: {
      // 新增地址
      onAdd() {
        this.$router.push({
          path:"/index_siteAdd",
          query:{
            key:"新增地址"
          }
        })
      },
      //编辑地址
      onEdit(e) {
        this.$router.push({
          path:"/index_siteEdit",
          query:{
            key:"编辑地址",
            content:e
          }
        })
      }
    },
  created() {
    var _this = this
    // 地址列表接口
    this.$axios({
      methods:"get",
      url:"https://star.qhynice.top/api/address/getaddress",
      params:{
        user_id:73
      }
    }).then(function(res){
    // 地址列表
      _this.list = res.data.res
     // 手机号
      for (let i in res.data.res) {
        _this.list[i].tel = _this.list[i].phone
          // 设置默认地址
        if(_this.list[i].is_default == "1"){
          _this.list[i].isDefault = true
          //设置初始选中
          _this.chosenAddressId = _this.list[i].id
        }else{
          _this.list[i].isDefault = false
        }
      }
    })
  }
}
</script>

<style scoped>
.sitelist{
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
</style>
