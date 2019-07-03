<template>
 <div>
      <Card>
        <p slot="title" style="text-align:left">
            <Icon type="ios-film-outline"></Icon>
            我的文章
        </p>
        <div slot="extra" v-show="access==='zj'">
            <ButtonGroup size="small">
                <Button type="primary" icon="plus" @click="modal=true">添加文章</Button>
            </ButtonGroup>
        </div>
      </Card>
     <div style="min-height: 200px;">
        <div>
            <Table border stripe :columns="Columns" :data="Data"></Table>
            <Page :total="DataCount"    :page-size="TablePage.pageSize" :page-size-opts="TablePage.pageSizeOpts"  @on-change="$_TablePageChange" @on-page-size-change="$_TablePageSizeChange"  show-total show-elevator show-sizer style="margin-top: 20px; text-align: right;" transfer></Page>
        </div>
     </div>
      <Modal v-model="modal" title="添加文章" >
          <Form ref="formInline" :model="formInline" :rules="ruleInline"  :label-width="80">
            <FormItem prop="title" label="标题">
                <Input  v-model="formInline.title" placeholder="请输入标题"></Input>
            </FormItem>
               <FormItem prop="title" label="内容">
                   <markdown-editor v-model="content"  ref="childContent"/> 
               </FormItem>
            </Form>
        <div slot="footer">
            <Button type="primary"    @click="addArticle('formInline',1)">草稿</Button>
            <Button type="primary"   @click="addArticle('formInline',2)">发布</Button>
        </div>  
      </Modal>
       <Modal v-model="modifyModal" title="编辑文章" >
          <Form ref="formInline" :model="formInline" :rules="ruleInline"  :label-width="80">
            <FormItem prop="title" label="标题">
                <Input  v-model="formInline.title" placeholder="请输入标题"></Input>
            </FormItem>
               <FormItem prop="title" label="内容">
                   <markdown-editor v-model="modifyContent" ref="modifyContent"/> 
               </FormItem>
            </Form>
          <div slot="footer">
            <Button type="primary"    @click="modifyArticle('formInline',1,modifyId)">草稿</Button>
            <Button type="primary"   @click="modifyArticle('formInline',2,modifyId)">发布</Button>
        </div>
      </Modal>
       <Modal v-model="downModal" title="下载" @on-ok="downModal===false" @on-cancel="downModal===false">
          <Form ref="formInlineDown" :model="formInlineDown" :rules="ruleInlineDown"  :label-width="120">
            <FormItem prop="title" label="MP4地址">
                <Input  v-model="formInlineDown.mp4Url" placeholder="请输入mp4的地址"></Input>
            </FormItem>
               <FormItem prop="title" label="百度网盘共享地址">
                   <Input  v-model="formInlineDown.baiduUrl" placeholder="请输入百度网盘共享地址"></Input>
               </FormItem>
                <FormItem prop="title" label="百度网盘共享密码">
                   <Input  v-model="formInlineDown.baiduPwd" placeholder="请输入百度网盘共享地址"></Input>
               </FormItem>
            </Form>
              
      </Modal>
      <Modal v-model="playModal" title="播放" @on-ok="playModal===false" @on-cancel="playModal===false">
          <Form ref="formInlinePlay" :model="formInlinePlay"   :label-width="80">
            <FormItem prop="title" label="MP4地址">
                <Input  v-model="formInlinePlay.mp4Url" ></Input>
            </FormItem>
              
            </Form>
              
      </Modal>
      <Modal v-model="madeModal" title="开始制作" @on-ok="MadeSubmit('formInlineMade')" @on-cancel="()=>{madeModal===false,$refs['formInlineMade'].resetFields()}">
          <Form ref="formInlineMade" :model="formInlineMade" :rules="ruleInlineMade"  :label-width="120">
            <FormItem prop="mp4Url" label="MP4地址">
                <Input  v-model="formInlineMade.mp4Url" placeholder="请输入mp4的地址"></Input>
            </FormItem>
               <FormItem prop="baiduUrl" label="百度网盘共享地址">
                   <Input  v-model="formInlineMade.baiduUrl" placeholder="请输入百度网盘共享地址"></Input>
               </FormItem>
                <FormItem prop="baiduPwd" label="百度网盘共享密码">
                   <Input  v-model="formInlineMade.baiduPwd" placeholder="请输入百度网盘共享地址"></Input>
               </FormItem>
            </Form>
              
      </Modal>
    </div>

</template>
<script>
import MarkdownEditor from '@/components/markdown'
import article from  '@/api/article.js'
import moment from 'moment'
import { access } from 'fs';
import { async } from 'q';
export default {
     components: {
    MarkdownEditor
  },
    data(){
        return{
             articleId:null,
             modifyId:null,
             formInlineMade:{
                mp4Url:'',
                baiduPwd:'',
                baiduUrl:''

            },
            ruleInlineMade: {
                    mp4Url: [
                        { required: true, message: '请输入MP4的地址', trigger: 'blur' }
                    ],
                      baiduUrl: [
                        { required: true, message: '请输入百度网盘共享地址', trigger: 'blur' }
                    ],
                     baiduPwd: [
                        { required: true, message: '请输入百度网盘共享密码', trigger: 'blur' }
                    ]
            
                },
            formInlinePlay:{
                mp4Url:""
            },
            formInlineDown:{
                mp4Url:'',
                baiduPwd:'',
                baiduUrl:''

            },
            ruleInlineDown: {
                    mp4Url: [
                        { required: true, message: '请输入MP4的地址', trigger: 'blur' }
                    ],
                      baiduUrl: [
                        { required: true, message: '请输入百度网盘共享地址', trigger: 'blur' }
                    ],
                     baiduPwd: [
                        { required: true, message: '请输入百度网盘共享密码', trigger: 'blur' }
                    ]
            
                },
                content: '',
                modifyContent:'ceshihishfidhf',
                modal:false,
                modifyModal:false,
                downModal:false,
                playModal:false,
                madeModal:false,
                formInline: {
                    title: '',
                           },
                ruleInline: {
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' }
                    ],
            
                },
                DataCount:0,
                    TablePage: {
                    pageSize: 30,
                    pageSizeOpts: [30, 50, 80, 100]
                },
            Columns:[{
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                         {
                             title:'标题',
                             key:'title',
                             align: 'center',
                         },{
                             title:'发布日期',
                             key:'publishedAt',
                            align: 'center',
                            render:(h,params)=>{
                                return h('div',[
                                    h('span',moment(params.row.publishedAt).format('YYYY-MM-DD HH:mm:ss'))
                                ])
                            }
                         },{
                             title:'状态',
                             key:'state',
                              align: 'center',
                              render:(h,params)=>{
                                  return h('div',[
                                      h('span',{
                                          style:{
                                              display:params.row.state===3?'block':'none'
                                          }
                                      },'已审核'),
                                       h('span',{
                                          style:{
                                              display:params.row.state===1?'block':'none'
                                          }
                                      },'草稿'),
                                        h('span',{
                                          style:{
                                              display:params.row.state===2?'block':'none'
                                          }
                                      },'已发布'),
                                      h('span',{
                                          style:{
                                              display:params.row.state===4?'block':'none'
                                          }
                                      },'已开始制作'),
                                      h('span',{
                                          style:{
                                              display:params.row.state===5?'block':'none'
                                          }
                                      },'已完成')
                                  ])
                              }
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
                                        marginRight:'5px',
                                         display:this.access==='zj'?"inline-block":"none"
                                    },
                                    on:{
                                        click:()=>{
                                            this.$_modify(params.row)
                                       
                                        }
                                    }
                                     },'编辑'),
                                         h('Button',{
                                       props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                     style:{
                                         marginRight:'5px',
                                         display:this.access==='zj'?"inline-block":"none"
                                    },
                                    on:{
                                        click:()=>{
                                           this.$_delete(params.row.id)
                                        }
                                        
                                    },
                                     },'刪除'),
                                          h('Button',{
                                       props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                     style:{
                                        marginRight:'5px',
                                         display:this.access==='zj'?"inline-block":"none"
                                    },
                                    on:{
                                        click:()=>{
                                            this.$_fabu(params.row.id)
                                        }
                                    }
                                     },'发布'),
                                            h('Button',{
                                       props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                     style:{
                                        marginRight:'5px',
                                         display:this.access==='sh1'?"inline-block":"none"
                                    },
                                    on:{
                                        click:()=>{
                                            this.$_shenhe1()
                                        }
                                    },
                                     },'审核1'),
                                      h('Button',{
                                       props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                     style:{
                                        marginRight:'5px',
                                        display:this.access==='sh2'?"inline-block":"none"
                                    },
                                     on:{
                                        click:()=>{
                                            this.$_shenhe2()
                                        }
                                    },
                                     },'审核2'),
                                        h('Button',{
                                       props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                     style:{
                                        marginRight:'5px',
                                         display:(this.access==='zj')|| (this.access==='admin')?"inline-block":"none"
                                    },
                                    on:{
                                        click:()=>{
                                            this.$_down(params.row)
                                        }
                                    }
                                     },'下载'),
                                         h('Button',{
                                       props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                     style:{
                                        marginRight:'5px',
                                         display:(this.access==='zj'|| this.access==='admin' || this.access==='sh1')?"inline-block":"none"
                                    },
                                    on:{
                                        click:()=>{
                                            this.$_play(params.row)
                                        }
                                    }
                                     },'播放'),
                                      h('Button',{
                                       props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                     style:{
                                        marginRight:'5px',
                                        display:this.access==='zz'?"inline-block":'none'
                                    },
                                    on:{
                                        click:()=>{
                                         this.madeModal=true
                                         this.articleId=params.row.id
                                        }
                                    }
                                     },'开始制作')
                                 ] )
                             }
                         }
                        ],
                        Data:[]
        }
    },
    async created (){
      await article.getArticle(this,this.TablePage.pageSize,0)
       
    },
    computed: {
         access(){
              return  this.$store.state.access
         }
    },
        methods:{
              
                    /* 分页*/
                   async  $_TablePageChange (page) {
                    const offset = (page - 1) * this.TablePage.pageSize
                      await article.getArticle(this,this.TablePage.pageSize,offset)
                    
                    },
                    async $_TablePageSizeChange (pageSize) {
                    this.TablePage.pageSize = pageSize
                     await article.getArticle(this,this.TablePage.pageSize,0)
                    
                    },
                    /* 添加文章 */
                    async addArticle(name,state){
                       this.$refs[name].validate(async(valid) => {
                         if (valid) {
                             let content=this.$refs.childContent.content
                             let title=this.formInline.title
                             await article.addArticle(title,content,state)
                             await article.getArticle(this,this.TablePage.pageSize,0)
                           this.modal=false
                              this.$Message.success('提交成功');

                            } else {
                                this.$Message.error('提交失败');
                            }
                                    })
                    },
                    /* 修改文章 */
                 async modifyArticle(name,state,id){
                       this.$refs[name].validate(async(valid) => {
                         if (valid) {
                             let content=this.$refs.childContent.content
                             let title=this.formInline.title
                             await article.modifyArticle(title,content,state)
                             await article.getArticle(this,this.TablePage.pageSize,0)
                           this.modal=false
                              this.$Message.success('提交成功');

                            } else {
                                this.$Message.error('提交失败');
                            }
                                    })
                    },
                     $_delete(id){
                           article.$_deleteArticle(id)
                    },
                     $_fabu(id){
                      article.$_fabu(id)    
                    },
                    $_down(data){
                        this.formInlineDown={
                            mp4Url:data.mp4Url,
                            baiduPwd:data.baiduPwd,
                            baiduUrl:data.baiduUrl
                        }
                        this.downModal=true
                    },
                 
                    $_play(data){
                       this.formInlinePlay={
                           mp4Url:data.mp4Url
                       }
                       this.playModal=true
                    },
                    MadeSubmit(name){
                              this.$refs[name].validate((valid) => {
                                        if (valid) {
                                          
                                            article.$_Made(this.articleId,this.formInlineMade)
                                            this.$Message.success('提交成功');
                                            this.madeModal=true
                                        } else {
                                            this.$Message.error('请完善信息');
                                            this.madeModal=false
                                  
                                        }
                                    })      
                    },
                  
                    $_modify(data){
                        this.modifyId=data.id
                        this.formInline.title=data.title
                   
                        this.$refs.modifyContent.getContent(data.content)
                  
                        this.modifyModal=true
                    }

          }

}
</script>

