<template>
  <div class="markdown-wrapper">
    <textarea ref="editor"   ></textarea>
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
       
           status: false,
              spellChecker: false,
            toolbar: ["bold", "italic", "heading", "|", "quote",'strikethrough','heading','code','unordered-list','ordered-list','clean-block','table','horizontal-rule','preview','side-by-side','fullscreen'] 
        }
      }
    },
    localCache: {
      type: Boolean,
      default: false
    }
   
  },
  data () {
    return {
      editor: null,
      length:null
    }
  },
   mounted () {
 
    /**
     * 事件列表为Codemirror编辑器的事件，更多事件类型，请参考：
     * https://codemirror.net/doc/manual.html#events
     */
   this.editor = new Simplemde(Object.assign(this.options, {
      element: this.$refs.editor
    }))
  
   
    this.addEvents()
    
  },
  
  methods: {
  getContent(val){
         this.$nextTick(() => {
            this.editor.value(val)
      });
    

  },
    addEvents () {
          
      var isActive=true
          this.editor.codemirror.on('keyup',(event)=>{ 
              var reg = /[\u4e00-\u9fa5a-zA-Z]/g
              var content=this.editor.value().match(reg)
              var length=content.length
             if(isActive){
  
              if(length>160){
                this.$Message.info('超出字数限制(160字数)')
              this.editor.codemirror.options.readOnly='nocursor'
            
                isActive=false
              }
             
             } 
        
      })
 
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
