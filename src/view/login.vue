
<template>
    <div class="login" :style="{'background-image':'url('+bgImg+')'}">

    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
 
    
        <div class="form-con">
               <Form ref="form" :model="form" :rules="rules" @keydown.enter.native="handleSubmit(form)">
                <FormItem prop="userName">
                  <Input v-model="form.userName" placeholder="请输入用户名">
                    <span slot="prepend">
                      <Icon :size="16" type="ios-person"></Icon>
                    </span>
                  </Input>
                </FormItem>
                <FormItem prop="password">
                  <Input type="password" v-model="form.password" placeholder="请输入密码">
                    <span slot="prepend">
                      <Icon :size="14" type="md-lock"></Icon>
                    </span>
                  </Input>
                </FormItem>
                <FormItem>
                  <Button @click="handleSubmit('form')" type="primary" long>登录</Button>
                </FormItem>
              </Form>
        </div> 
      </Card>
    </div>
  </div>
</template>
<script >
import http from '@/libs/http.js'
import bg from '@/assets/loginBg.jpg'
import md5 from 'md5'
import * as Util from '@/libs/util.js'
export default {
  name: 'UserLogin',
  data(){
        return{
            bgImg : bg,
            form:{
              userName:'',
              password:''

            },
            rules:{
               userName:[
                 {required:true,message:'账号不能为空'},
                 ],
                 password:[
                   {required:true,message:'密码不能为空'}
                   ]
            }
        }
  },
  created(){
  
  },
  methods:{
   handleSubmit(name){
      this.$refs[name].validate( async (valid)=>{
        if(valid){
          let query={
            uname:this.form.userName,
            upwd:md5(this.form.password)
          }
         
         try{ 
            const data= await http.post({
              url:'/auth/login',
              data:query
            })
   
            Util.setToken(data.token)
            this.$store.commit('setAccess',data.rule)
       
            this.$router.push({
                name: 'articlePage'
              })
           }catch(error){
             console.log(error)
           }
          // this.$Message.success('登录成功')
       
        }else{
          this.$Message.errpr('请核实登录信息')
        }
      })
    }
  }
}
</script>
<style scope>
 .login{
width: 100%;
height: 100%;

background-size: cover;
background-position: 50%;
position: relative
 }
 #app, body, html {
    width: 100%;
    height: 100%;
}
.login-con{
   position: absolute;
    right: 160px;
    top: 50%;
    -webkit-transform: translateY(-60%);
    transform: translateY(-60%);
    width: 300px;
}
#app{margin-top:0}
html{font-family: sans-serif;
    line-height: 1.15;}
    body{font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,"\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
    font-size:0;
    line-height: 1.5;
    color: #515a6e;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;}
    html,body{
      overflow: hidden;
    margin: 0;
    padding: 0;}
</style>

