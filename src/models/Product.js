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

  setQuantity(quantity) {
    this.#quantity = quantity;
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

  isEqual(name) {
    return this.#name === name;
  }

  getQuantity() {
    return this.#quantity;
  }

  getPrice() {
    return this.#price;
  }

  #sellPromotionProduct(customer, sellableQuantity, originQuantity) {
    const countInfo = this.#promotion.calcMaxFreeQuantity(sellableQuantity);
    if (!countInfo) {
      this.sellDefault(sellableQuantity, customer);
      return { lastCount: 0, extraCount: 0 };
    }
    const { costCount, freeCount, extraCount } = countInfo;
    customer.addBuyList({ name: this.#name, quantity: costCount + freeCount, price: this.#price });
    if (freeCount) customer.addGetList({ name: this.#name, quantity: freeCount, price: this.#price });
    return { lastCount: originQuantity - (costCount + freeCount), extraCount };
  }

  /**
   *
   * @param {number} quantity - 판매할 수량
   * @param {Customer} customer - 구매자
   * @returns - 판매한 수량
   */
  sellPromotion(quantity, customer) {
    if (this.#quantity < quantity) {
      const sellableQuantity = this.#quantity;
      this.#quantity = 0;
      return this.#sellPromotionProduct(customer, sellableQuantity, quantity);
    }
    this.#quantity -= quantity;
    return this.#sellPromotionProduct(customer, quantity, quantity);
  }

  sellDefault(quantity, customer) {
    this.#quantity -= quantity;
    customer.addBuyList({ name: this.#name, quantity, price: this.#price });
  }

  sellExtra(quantity, customer) {
    this.#quantity -= quantity;
    customer.addBuyList({ name: this.#name, quantity, price: this.#price });
    customer.addGetList({ name: this.#name, quantity, price: this.#price });
  }

  getContent() {
    return `${this.#name},${this.#price},${this.#quantity},${this.#promotion?.getName() || "null"}`;
  }
}

export default Product;
