<template>
<div class="layout">
    <Layout>
    <Header style="position:relative">
        <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo">
                <img :src="logo" />
            </div>
            <div class="layout-nav">
                     <router-link to="/article/articlePage">
                        <MenuItem name="1" >
                            <Icon type="ios-navigate"></Icon>
                        我的文章
                    </MenuItem>
                    </router-link>
                     <Submenu name="2" v-show="access==='admin'" >
                        <template slot="title">
                            <Icon type="ios-stats" />
                            设置
                        </template>
                        <MenuGroup title="专家" style="text-align:left">
                            <router-link to="/profession/export"><MenuItem name="3-1">专家列表</MenuItem></router-link>
                         </MenuGroup>
                    </Submenu>
        
            </div>
             <div  class="LogOut" @click="handleLogOut">[ 退出 ]</div>
        </Menu>
       
     </Header>
    <Content >
         <Card>
          <router-view></router-view>
        </Card>
    </Content>
       </Layout>
</div>

</template>
<script>
import logo from '@/assets/logo.jpg'
import * as Util from '@/libs/util.js'
    export default {
          name: 'ArticlePage',
          data(){
              return{
                  logo,
                     
              }
         
          },
          computed:{
              access(){
                  return this.$store.state.access
              }
          },
          methods:{
         
              handleLogOut(){
                 Util.setToken('')
                 this.$router.push({
                     name:'login'
                 })
              }
          }
       
          
    }
</script>
<style>
#app{margin-top:0}
.LogOut{
    position: absolute;
    right: 20px;
    top:0;
    bottom:0;
    color: #ffffff;
    cursor: pointer;
    z-index: 9999;
    width: 100px;
    height: 64px;
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background:transparent;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-logo img{
    position: absolute;
    top:0;
    bottom:0;
    margin: auto;
    max-width:100%;
}
.layout-nav{
    width: 1142px;
    margin: 0 auto;
 
}
.layout-footer-center{
    text-align: center;
}
</style>
