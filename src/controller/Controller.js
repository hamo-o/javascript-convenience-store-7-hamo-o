class Controller {
  #views;

  #models;

  #files;

  constructor({ views, models, files }) {
    this.#views = views;
    this.#models = models;
    this.#files = files;
  }

  async info() {
    this.#views.outputView.printHello();

    const data = await this.#views.inputView.readProducts();
    this.#models.storeProducts.setStoreProducts(data);

    this.#views.outputView.printProducts(this.#models.storeProducts.getStoreProducts());
  }

  async buy() {
    const data = await this.#views.inputView.readItem();
    this.#models.userProducts
      .buyProduct(data, this.#models.storeProducts, this.#files.productsFile);
  }
}

export default Controller;
