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

  sell(buyCount) {
    if (this.quantity < buyCount) {
      this.quantity = 0;
      return this.#getSelledProduct(this.quantity);
    }
    this.quantity -= buyCount;
    return this.#getSelledProduct(buyCount);
  }

  #getSelledProduct(quantity) {
    const { name, price, promotion } = this.getProduct();
    return {
      name,
      price,
      quantity,
      promotion,
    };
  }
}

export default StoreProduct;
