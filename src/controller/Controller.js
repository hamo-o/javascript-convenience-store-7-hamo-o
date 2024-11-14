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
    await this.#handleError(async () => {
      const data = await this.#views.inputView.readItem();
      const cartList = this.#models.userProducts.buyProduct(data, this.#models.storeProducts);
      cartList.forEach((item) => this.#models.store.addToDefaultCartList(item));
    }, this.buy.bind(this));
  }

  async addFreeProducts() {
    const items = this.#models.userProducts.calcFreeItems();

    for (const item of items) {
      await this.#addFreeProduct(item);
    }
  }

  async #addFreeProduct({ name, count }) {
    await this.#handleError(async () => {
      const data = await this.#views.inputView.readFreeProduct(name, count);
      const flag = this.#formatInputToBool(data);
      if (flag) {
        const item = this.#models.storeProducts.sellFreeProduct({ name, count });
        this.#models.store.addToPromotionCartList(item);
      }
    }, this.#addFreeProduct.bind(this, { name, count }));
  }

  async membership() {
    const isValidMembership = this.#models.store.checkMembership();
    if (!isValidMembership) return;

    await this.#handleError(async () => {
      const data = await this.#views.inputView.readMembershipDiscount();
      const flag = this.#formatInputToBool(data);
      if (flag) this.#models.store.membershipDiscount();
    }, this.membership.bind(this));
  }

  checkout() {
    const defaultProducts = this.#models.store.getDefaultCartList();
    const promotionProducts = this.#models.store.getPromotionCartList();
    const priceInfo = this.#models.store.getPriceInfo();
    this.#views.outputView.printReceipt(defaultProducts, promotionProducts, priceInfo);
  }

  async checkRestart() {
    await this.#handleError(async () => {
      const data = await this.#views.inputView.readRestart();
      return this.#formatInputToBool(data);
    }, this.checkRestart.bind(this));
  }

  async #handleError(callback, errorCallback) {
    try {
      await callback();
    } catch (error) {
      this.#views.outputView.printError(error.message);
      if (errorCallback) await errorCallback();
    }
  }

  #formatInputToBool(input) {
    if (!(input === "Y" || input === "N")) throw new Error("[ERROR] 잘못된 입력입니다. 다시 입력해 주세요.");
    if (input === "Y") return true;
    return false;
  }
}

export default Controller;
