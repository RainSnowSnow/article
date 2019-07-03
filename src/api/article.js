import http from '@/libs/http.js'
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
             vm.Data=data.rows
   
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
   async modifyArticle(id,query){
       await http.put({
           url:``,
           data:query
       })
   },

    /* 删除文章 */
    async $_deleteArticle(id){
        await http.delete({
            url:``
        })
    },
    /* 发布文章 */
    async $_fabu(id){
        await http.post({
            url:``
        })
    },
    /* 开始制作 */
    async $_Made(id,query){
       await http.post({
           url: ``,
           data:query
       })
    },
    /* 审核1 */
    async shenhe1(){
        await http.put({
            url:'',
            data:query
        })
    },
    /* 审核2 */
    async shenhe2(){
        await http.put({
            url:'',
            data:query
        })
    }
}