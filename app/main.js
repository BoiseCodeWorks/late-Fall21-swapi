import { PeopleController } from "./Controllers/PeopleController.js";

class App {

  peopleController  = new PeopleController()

}

window["app"] = new App();
