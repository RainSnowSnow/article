<template>
 <div>
      <Card>
        <p slot="title" style="text-align:left">
            <Icon type="ios-film-outline"></Icon>
            我的文章
        </p>
      </Card>
     <div style="min-height: 200px;">
        <div>
            <Table border stripe :columns="Columns" :data="Data"></Table>
            <Page :total="DataCount"    :page-size="TablePage.pageSize" :page-size-opts="TablePage.pageSizeOpts"  @on-change="$_TablePageChange" @on-page-size-change="$_TablePageSizeChange"  show-total show-elevator show-sizer style="margin-top: 20px; text-align: right;" transfer></Page>
        </div>
     </div>
      
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
         <Modal v-model="voiceModal" title="开始配音" @on-ok="VoiceSubmit('formInlineVoice')" @on-cancel="()=>{voiceModal===false,$refs['formInlineVoice'].resetFields()}">
          <Form ref="formInlineVoice" :model="formInlineVoice" :rules="ruleInlineVoice"  :label-width="120">
            <FormItem prop="voice" label="配音地址">
                <Input  v-model="formInlineVoice.voice" placeholder="请输入配音地址"></Input>
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
            voiceModal:false,
            formInlineVoice:{
                voice:null
            },
            ruleInlineVoice:{
                  voice: [
                        { required: true, message: '请输入配音地址', trigger: 'blur' }
                    ],
            },
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
                modifyContent:'',
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
            Columns:[
                  {
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
                                      },'已完成制作'),
                                         h('span',{
                                          style:{
                                              display:params.row.state===6?'block':'none'
                                          }
                                      },'已通过'),
                                       h('span',{
                                          style:{
                                              display:params.row.state===7?'block':'none'
                                          }
                                      },'已开始配音'),
                                              h('span',{
                                          style:{
                                              display:params.row.state===8?'block':'none'
                                          }
                                      },'已完成配音'),
                                         h('span',{
                                          style:{
                                              display:params.row.state===9?'block':'none'
                                          }
                                      },'等待分配制作人员'),
                                              h('span',{
                                          style:{
                                              display:params.row.state===10?'block':'none'
                                          }
                                      },'等待分配制作人员')
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
                                         display:this.access==='zj' && params.row.state===1?"inline-block":"none"
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
                                        click:async ()=>{
                                           await article.$_deleteArticle(params.row.id)
                                           await article.getArticle(this,this.TablePage.pageSize,0)
        
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
                                         display:this.access==='zj' && params.row.state!==2?"inline-block":"none"
                                    },
                                    on:{
                                        click:async ()=>{
                                          await  article.$_fabu(params.row.id) 
                                          await article.getArticle(this,this.TablePage.pageSize,0)   
                                              
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
                                        click:async ()=>{
                                             await article.$_shenhe1(params.row.id)
                                              await article.getArticle(this,this.TablePage.pageSize,0)   
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
                                        click:async ()=>{
                                           await article.$_shenhe2(params.row.id)
                                           await article.getArticle(this,this.TablePage.pageSize,0)   
                                        }
                                    },
                                     },'终极审核'),
                                        h('Button',{
                                       props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                     style:{
                                        marginRight:'5px',
                                       display:params.row.state===6?"inline-block":"none"
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
                                         display:params.row.state===6?"inline-block":"none"
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
                                        display:this.access==='zz'&& params.row.state===5?"inline-block":'none'
                                    },
                                    on:{
                                        click:()=>{
                                            if(params.row.baiduPwd!=''){
                                                this.formInlineMade={
                                                    mp4Url:params.row.mp4Url,
                                                    baiduUrl:params.row.baiduUrl,
                                                    baiduPwd:params.row.baiduPwd
                                                }
                                            }
                                         this.madeModal=true
                                         this.articleId=params.row.id
                                        }
                                    }
                                     },params.row.state===5?'上传视频':"开始制作"),
                                  h('Button',{
                                      props:{
                                        type: 'primary',
                                        size: 'small'
                                      },
                                      style:{
                                          display:'inline-block'
                                      },
                                      on:{
                                          click:()=>{
                                              if(params.row.voice!=''){
                                                  this.formInlineVoice={
                                                      voice:params.row.voice
                                                  }
                                              }
                                             this.voiceModal=true
                                          }
                                      }
                                  },'开始配音')

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
                              this.$refs[name].validate(async(valid) => {
                                        if (valid) {
                                          
                                            await  article.$_Made(this.articleId,this.formInlineMade)
                                            await  article.getArticle(this,this.TablePage.pageSize,0)

                                            this.madeModal=false
                                        } else {
                                            this.$Message.error('请完善信息');
                                            this.madeModal=true
                                  
                                        }
                                    })      
                    },
                  VoiceSubmit(name){
                           this.$refs[name].validate(async(valid) => {
                                        if (valid) {
                                          
                                            // await  article.$_Made(this.articleId,this.formInlineMade)
                                            await  article.getArticle(this,this.TablePage.pageSize,0)
                                         } else {         
                                           
                                            this.$Message.error('请完善信息');
                                   
                                  
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

