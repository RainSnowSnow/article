<template>
<div class="layout">
    <Layout>
    <Header style="position:relative">
        <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo">
                <img :src="logo" />
            </div>
            <div class="layout-nav">
                     <router-link :to="access==='admin'?'/public/publicPage':'/article/articlePage'">
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
             <div  class="changePassword" @click="passwordModal=true">[ 修改密码 ]</div>
        </Menu>
       
     </Header>
    <Content >
         <Card>
          <router-view></router-view>
        </Card>
    </Content>
       </Layout>
           <Modal v-model="passwordModal"  title="修改密码" @on-ok="submitPassword('formInline')"  @on-cancel="passwordModal=false">
               <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="60" >
                    <FormItem prop="password" label="新密码">
                        <Input type="text" v-model="formInline.password" placeholder="请输入新密码"></Input>
                    </FormItem>
                </Form>
          </Modal>
          <Modal v-model="loginAgain" width='300'>
              <p style="text-align:center">修改密码成功,请重新登录</p>
               <div slot="footer" >
                    <Button type="primary"   @click="sure" style="margin:auto;display:block">确定</Button>
               </div>
          </Modal>
       
  
</div>

</template>
<script>
import logo from '@/assets/logo.jpg'
import * as Util from '@/libs/util.js'
import article from '@/api/article.js'
import md5 from 'md5'
    export default {
          name: 'ArticlePage',
          data(){
              return{
                  logo,
                  loginAgain:false,
                  passwordModal:false,
                   formInline:{
                       password:null
                   },
                   ruleInline:{
                       password:[
                           {required:true,message:'密码不能为空',trigger:'blur'}
                           ]
                   }

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
                  this.$store.commit('setAccount','')
                 this.$store.commit('setAccess','')
                 this.$router.push({
                     name:'login'
                 })
              },
              submitPassword(name){
                  this.$refs[name].validate(async (valid)=>{
                      if(valid){
                            let query={
                                    upwd:this.formInline.password
                                }
                            await  article.$_changePassword(query,this)
                            
                     }else{
                          this.$Message.error('请完善信息')
                      }
                  })
               


              },
              sure(){
                   Util.setToken('')
                   this.$store.commit('setAccount','')
                    this.$store.commit('setAccess','')
                  this.$router.push({
                      name:'login'
                  })
              }
          }
       
          
    }
</script>
<style>
.changePassword{
     position: absolute;
    right: 100px;
    top:0;
    bottom:0;
    color: #ffffff;
    cursor: pointer;
    z-index: 9999;
    width: 100px;
    height: 64px;
}
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
