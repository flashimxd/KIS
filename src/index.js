const canvasId = 'my-canvas'
const level = 0

const getFileExtension = () => {
  const filePath = document.querySelector('#file')?.value
  if(!filePath) return
  return filePath.substr(filePath.lastIndexOf('.')+1,filePath.length);
}

function writefunc(){
  const message = document.querySelector('#message').value
  const password = document.querySelector('#pwd').value
  const couldWriteImageInCanvas = writeMsgToCanvas(canvasId, 
    message,
    password,
    level
  ) != null

  if(!couldWriteImageInCanvas) {
    return
  }

  var myCanvas = document.getElementById(canvasId)
  const fileExt = getFileExtension()
  // var image = myCanvas.toDataURL("image/jpeg",1.0)
  var image = myCanvas.toDataURL(`image/${fileExt}`)
  var element = document.createElement('a')
  element.setAttribute('href', image)
  element.setAttribute('download', `result.${fileExt}`)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

function sendImage() {
  // control maxsize
  loadIMGtoCanvas('file', canvasId, writefunc, 1000)
}

function loadImage() {
  loadIMGtoCanvas('file', canvasId, loadFunc)
}

function loadFunc() {
  const password = document.querySelector('#pwd').value
  const resultDom = document.querySelector('#result')
  let secret = readMsgFromCanvas(canvasId, password, level)
  if(secret != null){
    resultDom.innerHTML = secret
  }
}