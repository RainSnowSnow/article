<template>
    <div>
      <Card>
        <p slot="title" style="text-align:left">
            <Icon type="ios-film-outline"></Icon>
           专家列表
        </p>
        <div slot="extra">
            <ButtonGroup size="small">
                <Button type="primary" icon="plus" @click="$_add">添加专家</Button>
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
            @on-cancel="cancel('formInline')">
              <Form ref="formInline" :model="formInline" :rules="ruleInline"  :label-width="80">
            <FormItem prop="name" label="专家姓名">
                <Input type="text" v-model="formInline.name" placeholder="请输入的专家姓名"></Input>
            </FormItem>
             </Form>
        </Modal>
              <Modal
            v-model="Modifymodal"
            title="修改专家"
            @on-ok="$Modify('formInline')"
            @on-cancel="cancel('formInline')">
              <Form ref="formInline" :model="formInline" :rules="ruleInline"  :label-width="80">
            <FormItem prop="name" label="专家姓名">
                <Input type="text" v-model="formInline.name" placeholder="请输入的专家姓名"></Input>
            </FormItem>
             </Form>
        </Modal>
    </div>
</template>
<script>
export default {
  data(){
    return {
      formInline: {
                   name:''
                },
                ruleInline: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
              
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
                                      click:()=>{
                                         this.$_delete()  
                                      }
                                    }
                                     },'刪除')
                                       
                               
                                 ] )
                             }
                         }
                        ],
                        Data:[
                            { id:'1',
                        name:'专家',
                      
                        },
                        { id:'2',
                        name:'专家',
                        
                        }]
    }
  },
  methods:{
    $_delete(){
      console.log('删除')
    },    
    submit(name){
       this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('成功');
                    } else {
                        this.$Message.error('请填写完整信息');
                    }
                })
    },
    cancel(name){
         this.$refs[name].resetFields()
    },
    $_add(){
        this.modal=true
    },
    $Modify(name){
      this.$refs[name].validate((valid) => {
            if (valid) {
                this.$Message.success('成功');
            } else {
                this.$Message.error('请填写完整信息');
            }
        })  
    },
     async  $_TablePageChange (page) {
                    const offset = (page - 1) * this.TablePage.pageSize
                    // await this.waitingOrder(offset)
                    // console.log(page)
                    },
                    async $_TablePageSizeChange (pageSize) {
                    this.TablePage.pageSize = pageSize
                    // await this.waitingOrder()
                    // console.log(pageSize)
                    },
  }
}
</script>
