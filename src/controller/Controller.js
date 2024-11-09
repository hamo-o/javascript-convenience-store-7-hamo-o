import StoreProducts from "../models/StoreProducts.js";
import OutputView from "../views/OutputView.js";

class Controller {
  #views;

  constructor({ views }) {
    this.#views = views;
  }

  async info() {
    OutputView.printHello();

    const data = await this.#views.inputView.readProducts();
    const products = new StoreProducts(data);

    OutputView.printProducts(products.getStoreProducts());
  }
}

export default Controller;
