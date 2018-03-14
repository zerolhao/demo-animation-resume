var cssText = `/* 面试官你好，我是凌号。
 * 为了吸引你的目光，我写了一个会动的简历。
 * 下面就是代码啦！
 * 首先要准备一些样式
 */

*{
  transition: all 1s;
}
body {
  font-size: 16px;
  background-color: #eee;
}
.cssCode {
  padding: 16px;
  border: 1px solid #aaa;
}

/* 添加高亮 */
.token.selector{ color: #690; }
.token.punctuation{ color: #999; }
.token.property{ color: #905; }
.token.atrule{ color: #07a; }
.token.function{ coloe: #DD4A68; }

/* 添加呼吸效果 */
.cssCode {
  animation: breath 0.6s infinite alternate-reverse;
}

/* 现在我需要一张白纸 */

#paper{
  width: 44vw; height: 92vh;
  position: fixed; right: 4vw;
  top: 4vh; border: 1px solid red;
  padding: 16px;
}
#paper > .content{
  display: block;
}

/* 这样我就可以在白纸上写字了，请看右边 */

`
var cssText2 = `
/* 接下来使用 mkared.js 
 * 来将 Markeddown 变成 HTML
 */
`
var cssText3 = `
/* 这就是我的会动的简历，
 * 一个有些好玩的简历，
 * 谢谢观看！
 */
`
var mdText = `
# 自我介绍
我叫凌号，1996年3月出生，
毕业于安徽扬子职业技术学院，自学前端半年，希望应聘前端开发岗位。
# 技能结婚送啊
- HTML5
- JavaScript
- CSS3
- jQuery
# 项目介绍
  1. canvas 画板
  2. 仿苹果风格轮播
  3. 会动的简历
# 联系方式
  - QQ: 837650700
  - Email: zerolhao@foxmail.com
  - 手机: 17521135167
`

writeCss('',cssText,()=>{
  createPaper(()=>{
    writeMarkdown(mdText,()=>{
      writeCss(cssText,cssText2,()=>{
        convertMdToHtml(()=>{
          writeCss(cssText+cssText2,cssText3)
        })
      })
    })
  })
})

function writeCss(prefix,code, fn) {
  let domCode = document.querySelector('#window>.cssCode')
  let n = 0
  let id = setInterval(function() {
    n++
    domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css)
    styleTag.innerText = prefix + code.substring(0, n)
    domCode.scrollTop = domCode.scrollHeight
    if (n >= code.length) {
      window.clearInterval(id)
      fn && fn.call()
    }
  }, 1)
}

function createPaper(fn) {
  let paper = document.createElement('div')
  paper.id = 'paper'
  let content = document.createElement('pre')
  content.className = 'content'
  paper.appendChild(content)
  document.body.appendChild(paper)
  fn && fn.call()
}
function writeMarkdown(mdText,fn){
  let domPaper = document.querySelector('#paper>.content')
  let n = 0
  let id = setInterval(function() {
    n++
    domPaper.innerHTML = mdText.substring(0, n)
    domPaper.scrollTop = domPaper.scrollHeight
    if (n >= mdText.length) {
      window.clearInterval(id)
      fn && fn.call()
    }
  }, 10)
}
function convertMdToHtml(fn){
  let mdEle = document.createElement('div')  
  mdEle.className = 'html markdown-body'
  mdEle.innerHTML = marked(mdText)
  let content = document.querySelector('#paper>.content')
  content.replaceWith(mdEle)
  fn && fn.call()
}