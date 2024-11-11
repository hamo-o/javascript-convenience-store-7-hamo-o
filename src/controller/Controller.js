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
    const cartList = this.#models.userProducts.buyProduct(data, this.#models.storeProducts);

    this.#models.store.setCartList(cartList);
  }

  async membership() {
    const data = await this.#views.inputView.readMembershipDiscount();
    const flag = this.#formatInputToBool(data);

    if (flag) this.#models.store.membershipDiscount();
  }

  checkout() {
    this.#models.store.calcTotalPrice();
    const priceInfo = this.#models.store.getPriceInfo();
    this.#views.outputView.printReceipt(priceInfo);
  }

  #formatInputToBool(input) {
    // TODO: 유효성 검사
    if (input === "Y") return true;
    return false;
  }
}

export default Controller;
