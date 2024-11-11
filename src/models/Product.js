class Product {
  name;

  price;

  quantity;

  promotion;

  constructor({
    name, price, quantity, promotion,
  }) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.promotion = promotion;
  }

  // TODO: 입력 검증

  getProduct() {
    return {
      name: this.name,
      price: +this.price,
      quantity: +this.quantity,
      promotion: this.promotion,
    };
  }
}

export default Product;
