<template>
    <div>
      <Card>
        <p slot="title" style="text-align:left">
            <Icon type="ios-film-outline"></Icon>
           专家列表
        </p>
        <div slot="extra">
            <ButtonGroup size="small">
                <Button type="primary" icon="plus" @click="modal=true">添加专家</Button>
            </ButtonGroup>
        </div>
      </Card>
        <div>
            <Table border stripe :columns="Columns" :data="Data"></Table>
            <Page :total="DataCount"    :page-size="TablePage.pageSize" :page-size-opts="TablePage.pageSizeOpts"  @on-change="$_TablePageChange" @on-page-size-change="$_TablePageSizeChange"  show-total show-elevator show-sizer style="margin-top: 20px; text-align: right;" transfer></Page>
        </div>
           <Modal
            v-model="modal"
            title="添加专家"
            @on-ok="submit('formInline')"
            @on-cancel="modal=false,$refs['formInline'].resetFields()">
              <Form ref="formInline" :model="formInline" :rules="ruleInline"  :label-width="80">
                    <FormItem prop="name" label="专家姓名">
                        <Input type="text" v-model="formInline.name" placeholder="请输入的专家姓名"></Input>
                    </FormItem>
                    <FormItem prop="password" label="登录密码">
                        <Input type="text" v-model="formInline.password" placeholder="请输入的登录密码"></Input>
                    </FormItem>
                       <FormItem prop="telphone" label="电话号码">
                        <Input type="text" v-model="formInline.telphone" placeholder="请输入的登录密码"></Input>
                    </FormItem>
             </Form>
        </Modal>
        <Modal
            v-model="Modifymodal" title="修改专家"  @on-ok="$Modify('formInlineModify')" @on-cancel="Modifymodal=false">
              <Form ref="formInlineModify" :model="formInlineModify" :rules="ruleInlineModify"  :label-width="80">
                <FormItem prop="telphone" label="电话号码">
                    <Input type="text" v-model="formInlineModify.telphone " placeholder="请输入的电话号码"></Input>
                </FormItem>
               
             </Form>
        </Modal>
            <Modal
            v-model="passwordModal" title="修改密码"  @on-ok="$passwordModal('formInlineUpwd')" @on-cancel="passwordModal=false">
              <Form ref="formInlineUpwd" :model="formInlineUpwd" :rules="ruleInlineUpwd"  :label-width="80">
                <FormItem prop="upwd" label="新密码">
                    <Input type="text" v-model="formInlineUpwd.upwd " placeholder="请输入的用户密码"></Input>
                </FormItem>
               
             </Form>
        </Modal>
    </div>
</template>
<script>
import profession from '@/api/profession.js'
export default {
  data(){
    return {
        passwordModal:false,

        userId:null,
       formInline: {
                   name:'',
                   password:'',
                    telphone:''
                },
        ruleInline: {
            name: [
                { required: true, message: '请输入姓名', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '请输入登录密码', trigger: 'blur' }
            ],
             telphone: [
                { required: true, message: '请输入电话号码', trigger: 'blur' }
            ]
        
        },
        formInlineModify: {
               telphone:''
           },
        ruleInlineModify: {
            telphone: [
                { required: true, message: '请输入电话号码', trigger: 'blur' }
            ],
            },
         formInlineUpwd: {
               upwd:''
           },
        ruleInlineUpwd: {
            upwd: [
                { required: true, message: '请输入登录密码', trigger: 'blur' }
            ]
           
      
        
        },
      modal:false,
      Modifymodal:false,
      DataCount:0,
      TablePage: {
        pageSize: 30,
        pageSizeOpts: [30, 50, 80, 100]
        },
        Columns:[
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                        {
                            title:'姓名',
                            key:'name',
                            align: 'center',
                        },{
                            title:'操作',
                            key:'action',
                            align: 'center',
                            render:(h,params)=>{
                                return h('div',[
                                    h('Button',{
                                    props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style:{
                                    marginRight:'5px'
                                },
                                on:{
                                    click:()=>{
                                    this.Modifymodal=true
                                     this.userId=params.row.user_id
                                    this.formInlineModify={
                                        telphone:params.row.telphone,
                                      
                                    }
                                    } 
                                }
                                    },'编辑'),
                                        h('Button',{
                                    props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                    style:{
                                    marginRight:'5px'
                                },
                                on:{
                                    click: ()=>{
                                        this.userId=params.row.user_id
                                       this.passwordModal=true
                                    }
                                }
                                    },'修改用户密码')
                                    
                            
                                ] )
                            }
                        }
                    ],
             Data:[]
    }
  },
  created(){

   this.profession()
  },
  methods:{
      /* 获取列表 */
     async profession(){
          let query={
              limit:this.TablePage.pageSize,
              offset:0
          }
         const data= await  profession.getExperts(query)
      
         this.DataCount=data.count  
         this.Data=data.rows
    },
  /* 添加专家信息 */
    submit(name){
       this.$refs[name].validate(async (valid) => {
                    if (valid) {
                         await profession.addExport(this.formInline)
                         this.profession()
                         this.$refs['formInline'].resetFields()
                    } else {
                        this.$Message.error('请填写完整信息');
                    }
                })
    },
  
    $Modify(name){
      this.$refs[name].validate(async(valid) => {
            if (valid) {
             
               await profession.modify(this.userId,this.formInlineModify.telphone)
                this.profession()
            } else {
                this.$Message.error('请填写完整信息');
            }
        })  
    },
    $passwordModal(name){
      this.$refs[name].validate(async(valid) => {
            if (valid) {
                await   profession.modifyUserPassword(this.userId,this.formInlineUpwd.upwd)
                this.profession()
               this.passwordModal=false
            } else {
                this.$Message.error('请填写完整信息');
            }
        })  
    },
     async  $_TablePageChange (page) {
        const offset = (page - 1) * this.TablePage.pageSize
         let query={
             limit:this.TablePage.pageSize,
             offset:offset
         }
        await profession.getExperts(query)
    
        },
        async $_TablePageSizeChange (pageSize) {
            this.TablePage.pageSize = pageSize
            let query={
             limit:this.TablePage.pageSize,
             offset:0
         }
            await profession.getExperts(query)
        },
  }
}
</script>
