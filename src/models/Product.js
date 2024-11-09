class Product {
  name;

  price;

  quantity;

  promotion;

  constructor({
    name, price, quantity, promotion,
  }) {
    this.name = name;
    this.price = +price;
    this.quantity = +quantity;
    this.promotion = this.#formatPromotion(promotion);
  }

  // TODO: 입력 검증

  // TODO: this를 사용하지 않는 메서드
  #formatPromotion(promotion) {
    if (promotion === "null") return null;
    return promotion;
  }

  getProduct() {
    return {
      name: this.name,
      price: this.price,
      quantity: this.quantity || "재고 없음",
      promotion: this.promotion || "",
    };
  }
}

export default Product;
