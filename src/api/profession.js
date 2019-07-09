
import http from '@/libs/http.js'
import iview from 'iview'
export default {
    /* 获取专家列表 */
    async getExperts(query){
     return   await http.get({
            url:"/experts",
            data:query
        })
    },
    /* 添加专家 */
    async addExport(query){
        try{
            await http.post({
                url:"/experts",
                data:query
            })
          iview.Message.info('添加成功')
        }catch(error){
          console.log(error)
        }
     
    },
   /* 获取专家详情*/    
   async getIdExport(id){
        await http.get({
            url:`/experts/${id}`
        })
   },

   /* 修改专家信息*/
   async modify(id,telphone){
       try{
        await http.put({
            url:`/experts/${id}`,
            data:{
            telphone:telphone    
            }
        })
        iview.Message.info('修改成功')
       }catch(error){
         console.log(error)
       }

   },
//    /* 删除专家 */
//    async $_delete(){

//    }
    /* 修改用户密码 */
 async modifyUserPassword(id,upwd){
     try{
        await http.put({
            url:`/auth/users/${id}/password/change`,
             data:{
               upwd:upwd
             }
           })
           iview.Message.info('修改成功')
     }catch(error){
           console.log(error)
     } 
 
 }
}
