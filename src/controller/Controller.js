class Controller {
  #views;

  #models;

  constructor({ views, models }) {
    this.#views = views;
    this.#models = models;
  }

  async info() {
    this.#views.outputView.printHello();

    const products = await this.#views.inputView.readProducts();
    const promotions = await this.#views.inputView.readPromotions();
    this.#models.promotions.setPromotions(promotions);
    this.#models.storeProducts.setStoreProducts(products, this.#models.promotions);

    this.#views.outputView.printProducts(this.#models.storeProducts.getStoreProducts());
  }

  async buy() {
    try {
      const data = await this.#views.inputView.readItem();
      const cartList = this.#models.userProducts.buyProduct(data, this.#models.storeProducts);
      this.#models.store.setCartList(cartList);
    } catch (error) {
      this.#views.outputView.printError(error.message);
      await this.buy();
    }
  }

  async addFreeProducts() {
    const items = this.#models.userProducts.calcFreeItems();

    const promises = items.map(async (item) => this.#addFreeProduct(item));
    await Promise.all(promises);
  }

  async #addFreeProduct({ name, count }) {
    const data = await this.#views.inputView.readFreeProduct(name, count);
    const flag = this.#formatInputToBool(data);
    if (flag) this.#models.storeProducts.sellFreeProduct({ name, count });
  }

  async membership() {
    const data = await this.#views.inputView.readMembershipDiscount();
    const flag = this.#formatInputToBool(data);

    if (flag) this.#models.store.membershipDiscount();
  }

  checkout() {
    this.#models.store.calcTotalPrice();
    const products = this.#models.store.getCartList();
    const priceInfo = this.#models.store.getPriceInfo();
    this.#views.outputView.printReceipt(products, priceInfo);
  }

  #formatInputToBool(input) {
    // TODO: 유효성 검사
    if (input === "Y") return true;
    return false;
  }
}

export default Controller;
