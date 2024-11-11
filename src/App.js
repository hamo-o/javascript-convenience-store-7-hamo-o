import Controller from "./controller/Controller.js";
import InputView from "./views/InputView.js";
import OutputView from "./views/OutputView.js";
import StoreProducts from "./models/StoreProducts.js";
import UserProducts from "./models/UserProducts.js";
import Store from "./models/Store.js";
import File from "./utils/File.js";
import MembershipDiscount from "./models/MembershipDiscount.js";
import Promotions from "./models/Promotions.js";

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
      storeProducts: new StoreProducts(new File("products.md")),
      userProducts: new UserProducts(),
      store: new Store(new MembershipDiscount()),
      promotions: new Promotions(),
    };
  }

  async run() {
    await this.#controller.info();
    await this.#controller.buy();
    await this.#controller.membership();
    this.#controller.checkout();
  }
}

export default App;
