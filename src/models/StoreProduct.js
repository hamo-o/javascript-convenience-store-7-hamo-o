class StoreProduct {
  #name;

  #price;

  #quantity;

  #promotion;

  constructor(product, promotions) {
    this.#name = product.name;
    this.#price = +product.price;
    this.#quantity = +product.quantity;
    this.#promotion = this.#findPromotion(product.promotion, promotions);
  }

  isEqualProduct(name) {
    return this.#name === name;
  }

  sell(buyCount) {
    if (this.#quantity < buyCount) {
      this.#quantity = 0;
      return this.#getSelledProduct(this.#quantity);
    }
    this.#quantity -= buyCount;
    return this.#getSelledProduct(buyCount);
  }

  getProduct() {
    return {
      name: this.#name,
      price: this.#price,
      quantity: this.#quantity,
      promotion: this.#formatPromotion(this.#promotion) || "null",
    };
  }

  getFormattedProduct() {
    return {
      name: this.#name,
      price: `${this.#price.toLocaleString()}원`,
      quantity: this.#formatQuantity(this.#quantity),
      promotion: this.#formatPromotion(this.#promotion),
    };
  }

  add(quantity) {
    this.#quantity += Number(quantity);
  }

  #findPromotion(promotionName, promotionList) {
    if (!promotionList) return promotionName;

    const promotion = promotionList.findPromotionByName(promotionName);
    return promotion || promotionName;
  }

  #formatQuantity(quantity) {
    if (!quantity) return "재고 없음";
    return `${quantity}개`;
  }

  #formatPromotion(promotion) {
    if (promotion === "null") return "";
    if (typeof promotion === "string") return promotion;
    return promotion.getPromotion().name;
  }

  #getSelledProduct(quantity) {
    return {
      name: this.#name,
      price: this.#price,
      quantity,
      promotion: this.#promotion,
    };
  }
}

export default StoreProduct;
