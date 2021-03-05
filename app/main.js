import MainController from "./Controllers/MainController.js";

class App {
  mainController = new MainController();
}

window["app"] = new App();
