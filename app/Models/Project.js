export default class Value {
  constructor({ name, body, id, images }) {
    this.name = name
    this.body = body
    this.images = images
    this.id = id
    this.displayedImage = 0
  }
  changePicture(dir) {

    if (this.displayedImage + dir < 0) {
      this.displayedImage = this.images.length - 1
    }
    else if (this.displayedImage + dir == this.images.length) {
      this.displayedImage = 0
    } else {

      this.displayedImage += dir
    }
    console.log(this.displayedImage);
  }
  get Template() {

    return /*html*/`
         <div class="project-card mx-5 my-5">
          <div class="card-header text-center text-white bg-dark">
            <h2 class="card-header-title">Keepr</h2>
            <h5 class="card-header-text">${this.body}  </h5 >
          </div >
        <div class="project-card-body bg-white">
          <img onclick="app.mainController.changePicture(event, ${this.id})" id="${this.id}" src="../assets/img/${this.images[this.displayedImage]}" alt="" class="d-flex project-img img-fluid">
          <div class="row caret-row" id="caret-row">
            <i class="fa fa-caret-left img-carat" aria-hidden="true"></i>
            <i class="fa fa-caret-right img-carat" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    `
  }
}
