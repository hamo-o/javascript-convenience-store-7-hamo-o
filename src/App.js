import Controller from "./controller/Controller.js";
import InputView from "./views/InputView.js";
import OutputView from "./views/OutputView.js";
import StoreProducts from "./models/StoreProducts.js";
import UserProducts from "./models/UserProducts.js";
import File from "./utils/File.js";

class App {
  #controller;

  constructor() {
    this.#controller = new Controller({
      views: this.#initViews(),
      models: this.#initModels(),
      files: this.#initFiles(),
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
      userProducts: new UserProducts(),
    };
  }

  #initFiles() {
    return {
      productsFile: new File("products.md"),
      promotionsFile: new File("promotions.md"),
    };
  }

  async run() {
    await this.#controller.info();
    await this.#controller.buy();
  }
}

export default App;
