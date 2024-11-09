import StoreProducts from "../models/StoreProducts.js";

class Controller {
  #views;

  constructor({ views }) {
    this.#views = views;
  }

  async info() {
    this.#views.outputView.printHello();

    const data = await this.#views.inputView.readProducts();
    const products = new StoreProducts(data);

    this.#views.outputView.printProducts(products.getStoreProducts());
  }
}

export default Controller;
