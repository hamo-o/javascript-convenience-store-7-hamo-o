class Product {
  name;

  price;

  quantity;

  promotion;

  #promotionList;

  constructor({
    name, price, quantity, promotion,
  }, promotionList) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.promotion = promotion;
    this.#promotionList = promotionList;
  }

  // TODO: 입력 검증

  getProduct() {
    return {
      name: this.name,
      price: +this.price,
      quantity: +this.quantity,
      promotion: this.#findPromotion(this.promotion),
    };
  }

  #findPromotion(promotionName) {
    if (!this.#promotionList) return promotionName;

    const promotion = this.#promotionList.findPromotionByName(promotionName);
    return promotion || promotionName;
  }
}

export default Product;
