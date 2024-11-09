class Controller {
  #views;

  #models;

  constructor({ views, models }) {
    this.#views = views;
    this.#models = models;
  }

  async info() {
    this.#views.outputView.printHello();

    const data = await this.#views.inputView.readProducts();

    this.#views.outputView.printProducts(this.#models.storeProducts.getStoreProducts(data));
  }
}

export default Controller;
