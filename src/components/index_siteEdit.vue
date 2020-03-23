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
      :address-info="info"
      show-delete
      show-set-default
      show-search-result
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</div>
</template>

<script>
import { Dialog } from 'vant'   // 弹窗引用
import areaList from "../assets/area.js"  //地名列表引用
export default{
  data(){
    return{
      areaList,  // 地址滑轮
      name:"",
      info:{},  //编辑地址初始值
    }
  },
  methods:{
   onChangeDetail(val) {
   },
   // 编辑地址
    onSave(e) {
      // 默认地址
      if (e.isDefault == true) {
          e.isDefault= 1
      }else{
        e.isDefault = 0
      }
      var _this = this
      this.$axios({
        methods:"get",
        url:"https://star.qhynice.top/api/address/update_default",
        params:{
          user_id:73,
          id:e.id,
          name:e.name ,
          phone:e.tel,
          address:e.addressDetail,
          is_default: e.isDefault
        }
      }).then(function(res){
        // 弹窗
        Dialog.alert({
          message: '编辑成功'
        }).then(() => {
          _this.$router.push({path:"/index_sitelist"})
        });

      })
    },
  // 删除地址
    onDelete(e){
      var _this = this
      console.log(e.id)
      this.$axios({
        methods:"get",
        url:"https://star.qhynice.top/api/address/del_adds",
        params:{
          user_id:73,
          id:e.id
        }
      }).then(function(res){
        // 弹窗
        Dialog.alert({
          message:"删除成功!"
        }).then(()=>{
          _this.$router.push({path:"/index_sitelist"})
        }) 
      })
    }
  },
  created() {
  // 头部标题
    var _this = this
    var names = this.$route.query.key
    _this.name = names
  // 编辑地址内容
    var contents = this.$route.query.content
    _this.info.id = contents.id
    _this.info.name = contents.name
    _this.info.tel = contents.tel
    _this.info.addressDetail = contents.address
    _this.info.isDefault = contents.isDefault
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
