import http from '@/libs/http.js'
import iview from 'iview'

// import { try } from 'q';
export default {
    /* 获取文章列表 */
    async getArticle(vm,limit,offset){
          let query={
            limit:limit,
            offset:offset
        }
          try{ const data= await http.get({
            url:"/articles",
            data:query
             })  
          
              vm.Data= data.rows.map((o)=>{
                if(vm.$store.state.access==='sh1'){
                    if(o.state!==2 ){
                        o['_disabled']=true
                     }
                    return o
                }else if(vm.$store.state.access==='zj'){
                    if(o.state!==1 ){
                        o['_disabled']=true
                     }
                    return o
                }else if(vm.$store.state.access==='sh2'){
                    if(o.state===6 ){
                        o['_disabled']=true
                     }
                    return o
                }else{
                    return o
                }

    
           })
              vm.DataCount=data.count
     } catch(error){
            console.log(error)
        }
    },
    /* 添加文章 */
    async addArticle(title,content,state){
        let query={
            title:title,
            content:content,
            state:state
        }
        try{
            const data=await http.post({
                url:'/articles',
                data:query
            })
        }catch(error){
           console.log(error)
        }
    
    },
    /* 修改文章 */
   async modifyArticle(id,title,content){
       console.log(id)
       let query={
           title:title,
           content:content
       }
       await http.put({
           url:`/articles/${id}`,
           data:query
       })
   },

    /* 删除文章 */
    async $_deleteArticle(id){
        await http.delete({
            url:`/articles/${id}`
        })
    },
    /* 发布文章 */
    async $_fabu(id){
        await http.patch({
            url:`/articles/${id}/publish`
        })
    },
    /* 开始制作 */
    async $_Made(id,query){
        try{
            await http.patch({
                url: `/articles/${id}/end`,
                data:query
            })
           iview.Message.info('制作成功')
        }catch(error){
           console.log(error)
        }
   
    },
    /* 审核1 */
    async $_shenhe1(id){
        try{
            await http.patch({
                url:`/articles/${id}/verify1`,
            })
            iview.Message.info('审核成功')
        }catch(error){
            console.log(error)
        }
     
    },
    /* 审核2 */
    async $_shenhe2(id){
        await http.patch({
            url:`/articles/${id}/verify2`,
        })
    },

    /* 配音完成制作 */
    async $_voice(id,query){
        await http.patch({
            url:`/articles/${id}/pyend`,
            data:query
        })
    },
    /* 修改密码 */
    async $_changePassword(query,vm){
        try{
            await http.put({
                url:`/auth/password/change/my`,
                data:query
            })
   
         vm.loginAgain=true
        }catch(error){console.log(error)}
   
    }
}