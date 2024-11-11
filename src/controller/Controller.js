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
    this.#models.storeProducts.setStoreProducts(data);

    this.#views.outputView.printProducts(this.#models.storeProducts.getStoreProducts());
  }

  async buy() {
    const data = await this.#views.inputView.readItem();
    this.#models.userProducts.buyProduct(data, this.#models.storeProducts);

    const cartList = this.#models.userProducts.getCartList();
    this.#models.store.setCartList(cartList);
  }

  async membership() {
    const data = await this.#views.inputView.readMembershipDiscount();
    const flag = this.#formatInputToBool(data);

    if (flag) this.#models.store.membershipDiscount();
  }

  #formatInputToBool(input) {
    // TODO: 유효성 검사
    if (input === "Y") return true;
    return false;
  }
}

export default Controller;
