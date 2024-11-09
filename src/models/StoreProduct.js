import Product from "./Product";

class StoreProduct extends Product {
  #name;

  #price;

  #quantity;

  #promotion;

  constructor({
    name, price, quantity, promotion,
  }) {
    super({
      name, price, quantity, promotion,
    });
  }

  isEqualProduct(name) {
    return this.#name === name;
  }

  buyWithRemainingReturn(quantity) {
    const sub = this.#quantity - quantity;
    if (sub < 0) {
      this.#quantity = 0;
      return Math.abs(sub);
    }
    this.#quantity = sub;
    return 0;
  }
}

export default StoreProduct;
