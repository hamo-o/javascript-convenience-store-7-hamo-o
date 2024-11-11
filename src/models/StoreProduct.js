import Product from "./Product.js";

class StoreProduct extends Product {
  #product;

  constructor({
    name, price, quantity, promotion,
  }) {
    super({
      name, price, quantity, promotion,
    });
    this.#product = this.getProduct();
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

  getFormattedProduct() {
    return {
      name: this.#product.name,
      price: `${this.#product.price.toLocaleString()}원`,
      quantity: this.#formatQuantity(this.#product.quantity),
      promotion: this.#formatPromotion(this.#product.promotion),
    };
  }

  #formatQuantity(quantity) {
    if (!quantity) return "재고 없음";
    return `${quantity}개`;
  }

  #formatPromotion(promotion) {
    if (promotion === "null") return "";
    return promotion;
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
