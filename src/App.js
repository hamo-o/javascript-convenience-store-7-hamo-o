import Controller from "./controller/Controller.js";
import InputView from "./views/InputView.js";

class App {
  #controller;

  constructor() {
    this.#controller = new Controller({
      views: {
        inputView: new InputView(),
      },
    });
  }

  async run() {
    await this.#controller.info();
  }
}

export default App;
