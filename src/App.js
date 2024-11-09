import Controller from "./controller/Controller.js";
import InputView from "./views/InputView.js";
import OutputView from "./views/OutputView.js";
import StoreProducts from "./models/StoreProducts.js";

class App {
  #controller;

  constructor() {
    this.#controller = new Controller({
      views: this.#initViews(),
      models: this.#initModels(),
    });
  }

  #initViews() {
    return {
      inputView: new InputView(),
      outputView: new OutputView(),
    };
  }

  #initModels() {
    return {
      storeProducts: new StoreProducts(),
    };
  }

  async run() {
    await this.#controller.info();
  }
}

export default App;
