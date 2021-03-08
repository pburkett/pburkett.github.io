export default class Value {
  constructor({ name, body, id, siteLink, gitHubLink, techs, images }) {
    this.name = name
    this.body = body
    this.images = images
    this.techs = techs
    this.id = id
    this.siteLink = siteLink
    this.gitHubLink = gitHubLink
    this.displayedImage = 0
    this.displayEndCard = false
  }
  changePicture(dir) {

    if (this.displayedImage + dir < 0) {
      this.displayedImage = this.images.length - 1
    }
    else if (this.displayedImage + dir == this.images.length) {
      this.displayEndCard = true
      let template = `
      <div id="${this.id}" class="end-card fade-in bg-white px-2 pt-3 col-12 h-100">
        
        <h5 class="ml-3">Built with:<h5>
        <p class="ml-5">${this.techs.join(', ')}
      </p>
      <div class="row mx-1 mt-3">
          <img src="./assets/img/heroku.png" class="logo-sm mr-1">
          <a class="link" href="${this.siteLink}">Visit Live on Heroku</a>
        </div>
        <div class="row mx-4">
          <i class="f-10">*allow the site a few moments to load</i>
        </div>
        <div class="row mx-1 mt-2">
          <img src="./assets/img/github.png" class="logo-sm mr-1">
          <a class="link" href="${this.gitHubLink}">Visit on GitHub</a>
        </div>
        <div class="row mx-2 last-card-btm-row align-items-center" >
          <i class="fa fa-caret-left c-pointer img-caret-sm" onclick="app.mainController.returnToImgs(${this.id})" aria-hidden="true"></i>
          <i class="f-10 mx-3">Return to gallery</i>
        </div>
      </div>
        `
      setTimeout(() => {

        document.getElementById(`project-card-body-${this.id}`).innerHTML = template
      }, 500);
      setTimeout(() => {
        document.getElementById(`project-card-body-${this.id}`).classList.remove('fade-in')
      }, 500);

      return true
    } else {
      this.displayedImage += dir
    }
  }
  get Template() {

    return /*html*/`
        <div class="project-card mx-5 my-5">
          <div class="card-header text-center text-white bg-dark">
            <h2 class="card-header-title">Keepr</h2>
            <h5 class="card-header-text">${this.body}  </h5 >
          </div >
        <div class="project-card-body bg-white align-items-center h-fc" id="project-card-body-${this.id}">
        ${this.displayEndCard ? ` <div id="${this.id}" class="end-card bg-white pt-3 px-2 col-12 h-100">
        
        <h5 class="ml-3">Built with:<h5>
        <p class="ml-5">${this.techs.join(', ')}
      </p>
      <div class="row mx-1 mt-3">
          <img src="./assets/img/heroku.png" class="logo-sm mr-1">
          <a class="link" href="${this.siteLink}">Visit Live on Heroku</a>
        </div>
        <div class="row mx-4">
          <i class="f-10">*allow the site a few moments to load</i>
        </div>
        <div class="row mx-1 mt-2">
          <img src="./assets/img/github.png" class="logo-sm mr-1">
          <a class="link" href="${this.gitHubLink}">Visit on GitHub</a>
        </div>
        <div class="row mx-2 last-card-btm-row align-items-center" >
          <i class="fa fa-caret-left c-pointer img-caret-sm" onclick="app.mainController.returnToImgs(${this.id})" aria-hidden="true"></i>
          <i class="f-10 mx-3">Return to gallery</i>
        </div>
      </div >` : `<img onclick="app.mainController.changePicture(event, ${this.id})" id="${this.id}" src="${this.images[this.displayedImage]}" alt="" class="d-flex slide-out-from-left project-img img-fluid">`}
          
          <div class="row caret-row" id="caret-row">
            <i class="fa fa-caret-left img-carat" aria-hidden="true"></i>
            <i class="fa fa-caret-right img-carat" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      `
  }
}
