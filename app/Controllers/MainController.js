import { ProxyState } from "../AppState.js";


function _drawProjects() {
  let target = document.getElementById("project-cards")
  let template = ''
  ProxyState.projects.forEach(p => template += p.Template)
  target.innerHTML = template
  console.log('draw complete');


}

//Public
export default class MainController {
  constructor() {
    ProxyState.on('projects', _drawProjects)
    _drawProjects()

  }

  changePicture(e, id) {
    let elem = ProxyState.projects.find(p => p.id === id)
    let oldImg = document.getElementById(id)
    let carets = document.getElementById('caret-row')
    let dir;
    console.log(e.offsetX);
    if (e.offsetX <= 275) {
      dir = 'left'
      oldImg.classList.add(`slide-out-to-right`)
      carets.classList.add('fade-caret')
      elem.changePicture(-1)
    }
    if (e.offsetX > 275) {
      dir = 'right'
      oldImg.classList.add(`slide-out-to-left`)
      carets.classList.add('fade-caret')
      if (elem.changePicture(1)) {

        return
      }
      console.log('hey');
    }
    setTimeout(() => {
      ProxyState.projects = ProxyState.projects
      let newImg = document.getElementById(id)
      newImg.classList.add(`slide-in-from-${dir}`)
      newImg.classList.add('force-img-hover-fx')
      newImg.addEventListener("mouseleave", function (event) {
        newImg.classList.remove('force-img-hover-fx')

      })
      e.stopPropagation()
    }, 500);
  }
  returnToImgs(id) {
    let elem = ProxyState.projects.find(p => p.id === id)
    elem.displayedImage = 0
    ProxyState.projects = ProxyState.projects

  }
}

