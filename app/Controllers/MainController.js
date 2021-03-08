import { ProxyState } from "../AppState.js";


function _drawProjects() {
  let target = document.getElementById("project-cards")
  let template = ''
  ProxyState.projects.forEach(p => template += p.Template)
  target.innerHTML = template
  console.log('draw complete');
  setTimeout(() => {
    let endCards = document.getElementsByClassName(`end-card`)
    for (let ind = 0; ind < endCards.length; ind++) {

      endCards[ind].classList.remove('fade-in')
    }
  }, 500);

}

//Public
export default class MainController {
  constructor() {
    ProxyState.on('projects', _drawProjects)
    _drawProjects()
    this.preload()

  }

  preload() {
    ProxyState.projects.forEach(p => {

      $(p.images).each(function () {
        $('<img/>')[0].src = this;
        // Alternatively you could use:
        // (new Image()).src = this;
      });
    })
  }
  changePicture(e = {}, id) {
    var x = window.matchMedia("(max-width: 700px)")
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
      if (!x.matches) {
        console.log('hey');
        newImg.classList.add('force-img-hover-fx')

        newImg.addEventListener("mouseleave", function (event) {
          newImg.classList.remove('force-img-hover-fx')
        })
      }
      e.stopPropagation()
    }, 500);
  }

  returnToImgs(id) {
    let elem = ProxyState.projects.find(p => p.id === id)
    elem.displayedImage = 0
    elem.displayEndCard = false
    ProxyState.projects = ProxyState.projects

  }
}

