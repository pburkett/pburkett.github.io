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
    console.log(e.offsetX);
    if (e.offsetX <= 275) {
      elem.changePicture(-1)
    }
    if (e.offsetX > 275) {
      elem.changePicture(1)
    }
    ProxyState.projects = ProxyState.projects
    let newImg = document.getElementById(id)
    newImg.classList.add('force-img-hover-fx')
    newImg.addEventListener("mouseleave", function (event) {
      newImg.classList.remove('force-img-hover-fx')

    })
    console.log('event');
    e.stopPropagation()
  }

}
