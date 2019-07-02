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
    
    }
   
}