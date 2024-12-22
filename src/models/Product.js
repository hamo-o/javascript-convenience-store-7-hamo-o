class Product {
  #name;

  #price;

  #quantity;

  #promotion;

  constructor(name, price, quantity, promotion) {
    this.#name = name;
    this.#price = price;
    this.#quantity = quantity;
    this.#promotion = promotion;
  }

  #formatQuantity() {
    if (this.#quantity === 0) return "재고 없음";
    return `${this.#quantity}개`;
  }

  #formatPromotionName() {
    if (!this.#promotion) return "";
    return this.#promotion.getName();
  }

  getFormattedProduct() {
    return {
      name: this.#name,
      price: `${this.#price.toLocaleString()}원`,
      quantity: this.#formatQuantity(),
      promotion: this.#formatPromotionName(),
    };
  }
}

export default Product;
