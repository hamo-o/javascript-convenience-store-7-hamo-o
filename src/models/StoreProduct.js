import Product from "./Product.js";

class StoreProduct extends Product {
  constructor({
    name, price, quantity, promotion,
  }) {
    super({
      name, price, quantity, promotion,
    });
  }

  isEqualProduct(name) {
    return this.name === name;
  }

  sell(quantity) {
    const sub = this.quantity - quantity;
    if (sub < 0) {
      this.quantity = 0;
      return Math.abs(sub);
    }
    this.quantity = sub;
    return 0;
  }
}

export default StoreProduct;
