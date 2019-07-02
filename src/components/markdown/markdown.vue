<template>
  <div class="markdown-wrapper">
    <textarea ref="editor" ></textarea>
  </div>
</template>

<script>
import Simplemde from 'simplemde'
import 'simplemde/dist/simplemde.min.css'
export default {
  name: 'MarkdownEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default: () => {
        return {
            toolbar: ["bold", "italic", "heading", "|", "quote",'strikethrough','heading','code','unordered-list','ordered-list','clean-block','table','horizontal-rule','preview','side-by-side','fullscreen'] 
        }
      }
    },
    localCache: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      editor: null,
      content:null
    }
  },
   mounted () {
    this.editor = new Simplemde(Object.assign(this.options, {
      element: this.$refs.editor
    }))
    /**
     * 事件列表为Codemirror编辑器的事件，更多事件类型，请参考：
     * https://codemirror.net/doc/manual.html#events
     */
    this.addEvents()
    
    
  },
  methods: {
  getContent(val){
    this.editor.value(val)
   
  },
    addEvents () {
      this.editor.codemirror.on('keyup',()=>{
           this.content=this.editor.value()
      })
    // this.editor.codemirror.on('keyup',(event)=>{
    //          if(window.event.code==='Space' || window.event.code==='Enter'){
    //             // let len=  document.getElementsByClassName('words')[0].innerText
    //                this.regContent = '发是发斯蒂芬斯蒂芬发缴费is飞机打飞机司法解释低筋粉'
    //                var reg = /[\u4e00-\u9fa5]/g
    //                var regValue=this.regContent.match(reg)
    //                 if(regValue.length<=3){

    //                 }else{
    //                    var test=this.regContent.split("")
    //                    var arr = ['粉色','分','粉','粉','粉'];
    //           var len = test.length;
    //           for(var i=0;i<5;i++){
    //              console.log(i)
    //           //删除掉所有为2的元素
    //           if(reg.test(test[i])){
    //             console.log(reg.test(test[i]))
    //             //注意对比这行代码：删除元素后调整i的值
    //             test.splice(i--,1);
    //           }
    //           }
    //           console.log(test);
            
    //                 }
                
    //          }
    //         })
      // this.editor.codemirror.on('focus', () => {
      //   this.$emit('on-focus', this.editor.value())
      // })
      // this.editor.codemirror.on('blur', () => {
      //   this.$emit('on-blur', this.editor.value())
      // })
    }
  },
 
}
</script>

<style>

 .markdown-wrapper > .editor-toolbar.fullscreen{
    z-index: 9999;
  }
   .markdown-wrapper > .CodeMirror-fullscreen{
    z-index: 9999;
  }
    .markdown-wrapper > .CodeMirror-fullscreen ~ .editor-preview-side{
    z-index: 9999;
  }

</style>
