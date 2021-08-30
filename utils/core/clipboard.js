import Clipboard from 'clipboard'
const dom = document.createElement('span')
const clipboard = new Clipboard(dom)
let sCbs = []
let eCbs = []
clipboard.on('success', (_) => {
  sCbs.forEach((cb) => {
    cb(_)
  })
  sCbs = []
})
clipboard.on('error', (_) => {
  eCbs.forEach((cb) => {
    cb(_)
  })
  eCbs = []
})
export default {
  copy (text, sCb, eCb) {
    dom.dataset.clipboardText = text
    sCb && sCbs.push(sCb)
    eCb && eCbs.push(eCb)
    dom.click()
    return true
  }
}
