import Controller from "./controller/Controller.js";
import InputView from "./views/InputView.js";
import OutputView from "./views/OutputView.js";

class App {
  #controller;

  constructor() {
    this.#controller = new Controller({
      views: {
        inputView: new InputView(),
        outputView: new OutputView(),
      },
    });
  }

  async run() {
    await this.#controller.info();
  }
}

export default App;
