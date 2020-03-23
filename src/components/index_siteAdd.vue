<template>
<div class="siteadd">
  <!-- 头部说明 -->
  <div class="explain">
    <div @click="$router.back(-2)" ><img src="../../static/左箭头.png" /> </div>
    <div><p>{{name}}</p></div>
    <div><img src="../../static/点.png" /></div>
  </div>
  <!-- 编辑地址 -->
  <div class="edit">
    <van-address-edit
      :area-list="areaList"
      show-set-default
      show-search-result
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @change-detail="onChangeDetail"
    />
  </div>
</div>
</template>

<script>
import areaList from "../assets/area.js"
export default{
  data(){
    return{
      areaList,  // 地址滑轮
      name:"",
    }
  },
  methods:{
    // 默认地址
   onChangeDetail(val) {
   },
    onSave(e){
    // 保存地址
      if (e.isDefault == true) {
          e.isDefault= 1
      }else{
        e.isDefault = 0
      }
      var _this = this
      this.$axios({
        methods:"get",
        url:"https://star.qhynice.top/api/address/index",
        params:{
          user_id:73,
          name:e.name,
          phone:e.tel,
          address:e.addressDetail,
          is_default: e.isDefault
        }
      }).then(function(res){
        _this.$router.push({path:"/index_sitelist"})
      })
    },
  },
  created() {
  // 头部标题
    var _this = this
    var names = this.$route.query.key
    _this.name = names
  }
}
</script>

<style scoped>
.siteadd{
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
